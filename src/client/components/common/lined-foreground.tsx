import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'

import { replaceRGBAlpha } from './color'

const LinedForeground: React.FunctionComponent = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'block',
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        background: [
          `linear-gradient(${[
            `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 50%`,
            'rgba(0, 0, 0, 0.3) 50%',
          ].join(',')})`,
          `linear-gradient(90deg, ${['rgba(255, 0, 0, 0.12)', 'rgba(0, 255, 0, 0.12)', 'rgba(0, 0, 255, 0.12)'].join(
            ','
          )})`,
        ].join(','),
        backgroundSize: ['100% 2px', '3px 100%'].join(','),
        zIndex: 10000,
        pointerEvents: 'none',
      }}
    />
  )
}
export default LinedForeground
