import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    [key: string]: any
  }
  interface PaletteOptions {
    [key: string]: any
  }
  interface Theme {
    tCustom: {
      [key: string]: any
    }
  }

  interface CssVarsThemeOptions {
    tCustom: {
      [key: string]: any
    }
  }
}
