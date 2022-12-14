import * as React from 'react'
import { keyframes } from '@emotion/react'
import Box from '@mui/joy/Box'

const glitchClipAnimation = keyframes`
  0% {
    clip-path: polygon(0 100%, 100% 100%, 100% 120%, 0 120%);
  }
  100% {
    clip-path: polygon(0 -20%, 100% -20%, 100% 0, 0 0);
  }
`
const Glitch: React.FunctionComponent<React.PropsWithChildren<GlitchProps>> = (props) => {
  const [state, setState] = React.useState<GlitchState>({
    hover: false,
  })

  const glitchAnimations = Array(10)
    .fill(undefined)
    .map(() => {
      return keyframes`
        0% {
          transform: translateX(0);
        }
        80% {
          transform: translateX(0);
        }
        85% {
          transform: translateX(${Math.random() * 10 - 5}px);
          filter: opacity(50%) drop-shadow(0 0 rgb(78, 154, 38));
        }
        90% {
          transform: translateX(${Math.random() * 10 - 5}px);
          filter: opacity(50%) drop-shadow(0 0 rgb(172, 18, 18));
        }
        95% {
          transform: translateX(${Math.random() * 10 - 5}px);
          filter: opacity(50%) drop-shadow(0 0 rgb(255, 255, 255));
        }
        100% {
          transform: translateX(0);
        }
      `
    })

  const onMouseEvent: React.MouseEventHandler = (event) => {
    switch (event.type) {
      case 'mouseenter':
        setState((state) => ({ ...state, hover: true }))
        break
      case 'mouseleave':
        setState((state) => ({ ...state, hover: false }))
        break
    }
  }

  const { url, onClick } = props
  const { hover } = state
  return (
    <Box
      component="a"
      href={url}
      onClick={onClick}
      onMouseEnter={onMouseEvent}
      onMouseLeave={onMouseEvent}
      sx={{
        padding: 0,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: 'opacity 160ms ease-in-out',
        ['&:active']: { opacity: 0.5 },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {Array(hover ? 10 : 1)
          .fill(undefined)
          .map((_, index) => (
            <Box
              key={index}
              sx={{
                ...(index !== 0
                  ? {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }
                  : {}),
                animation: hover
                  ? [
                      `${glitchClipAnimation} 3s ${index * -300}ms linear infinite`,
                      `${glitchAnimations[index]} 500ms ${Math.random() * -1000}ms linear infinite`,
                    ].join(',')
                  : undefined,
              }}
            >
              {props.children}
            </Box>
          ))}
      </Box>
    </Box>
  )
}
type GlitchProps = {
  url?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
}
type GlitchState = {
  hover: boolean
}
export default Glitch
