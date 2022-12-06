import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'

const LinedForeground: React.FunctionComponent = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'block',
        position: 'fixed',
        width: '100%',
        height: '100%',
        background: [
          `linear-gradient(${[
            `${theme.palette.primary[400].replace(/1\)$/, '0)')} 50%`,
            'rgba(0, 0, 0, 0.25) 50%',
          ].join(',')})`,
          `linear-gradient(90deg, ${['rgba(255, 0, 0, 0.06)', 'rgba(0, 255, 0, 0.06)', 'rgba(0, 0, 255, 0.06)'].join(
            ','
          )})`,
        ].join(','),
        backgroundSize: ['100% 2px', '3px 100%'].join(','),
        zIndex: 1500,
        pointerEvents: 'none',
      }}
    />
  )
}
export default LinedForeground
