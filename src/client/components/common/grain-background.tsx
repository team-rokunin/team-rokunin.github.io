import * as React from 'react'
import { Global, css } from '@emotion/react'
import Box from '@mui/joy/Box'

const style = css(`
  @keyframes background-moving {
    0%, 100% {
      transform: translate(0, 0)
    }
    10% {
      transform: translate(-5%, -10%)
    }
    20% {
      transform: translate(-15%, 5%)
    }
    30% {
      transform: translate(7%, -25%)
    }
    40% {
      transform: translate(-5%, 25%)
    }
    50% {
      transform: translate(-15%, 10%)
    }
    60% {
      transform: translate(15%, 0%)
    }
    70% {
      transform: translate(0%, 15%)
    }
    80% {
      transform: translate(3%, 35%)
    }
    90% {
      transform: translate(-10%, 10%)
    }
  }
`)
const GrainBackground: React.FunctionComponent = () => {
  return (
    <>
      <Global styles={style} />
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          background: 'rgb(11 ,35, 29)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '300%',
            height: '300%',
            top: '-100%',
            left: '-100%',
            backgroundColor: 'rgb(11 ,35, 29)',
            backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)',
            backgroundRepeat: 'repeat',
            backgroundSize: '750px 750px',
            animation: 'background-moving 24s steps(10) infinite',
            filter: 'contrast(170%) brightness(300%)',
            mixBlendMode: 'multiply',
          }}
        />
      </Box>
    </>
  )
}
export default GrainBackground
