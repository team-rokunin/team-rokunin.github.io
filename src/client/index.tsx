import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { CssBaseline } from '@mui/joy'

import Provider from './store'
import Router from './components'
import Import from './components/import'

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: 'rgba(34, 39, 51, 1)',
          secondary: 'rgba(255, 255, 255, 1)',
        },
        primary: {
          400: 'rgba(31, 228, 146, 1)',
        },
        background: {
          body: 'rgba(11 ,35, 29, 1)',
        },
      },
    },
  },
  fontFamily: {
    body: ['ocr-a', 'sans-serif'].join(','),
  },
  typography: {
    h3: {
      fontFamily: ['Eurostile', 'sans-serif'].join(','),
      fontSize: '28px',
      fontWeight: 700,
      letterSpacing: '0.2em',
    },
    h4: {
      fontSize: '24px',
    },
    body1: {
      fontSize: '16px',
      letterSpacing: '0.1em',
    },
  },
})

ReactDOM.render(
  <Provider>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Import />
      <Router />
    </CssVarsProvider>
  </Provider>,
  document.getElementById('root')
)
