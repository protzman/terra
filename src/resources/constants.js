export const dmsRegex = /([0-9]{1,2})[:|°]\s([0-9]{1,2})[:|'|′]\s?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]\s([N|S]),\s([0-9]{1,3})[:|°]\s([0-9]{1,2})[:|'|′]\s?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]\s([E|W])/g;

export const mgrsRegex = /([0-9]{1,2}[^ABIOYZabioyz])\s([A-Za-z]{2})\s([0-9]{2,5})\s([0-9]{2,5})/g;

export const latLonRegex = /([0-9]{1,3}\.[0-9]{1,11}).+/g;

export const apiRoot = `${process.env.REACT_APP_BACKEND_API_HOST}`;

export const redirectUrl = `http://localhost:3000`;

export const searchUrl = `https://osm-nominatim.gs.mil/search?`;

export const environment = `${process.env.REACT_APP_ENV}`;

export const disclaimer = `${process.env.REACT_APP_ENV_DISCLAIMER}`;

export const matomoSiteId = `${process.env.REACT_APP_MATOMO_SITE_ID}`;
