import * as React from 'react'
import { keyframes } from '@emotion/react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'

const backgroundMovingAnimation = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-5%, -10%);
  }
  20% {
    transform: translate(-15%, 5%);
  }
  30% {
    transform: translate(7%, -25%);
  }
  40% {
    transform: translate(-5%, 25%);
  }
  50% {
    transform: translate(-15%, 10%);
  }
  60% {
    transform: translate(15%, 0%);
  }
  70% {
    transform: translate(0%, 15%);
  }
  80% {
    transform: translate(3%, 35%);
  }
  90% {
    transform: translate(-10%, 10%);
  }
`
const GrainBackground: React.FunctionComponent = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        background: theme.palette.background.body,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '300%',
          height: '300%',
          top: '-100%',
          left: '-100%',
          backgroundColor: theme.palette.background.body,
          backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '1000px 1000px',
          animation: `${backgroundMovingAnimation} 24s steps(5) infinite`,
          filter: 'contrast(150%) brightness(320%)',
          mixBlendMode: 'multiply',
        }}
      />
    </Box>
  )
}
export default GrainBackground
