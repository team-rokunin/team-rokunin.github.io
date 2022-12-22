import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'

import { replaceRGBAlpha } from './color'

const LightForeground: React.FunctionComponent = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'block',
        position: 'fixed',
        top: '4px',
        bottom: '4px',
        left: '6px',
        right: '6px',
        boxShadow: [`inset 0 0 32px ${theme.palette.primary[400]}`, `0 0 128px ${theme.palette.primary[400]}`].join(
          ','
        ),
        borderRadius: '16px',
        filter: 'brightness(180%)',
        zIndex: 10000,
        pointerEvents: 'none',
      }}
    />
  )
}
export default LightForeground
