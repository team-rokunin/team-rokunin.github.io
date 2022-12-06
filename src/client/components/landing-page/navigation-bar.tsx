import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'

import RokuninLogo from '../../../asset/img/rokunin.svg'
import FacebookLogo from '../../../asset/img/facebook.svg'
import TwitterLogo from '../../../asset/img/twitter.svg'
import LinkedInLogo from '../../../asset/img/linkedin.svg'
import InstagramLogo from '../../../asset/img/instagram.svg'

const NavigationBar: React.FunctionComponent = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '192px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '48px',
            width: '1px',
            height: '100%',
            background: `linear-gradient(${[
              'to bottom',
              theme.palette.primary[400].replace(/1\)$/, '0.3)'),
              `${theme.palette.primary[400].replace(/1\)$/, '0)')} 2% 12%`,
              `${theme.palette.primary[400].replace(/1\)$/, '0.2)')} 14%`,
              `${theme.palette.primary[400].replace(/1\)$/, '0)')} 16%`,
              `${theme.palette.primary[400].replace(/1\)$/, '0.2)')} 18%`,
              `${theme.palette.primary[400].replace(/1\)$/, '0)')} 22% 74%`,
              theme.palette.primary[400].replace(/1\)$/, '0.1) 82%'),
              `${theme.palette.primary[400].replace(/1\)$/, '0)')} 96%`,
            ].join(',')})`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            right: '48px',
            width: '1px',
            height: '100%',
            background: `linear-gradient(${[
              'to bottom',
              theme.palette.primary[400].replace(/1\)$/, '0.3)'),
              `${theme.palette.primary[400].replace(/1\)$/, '0.4)')} 6%`,
              `${theme.palette.primary[400].replace(/1\)$/, '0)')} 13% 16%`,
              `${theme.palette.primary[400].replace(/1\)$/, '0.2)')} 20% 32%`,
              `${theme.palette.primary[400].replace(/1\)$/, '0)')} 37% 88%`,
              theme.palette.primary[400].replace(/1\)$/, '0.3)'),
            ].join(',')})`,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '226px',
            padding: '64px',
          }}
        >
          <img
            src={RokuninLogo}
            style={{
              width: '64px',
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '4px',
          }}
        >
          {[
            {
              label: 'HOME',
              active: true,
              icon: (
                <>
                  <path d="M19,5v-1h-2v-1h-2v-1h-2V1H7v1h-2v1H3v1H1v1H0v2H1v10H0v2H9v-7h2v7h9v-2h-1V7h1v-2h-1Zm-2,12h-4v-7H7v7H3V6h2v-1h2v-1h2v-1h2v1h2v1h2v1h2v11Z" />
                </>
              ),
            },
            {
              label: 'PORTFOLIO',
              active: false,
              icon: (
                <>
                  <path d="M9.5,1H3.5V19h6v-2h2v-2h2v-2h2v-1h1v-4h-1v-1h-2v-2h-2V3h-2V1Zm2,10v2h-2v2h-2v2h-2V3h2v2h2v2h2v2h2v2h-2Z" />
                </>
              ),
            },
            {
              label: 'CONTACT US',
              active: false,
              icon: (
                <>
                  <path d="M19,2V1H1v1H0V18H1v1H19v-1h1V2h-1Zm-1,3h-1v1h-2v1h-2v1h-2v1h-2v-1h-2v-1h-2v-1H3v-1h-1v-1h1v-1h14v1h1v1Zm0,11h-1v1H3v-1h-1V8h1v1h2v1h2v1h1v1h4v-1h1v-1h2v-1h2v-1h1v8Z" />
                </>
              ),
            },
            {
              label: 'TALENT',
              active: false,
              icon: (
                <>
                  <path d="M19,7v-1h-4V1h-1V0H6V1h-1V6H1v1H0v12H1v1H19v-1h1V7h-1Zm-1,10h-1v1H3v-1h-1V9h1v-1h14v1h1v8ZM7,3h1v-1h4v1h1v3H7V3Z" />
                </>
              ),
            },
          ].map((button) => (
            <Box
              key={button.label}
              sx={{
                width: '64px',
                height: '64px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: `2px solid ${
                  button.active ? theme.palette.primary[400].replace(/1\)$/, '0.4)') : 'rgba(255, 255, 255, 0.2)'
                }`,
                boxShadow: [
                  `inset 0 0 16px ${
                    button.active ? theme.palette.primary[400].replace(/1\)$/, '0.2)') : 'rgba(255, 255, 255, 0.1)'
                  }`,
                  `0 0 ${button.active ? 48 : 16}px ${
                    button.active ? theme.palette.primary[400].replace(/1\)$/, '0.5)') : 'rgba(255, 255, 255, 0.1)'
                  }`,
                ].join(','),
                backgroundColor: button.active
                  ? theme.palette.primary[400].replace(/1\)$/, '0.2)')
                  : 'rgba(255, 255, 255, 0.05)',
                pointerEvents: 'all',
                backdropFilter: 'blur(6px)',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={{ height: '14px', width: '14px' }}>
                <g fill={button.active ? theme.palette.primary[400] : 'rgb(255, 255, 255)'}>{button.icon}</g>
              </svg>
            </Box>
          ))}
        </Box>
        <Box sx={{ height: '226px' }} />
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '192px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '48px',
            width: '1px',
            height: '100%',
            background: `linear-gradient(${[
              'to bottom',
              theme.palette.primary[400].replace(/1\)$/, '0) 38%'),
              `${theme.palette.primary[400].replace(/1\)$/, '0.1)')} 42% 56%`,
              theme.palette.primary[400].replace(/1\)$/, '0) 64%'),
            ].join(',')})`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            right: '48px',
            width: '1px',
            height: '100%',
            background: `linear-gradient(${[
              'to bottom',
              theme.palette.primary[400].replace(/1\)$/, '0.3)'),
              `${theme.palette.primary[400].replace(/1\)$/, '0)')} 58% 82%`,
              theme.palette.primary[400].replace(/1\)$/, '0.1)'),
            ].join(',')})`,
          }}
        />
        {[
          {
            label: 'Facebook',
            icon: FacebookLogo,
          },
          {
            label: 'Twitter',
            icon: TwitterLogo,
          },
          {
            label: 'LinkedIn',
            icon: LinkedInLogo,
          },
          {
            label: 'Instagram',
            icon: InstagramLogo,
          },
        ].map((button) => (
          <Box
            key={button.label}
            sx={{
              width: '64px',
              height: '64px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'all',
            }}
          >
            <img src={button.icon} alt={button.label} style={{ height: '14px', width: '14px' }} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default NavigationBar
