import './theme-augmentation'
import {experimental_extendTheme as extendTheme} from '@mui/material/styles'

const theme = extendTheme({
  tCustom: {
    navTopHeight: '65px',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#222',
        },
        secondary: {
          main: '#2196f3',
        },
        textColor: {
          primary: '#222222s',
          button: '#35454c',
          link: '#4183c4',
        },
        customBg: {
          primary: '#E6E4DE',
          secondary: '#F4F2EF',
          btnPrimary: '#D58061',
          btnSecondary: '#2196f3',
          btnAndFileSmall: '#eff2f4',
          dark: '#222222',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#1565c0',
        },
        secondary: {
          main: '#7b1fa2',
        },
        textColor: {
          primary: '#FFFFFF',
          button: '#35454c',
          link: '#4183c4',
        },
        customBg: {
          primary: '#F4F2EF',
          secondary: '#E6E4DE',
          btnPrimary: '#D58061',
          btnSecondary: '#2196f3',
          btnAndFileSmall: '#eff2f4',
          dark: '#222222',
        },
      },
    },
  },
})
export default theme
