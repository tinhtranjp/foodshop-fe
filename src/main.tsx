import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles'
import {RouterProvider} from 'react-router-dom'
import router from '~/routes/router'
import {Provider} from 'react-redux'
import {persistor, store} from './redux/store'
import {StyledEngineProvider} from '@mui/material/styles'
import './index.css'
import {PersistGate} from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
