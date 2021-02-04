import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import PropTypes from "prop-types";
import faker from "faker";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import {
  Tile as TileLayer,
  Vector as VectorLayer,
  Image as ImageLayer,
  Group as LayerGroup,
} from "ol/layer";
import { ImageWMS, XYZ, Vector as VectorSource } from "ol/source";

import TileGrid from "ol/tilegrid/TileGrid";
import { get as getProjection } from "ol/proj";
import Point from "ol/geom/Point";
import { ScaleLine } from "ol/control";
import { getLength } from "ol/sphere";
import * as olExtent from "ol/extent";
import Overlay from "ol/Overlay";

import { unByKey } from "ol/Observable";
import { easeOut } from "ol/easing";
import { getVectorContext } from "ol/render";

import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import Draw, { createBox } from "ol/interaction/Draw";
import Select from "ol/interaction/Select";
import { pointerMove } from "ol/events/condition";

import { Close } from "@material-ui/icons";
import MapDetails from "../MapDetails";
import Appbar from "../Appbar";
import {
  toggleAppLoading,
  setActiveDrawFeature,
  setActiveDrawFeatureId,
  setBoundingBoxMetadata,
  setCircleMetadata,
  setJobLayerId,
  setActiveMapItem,
  setRightDrawerOpen,
  clearBoundingBoxMetadata,
  clearCircleMetadata,
  setActiveDvofItem,
  clearActiveDvofItem,
  setJobDvofLayerId,
  setObstructionDrawerOpen,
} from "../../actions";

import { apiRoot } from "../../resources/constants";

const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      display: "none",
    },
  },
  map: {
    height: "calc(100vh - 90px - 74px)",
    width: "100vw",
    zIndex: "-1",
    position: "absolute",
    top: 90,
    bottom: 74,
    left: 0,
    right: 0,
  },
  spacer: {
    flex: 1,
    pointerEvents: "auto",
    zIndex: -2,
  },
  scaleLine: {
    background: "none",
    position: "relative",
    "& div": {
      border: `1px solid ${theme.palette.text.secondary}`,
      borderTop: "none",
      color: theme.palette.text.secondary,
      fontSize: "10px",
      textAlign: "center",
      willChange: "contents width",
      transition: "all 0.15s",
    },
  },
  progressTop: {
    zIndex: theme.zIndex.drawer + 2,
    position: "sticky",
    marginTop: 84,
  },
  progressBot: {
    zIndex: theme.zIndex.drawer + 2,
    position: "sticky",
    marginBottom: 72,
  },
  fab: {
    zIndex: theme.zIndex.drawer + 2,
    background: theme.palette.background.paper,
    width: "196px",
    position: "absolute",
    left: `calc(50% - 106px)`,
    bottom: 8,
  },
  fabButton: {
    marginRight: theme.spacing(1),
  },
});

class Olmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [0, 0],
      zoom: 5,
      lat: "0",
      lon: "0",
      loading: 0,
      loaded: 0,
      progress: 0,
    };

    // radius tooltip for circles on map
    this.measureTooltipElement = null;
    this.measureTooltip = null;

    this.scaleLine = new ScaleLine({
      minWidth: 160,
      className: this.props.classes.scaleLine,
      units: this.props.units,
    });

    // code specific to getting the 4326 projection working
    const projExtent = getProjection("EPSG:4326").getExtent();
    const startResolution = olExtent.getWidth(projExtent) / 512;
    const resolutions = new Array(22);
    for (let i = 0, ii = resolutions.length; i < ii; i += 1) {
      resolutions[i] = startResolution / 2 ** i;
    }
    // ---------------------------------------

    const basemapUrl = this.props.basemap.url;
    this.raster = new TileLayer({
      source: new XYZ({
        url: basemapUrl,
        projection: "EPSG:4326",
        wrapX: true,
        tileGrid: new TileGrid({
          extent: projExtent,
          resolutions,
          origin: [-180, 90],
          tileSize: [256, 256],
          minZoom: 3,
        }),
        zDirection: 0,
      }),
    });

    this.raster.getSource().on("tileloadstart", () => {
      this.addLoading();
    });
    this.raster.getSource().on("tileloadend", () => {
      this.addLoaded();
    });
    this.raster.getSource().on("tileloaderror", () => {
      this.addLoaded();
    });

    this.source = new VectorSource({ wrapX: false });

    this.imageGroup = new LayerGroup();

    this.dvofLayerGroup = new LayerGroup();

    this.selectGroup = [];

    this.vector = new VectorLayer({
      source: this.source,
      style: this.getFeatureStyle(false, 1),
    });

    this.draw = null;

    this.olmap = new Map({
      target: null,
      layers: [this.raster, this.vector, this.imageGroup],
      controls: [],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
        projection: "EPSG:4326",
        extent: projExtent,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map");
    this.scaleLine.setTarget(document.getElementById("scaleLine"));
    this.olmap.addControl(this.scaleLine);
    this.olmap.on("moveend", () => {
      const center = this.olmap.getView().getCenter();
      const zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
    this.pointerInfo(this.olmap);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      units,
      images,
      activeMapItem,
      basemap,
      jobs,
      theme,
      activeDvofItem,
    } = this.props;
    const { lat, lon, progress } = this.state;
    if (nextProps.units !== units) return true;
    if (nextProps.images.length > images.length) return true;
    if (nextProps.activeMapItem !== activeMapItem) return true;
    if (nextProps.basemap !== basemap) return true;
    if (nextProps.jobs !== jobs) return true;
    if (nextState.progress !== progress) return true;
    if (nextState.lat !== lat || nextState.lon !== lon) return true;
    if (nextProps.theme !== theme) return true;
    if (nextProps.activeDvofItem !== activeDvofItem) return true;
    if (nextProps.units !== units) return true;
    return false;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.units !== prevProps.units ||
      this.props.theme !== prevProps.theme
    ) {
      this.olmap.removeControl(this.scaleLine);
      this.scaleLine = new ScaleLine({
        minWidth: 160,
        className: this.props.classes.scaleLine,
        units: this.props.units,
      });
      this.scaleLine.setTarget(document.getElementById("scaleLine"));
      this.olmap.addControl(this.scaleLine);
      // change theme for drawn features
      this.vector.setStyle(this.getFeatureStyle(false, 1));
    }

    // add image to map if there is a new one in the redux store
    if (this.props.images.length > prevProps.images.length) {
      // get new id from incoming array
      const id = this.props.images.filter(
        (item) => !prevProps.images.includes(item)
      );
      const featureImage = new ImageLayer({
        source: new ImageWMS({
          ratio: 1,
          url: `${apiRoot}/proxy/geoserver`,
          params: {
            LAYERS: id,
            TILED: true,
            serverType: "geoserver",
            transition: 0,
          },
        }),
        opacity: 0.5,
      });
      this.props.setJobLayerId(id[0], featureImage.ol_uid);

      // hide feature for layer
      const { visibility, opacity, metadata } = this.props.jobs.find(
        (job) => job.id === id[0]
      );
      const currentFeature = this.source
        .getFeatures()
        .find((feature) => feature.id_ === metadata.featureId);
      currentFeature.setStyle(this.getFeatureStyle(visibility, opacity));

      this.imageGroup.getLayers().push(featureImage);
    }

    // jobs array has changed
    if (this.props.jobs !== prevProps.jobs) {
      if (
        this.props.jobs.length === prevProps.jobs.length &&
        prevProps.jobs.length !== 0
      ) {
        // assumtion we only care when the lengths of the arrays are the same (just opacity change)

        // get job that has an updated opacity
        const opacityJob = this.props.jobs.find(
          (job) =>
            job.opacity !==
            prevProps.jobs.find((item) => item.id === job.id).opacity
        );

        // get the job that has an updated visibility
        const visibiltyJob = this.props.jobs.find(
          (job) =>
            job.visibility !==
            prevProps.jobs.find((item) => item.id === job.id).visibility
        );

        // get the job that has updated features
        const featuresJob = this.props.jobs.find(
          (job) =>
            job.features !==
            prevProps.jobs.find((item) => item.id === job.id).features
        );

        // get the layer associated with opacityJob from the ImageGroup
        if (opacityJob !== undefined) {
          if (opacityJob.layerId !== null) {
            const layer = this.imageGroup
              .getLayersArray()
              .find((item) => item.ol_uid === opacityJob.layerId);
            const { visibility, opacity, metadata } = opacityJob;

            layer.setOpacity(opacity);

            if (visibility) {
              // set appropriate opacity for feature under image as inverse
              const currentFeature = this.source
                .getFeatures()
                .find((feature) => feature.id_ === metadata.featureId);
              currentFeature.setStyle(
                this.getFeatureStyle(visibility, opacity)
              );
            }
          }
        }

        // get the layer associated with visibilityJob from the ImageGroup
        if (visibiltyJob !== undefined) {
          if (visibiltyJob.layerId !== null) {
            const layer = this.imageGroup
              .getLayersArray()
              .find((item) => item.ol_uid === visibiltyJob.layerId);
            const { visibility, opacity, metadata, dvofLayerId } = visibiltyJob;
            layer.setVisible(visibility);

            // set the visibilty if there are dvof features
            if (dvofLayerId !== null) {
              // we have dvof features

              // get the layer from the map that contains the dvof layer id reference
              const dvofLayer = this.olmap
                .getLayers()
                .getArray()
                .find((item) => item.ol_uid === dvofLayerId);

              // set the visibility of that layer to whatever the incoming visibility is
              dvofLayer.setVisible(visibility);

              // also need to unset the key for the animation / close the drawer for dvof if open
              // BUT we need to distinguish which layer and which feature

              // - unset the animation (global unset of the animation - no matter which layer the animation is on)
              unByKey(this.listenerKey);

              // - close drawer
              this.props.setObstructionDrawerOpen(visibility, true);

              // - re-apply animation to dvof
              if (visibility) {
                if (this.props.activeDvofItem !== null) {
                  const dvofFeature = dvofLayer
                    .getSource()
                    .getFeatures()
                    .find(
                      (item) =>
                        item.ol_uid === this.props.activeDvofItem.dvofFeatureId
                    );
                  this.flash(dvofFeature, 2000);
                }
              }
            }

            const currentFeature = this.source
              .getFeatures()
              .find((feature) => feature.id_ === metadata.featureId);
            if (visibility) {
              currentFeature.setStyle(
                this.getFeatureStyle(visibility, opacity)
              );
            } else {
              currentFeature.setStyle(this.getFeatureStyle(true, 1));
            }
          }
        }

        // take the dvof data from the job and associate layers

        if (featuresJob !== undefined) {
          const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(featuresJob.features),
          });

          this.dvofLayer = new VectorLayer({
            source: vectorSource,
            style: this.getFeatureStyle(false, 1),
          });

          // maybe if I do an image group and add the dvof's to a group and set that parent group to be the layer select is looking for?
          this.dvofLayerGroup.getLayers().push(this.dvofLayer);

          this.selectSingleClick = new Select({
            condition: pointerMove,
            layers: [this.dvofLayer],
            filter(feature) {
              return feature.getGeometry() instanceof Point;
            },
            style: new Style({
              image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                  color: `rgba(0, 0, 0, 0.5)`,
                }),
                fill: new Fill({
                  color: `rgba(225, 225, 225, 0.5 )`,
                }),
              }),
            }),
          });

          this.selectGroup.push(this.selectSingleClick);
          this.selectSingleClick.on("select", (evt) => {
            unByKey(this.listenerKey);
            if (
              evt.selected.length > 0 ||
              evt.selected.length === evt.deselected.length
            ) {
              const feature = evt.selected[0];
              const details = evt.selected[0].values_;
              const parentLayerId =
                evt.target.featureLayerAssociation_[feature.ol_uid].ol_uid;
              this.props.setActiveDvofItem(
                featuresJob.metadata.productName,
                feature.ol_uid,
                parentLayerId,
                details
              );
              this.flash(feature, 2000);
            } else {
              this.props.setObstructionDrawerOpen(false, false);
            }
          });
          this.olmap.addInteraction(this.selectSingleClick);
          this.olmap.addLayer(this.dvofLayer);
          this.props.setJobDvofLayerId(featuresJob.id, this.dvofLayer.ol_uid);
        }
      }

      if (
        this.props.jobs.length < prevProps.jobs.length &&
        prevProps.jobs.length !== 0
      ) {
        // we have just deleted a job from the right hand panel
        const job = prevProps.jobs.find(
          (item) => !this.props.jobs.includes(item)
        );

        // get the layer that was deleted based off of the layer id in redux
        const deletedLayer = this.imageGroup
          .getLayersArray()
          .find((layer) => layer.ol_uid === job.layerId);
        this.imageGroup.getLayers().remove(deletedLayer);

        // need to delete the associated map feature (bbox/ circle)
        const deleteFeatured = this.source
          .getFeatures()
          .find((feature) => feature.id_ === job.metadata.featureId);
        this.source.removeFeature(deleteFeatured);

        // need to delete the associated dvof layer if it there is any
        if (job.dvofLayerId !== null) {
          const deletedDvofLayer = this.olmap
            .getLayers()
            .getArray()
            .find((layer) => layer.ol_uid === job.dvofLayerId);
          this.olmap.removeLayer(deletedDvofLayer);
        }

        // close right drawer if last layer / feature was deleted
        if (this.source.getFeatures().length === 0) {
          this.props.setRightDrawerOpen(false);
        }
      }
    }

    // switch basemap if need be
    if (this.props.basemap !== prevProps.basemap) {
      this.raster.getSource().setUrl(this.props.basemap.url);
      const basemapUrl = this.props.basemap.url;
      this.raster.getSource().setUrl(basemapUrl);
    }

    // see if active map item has been updated (zoom to layer or zoom to search result)
    if (this.props.activeMapItem !== prevProps.activeMapItem) {
      if (this.props.activeMapItem !== null) {
        const extent = this.formatExtent(this.props.activeMapItem);
        this.zoomToLocation(extent);
      }
    }
  }

  flash = (feature, duration) => {
    let start = new Date().getTime();
    this.listenerKey = this.raster.on("postrender", (event) => {
      const vectorContext = getVectorContext(event);
      const { frameState } = event;
      const flashGeom = feature.getGeometry().clone();
      const elapsed = frameState.time - start;
      const elapsedRatio = elapsed / duration;
      // radius will be 5 at start and 30 at end.
      const radius = easeOut(elapsedRatio) * 25 + 5;
      const opacity = easeOut(1 - elapsedRatio);

      const style = new Style({
        image: new CircleStyle({
          radius,
          stroke: new Stroke({
            color: `rgba(0, 0, 0, ${opacity})`,
            width: 0.25 + opacity,
          }),
        }),
      });

      vectorContext.setStyle(style);
      vectorContext.drawGeometry(flashGeom);

      if (elapsed > duration) {
        start = new Date().getTime();
      }
      // tell OpenLayers to continue postrender animation
      this.olmap.render();
    });
  };

  // functions to manage loading state of tiles on map
  addLoading = () => {
    let { loading } = this.state;
    this.setState({ loading: (loading += 1) });
    this.update();
  };

  addLoaded = () => {
    let { loaded } = this.state;
    this.setState({ loaded: (loaded += 1) });
    this.update();
  };

  update = () => {
    const { loading, loaded } = this.state;
    this.setState({ progress: parseInt((loaded / loading) * 100) });
    if (loading === loaded) {
      this.setState({
        loading: 0,
        loaded: 0,
      });
      setTimeout(() => {
        this.setState({ progress: 0 });
      }, 500);
    }
  };
  // --- end loading functions

  getFeatureStyle = (visibility, opacity) =>
    new Style({
      fill: new Fill({
        color:
          this.props.theme === "dark"
            ? `rgba(255, 255, 255, ${
                visibility && true ? 0.1 - opacity * 0.1 : 0.1
              })`
            : `rgba(0, 0, 0, ${
                visibility && true ? 0.1 - opacity * 0.1 : 0.1
              })`,
      }),
      stroke: new Stroke({
        color: `rgba(0, 0, 0, ${
          visibility && true ? 0.5 - opacity * 0.5 : 0.5
        })`,
        lineDash: [10, 10],
        width: 2,
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: `rgba(0, 0, 0, ${
            visibility && true ? 0.5 - opacity * 0.5 : 0.5
          })`,
        }),
        fill: new Fill({
          color:
            this.props.theme === "dark"
              ? `rgba(255, 255, 255, ${
                  visibility && true ? 0.1 - opacity * 0.1 : 0.1
                })`
              : `rgba(0, 0, 0, ${
                  visibility && true ? 0.1 - opacity * 0.1 : 0.1
                })`,
        }),
      }),
    });

  createMeasureTooltip = () => {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(
        this.measureTooltipElement
      );
    }
    this.measureTooltipElement = document.createElement("div");
    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, 0],
      positioning: "bottom-center",
    });
    this.olmap.addOverlay(this.measureTooltip);
  };

  addInteraction = (event) => {
    const { value } = event.target;
    let type;
    let geometryFunction;
    let radiusLine;

    // if you have clicked square then circle or vise versa, remove the other interaction
    this.olmap.removeInteraction(this.draw);
    this.props.setActiveDrawFeature(value);

    switch (value) {
      case "boundingBox":
        type = "Circle";
        geometryFunction = createBox();
        this.draw = new Draw({
          source: this.source,
          type,
          geometryFunction,
          style: this.getFeatureStyle(false, 1),
        });

        this.draw.on("drawend", (action) => {
          this.olmap.removeInteraction(this.draw);
          const id = faker.random.uuid();
          action.feature.setId(id);

          // set the id of the active feature in the order to manage them
          this.props.setActiveDrawFeatureId(id);
          const extent = action.feature.getGeometry().getExtent();

          // zoom to extent
          this.zoomToLocation(extent);

          const bottomLeft = olExtent.getBottomLeft(extent);
          const topRight = olExtent.getTopRight(extent);
          const area = (olExtent.getArea(extent) * 10000).toFixed(4);
          this.props.setBoundingBoxMetadata(
            `${bottomLeft[0].toFixed(4)},${bottomLeft[1].toFixed(4)}`,
            `${topRight[0].toFixed(4)},${topRight[1].toFixed(4)}`,
            area
          );
        });
        break;
      case "circle":
        type = "Circle";

        this.draw = new Draw({
          id_: `circle-${faker.random.uuid()}`,
          source: this.source,
          type,
          geometryFunction,
          style: this.getFeatureStyle(false, 1),
        });

        radiusLine = new Draw({
          source: this.source,
          type: "LineString",
          maxPoints: 2,
          style: this.getFeatureStyle(false, 1),
        });

        // draw event triggers for radius line within circle
        radiusLine.on("drawstart", (action) => {
          let tooltipCoord = action.coordinate;

          action.feature.getGeometry().on("change", (changeEvent) => {
            const geom = changeEvent.target;
            const output = this.formatLength(geom);
            tooltipCoord = this.getCenterOfExtent(geom.getExtent());

            this.measureTooltipElement.innerHTML = output;
            this.measureTooltip.setPosition(tooltipCoord);
          });
        });

        radiusLine.on("drawend", () => {
          this.olmap.removeInteraction(radiusLine);
          this.measureTooltip.setOffset([0, 0]);
          this.measureTooltipElement = null;
          this.createMeasureTooltip();
        });

        // draw event triggers for the circle
        this.draw.on("drawstart", (action) => {
          const sketch = action.feature;
          sketch.getGeometry().on("change", () => {
            // const extent = changeEvent.target.getExtent()
            // console.log(`radius: ${olExtent.getWidth(extent) / 2.0}`)
          });
        });

        this.draw.on("drawend", (action) => {
          this.olmap.removeInteraction(this.draw);
          // this.olmap.removeInteraction(radiusLine)
          action.feature.setId(faker.random.uuid());
          const extent = action.feature.getGeometry().getExtent();
          const coordinate = olExtent.getCenter(extent);
          const center = `${coordinate[0].toFixed(4)},${coordinate[1].toFixed(
            4
          )}`;
          const radius = (olExtent.getWidth(extent) / 2.0 / 1000).toFixed(4);
          // eslint-disable-next-line no-mixed-operators
          const area = (Math.PI * radius ** 2).toFixed(4);
          this.props.setCircleMetadata(center, area, radius);
        });
        break;
      default:
        return "";
    }

    // add the draw interactions to the map
    this.olmap.addInteraction(this.draw);
    if (radiusLine) {
      this.olmap.addInteraction(radiusLine);
      this.createMeasureTooltip();
    }
  };

  // format the radius line for a circle
  formatLength = (line) => {
    const length = getLength(line);
    let output;
    if (length > 100) {
      output = `${Math.round((length / 1000) * 100) / 100} km`;
    } else {
      output = `${Math.round(length * 100) / 100} m`;
    }
    return output;
  };

  formatExtent = (extent) => extent.map((coord) => parseFloat(coord));

  getCenterOfExtent = (Extent) => {
    const X = Extent[0] + (Extent[2] - Extent[0]) / 2;
    const Y = Extent[1] + (Extent[3] - Extent[1]) / 2;
    return [X, Y];
  };

  zoomToLocation = (extent) => {
    this.olmap.getView().fit(extent, {
      size: this.olmap.getSize(),
      padding: [64, 64, 64, 64],
      duration: 1000,
    });
    this.props.setActiveMapItem(null);
  };

  pointerInfo = (map) => {
    map.on("pointermove", (evt) => {
      const coord = evt.coordinate;
      this.setState({
        lat: coord[1].toFixed(4),
        lon: coord[0].toFixed(4),
        zoom: map.getView().getZoom().toFixed(0),
      });
    });
  };

  zoomIn = () => {
    this.olmap.getView().animate({
      center: this.olmap.getView().getCenter(),
      zoom: this.olmap.getView().getZoom() + 1,
      duration: 500,
    });
  };

  zoomOut = () => {
    if (this.olmap.getView().getZoom() === 3) {
      return;
    }
    this.olmap.getView().animate({
      center: this.olmap.getView().getCenter(),
      zoom: this.olmap.getView().getZoom() - 1,
      duration: 500,
    });
  };

  handleClearFeature = () => {
    const { feature, featureId } = this.props;
    if (feature === "boundingBox") {
      this.props.clearBoundingBoxMetadata();
    } else {
      this.props.clearCircleMetadata();
    }
    // need to delete the associated map feature (bbox/ circle)
    const deletedFeature = this.source
      .getFeatures()
      .find((item) => item.id_ === featureId);
    this.source.removeFeature(deletedFeature);
  };

  render() {
    const { classes, featureId } = this.props;
    const { lat, lon, progress } = this.state;
    return (
      <React.Fragment>
        <div id="map" className={classes.map}>
          <Appbar
            addInteraction={this.addInteraction}
            getLayers={this.getLayers}
          />
          <MapDetails
            progress={progress}
            zoomIn={this.zoomIn}
            zoomOut={this.zoomOut}
            lon={lon}
            lat={lat}
          />
          {featureId && (
            <Fab
              variant="extended"
              size="small"
              aria-label="add"
              className={classes.fab}
              onClick={this.handleClearFeature}
            >
              <Close className={classes.fabButton} />
              delete bounding box
            </Fab>
          )}
        </div>
      </React.Fragment>
    );
  }
}

Olmap.defaultProps = {
  activeMapItem: [],
  feature: "",
  featureId: "",
  activeDvofItem: {},
};

Olmap.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  basemap: PropTypes.object.isRequired,
  units: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  jobs: PropTypes.array.isRequired,
  activeMapItem: PropTypes.array,
  feature: PropTypes.string,
  featureId: PropTypes.string,
  activeDvofItem: PropTypes.object,
  setActiveDrawFeature: PropTypes.func.isRequired,
  setActiveDrawFeatureId: PropTypes.func.isRequired,
  setBoundingBoxMetadata: PropTypes.func.isRequired,
  setCircleMetadata: PropTypes.func.isRequired,
  setJobLayerId: PropTypes.func.isRequired,
  setActiveMapItem: PropTypes.func.isRequired,
  setRightDrawerOpen: PropTypes.func.isRequired,
  clearBoundingBoxMetadata: PropTypes.func.isRequired,
  clearCircleMetadata: PropTypes.func.isRequired,
  setObstructionDrawerOpen: PropTypes.func.isRequired,
  setJobDvofLayerId: PropTypes.func.isRequired,
  setActiveDvofItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.app.theme,
  basemap: state.app.basemap,
  units: state.app.units,
  images: state.map.images,
  jobs: state.job.jobs,
  activeMapItem: state.app.activeMapItem,
  feature: state.order.feature,
  featureId: state.order.featureId,
  activeDvofItem: state.app.activeDvofItem,
});

const mapDispatchToProps = {
  toggleAppLoading,
  setActiveDrawFeature,
  setActiveDrawFeatureId,
  setBoundingBoxMetadata,
  setCircleMetadata,
  setJobLayerId,
  setActiveMapItem,
  setRightDrawerOpen,
  clearBoundingBoxMetadata,
  clearCircleMetadata,
  setActiveDvofItem,
  setObstructionDrawerOpen,
  clearActiveDvofItem,
  setJobDvofLayerId,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
);
export default enhance(Olmap);
