import * as React from 'react'
import Box from '@mui/joy/Box'

import NoiseBackground from '../../../asset/img/noise.svg'

const GrainBackground: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${NoiseBackground})`,
        backgroundSize: 'cover',
        filter: 'blur(64px)',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}
export default GrainBackground
