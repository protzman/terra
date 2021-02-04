import { createMuiTheme } from '@material-ui/core/styles'

const colors = {
  fol_primary: '#008DD5',
  fol_grey1: '#363640',
  fol_grey2: '#484851',
  fol_white1: '#EEEEEE',
  fol_white2: '#d9d9d9',
  fol_error: '#CC2936',
  fol_success: '#81C14B',
  fol_info: '#EBCB8B'
}

export const theme = type => createMuiTheme({
  palette: {
    type,
    primary: {
      main: colors.fol_primary
    },
    secondary: {
      main: colors.fol_error
    },
    background: {
      paper: type === 'light' ? colors.fol_white1 : colors.fol_grey1,
      default: type === 'light' ? colors.fol_white2 : colors.fol_grey2,
      // button / badge / alert colors
      info: colors.fol_primary,
      warning: colors.fol_info,
      error: colors.fol_error,
      success: colors.fol_success,
      // environment based colors
      fouo: colors.fol_success,
      secret: colors.fol_error,
      topSecret: colors.fol_info
    },
    tonalOffset: 0.3
  },
  shape: {
    borderRadius: 5
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    mono: {
      fontFamily: 'Roboto Mono, monospace'
    },
    useNextVariants: true
  }
})
