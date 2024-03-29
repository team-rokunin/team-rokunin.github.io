import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import { CssBaseline } from '@mui/joy'

import Provider from './store'
import Router from './components'
import Import from './components/import'
import ServiceWorkerRegistrator from './components/service-worker'
import { useScreenState } from './store/screen'

const ThemeProvider: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  const [{ type: screenType }] = useScreenState()

  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          text: {
            primary: 'rgba(190, 253, 224, 1)',
            secondary: 'rgba(31, 228, 146, 1)',
          },
          primary: {
            400: 'rgba(31, 228, 146, 1)',
            600: 'rgba(22, 156, 115, 1)',
          },
          danger: {
            400: 'rgba(249, 111, 109, 1)',
          },
          background: {
            body: 'rgba(15, 29, 36, 1)',
            level1: 'rgba(15, 80, 68, 1)',
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
        fontSize: ['xs-phone'].includes(screenType) ? '16px' : '28px',
        fontWeight: 700,
        letterSpacing: '0.2em',
      },
      h4: {
        fontSize: ['xs-phone'].includes(screenType) ? '20px' : '24px',
      },
      body1: {
        fontSize: ['xs-phone'].includes(screenType) ? '14px' : '16px',
        letterSpacing: '0.1em',
      },
      body3: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: ['xs-phone'].includes(screenType) ? '10px' : '12px',
      },
    },
    breakpoints: {
      values: {
        xl: 1536,
        lg: 1200,
        md: 900,
        sm: 600,
        xs: 0,
      },
    },
  })

  const { children } = props
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>
}

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <>
      <ServiceWorkerRegistrator />
      <Provider>
        <ThemeProvider>
          <CssBaseline />
          <Import />
          <Router />
        </ThemeProvider>
      </Provider>
    </>
  )
}
