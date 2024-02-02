import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    textColor: {
      primary: string
      button: string
      link: string
    }
    customBg: {
      primary: string
      secondary: string
      btnPrimary: string
      btnSecondary: string
      btnAndFileSmall: string
      dark: string
    }
  }

  interface PaletteOptions {
    textColor?: {
      primary?: string
      button?: string
      link?: string
    }
    customBg: {
      primary?: string
      secondary?: string
      btnPrimary?: string
      btnSecondary?: string
      btnAndFileSmall?: string
      dark?: string
    }
  }
}
