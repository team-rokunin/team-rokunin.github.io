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
        width: '100%',
        height: '100%',
        background: [
          `linear-gradient(to left, ${[
            theme.palette.primary[400].replace(...replaceRGBAlpha(0.3)),
            `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 3%`,
            `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 97%`,
            theme.palette.primary[400].replace(...replaceRGBAlpha(0.3)),
          ].join(',')})`,
        ].join(','),
        filter: 'contrast(170%) brightness(150%)',
        zIndex: 1500,
        pointerEvents: 'none',
      }}
    />
  )
}
export default LightForeground
