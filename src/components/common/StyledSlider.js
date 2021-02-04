import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

export const StyledSlider = withStyles(theme => ({
  root: {
    padding: 0
  },
  thumb: {
    height: theme.spacing(2),
    width: theme.spacing(2),
    marginTop: `calc(-${theme.spacing(2)}px / 2)`,
    border: `3px solid ${theme.palette.background.paper}`
  },
  track: {
    backgroundColor: theme.palette.primary.main,
    marginTop: `calc(-${theme.spacing(1)}px / 2)`,
    height: theme.spacing(1),
    borderRadius: theme.shape.borderRadius
  }
}))(Slider)
