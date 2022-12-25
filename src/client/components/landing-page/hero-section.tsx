import * as React from 'react'
import { keyframes } from '@emotion/react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import HeroVideo from '../../../asset/vid/hero-section.mp4'
import { useScreenState } from '../../store/screen'
import { useRefCallback } from '../common/hook'

const mouseScrollDownAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-18px);
  },
  40% {
    opacity: 1;
    transform: translateY(0);
  },
  60% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(18px);
  }
`
export const crtTurnOnAnimation = keyframes`
  0% {
    transform: scale(1, 0.8) translate3d(0, 0, 0);
    filter: brightness(30);
    opacity: 1;
  }
  3.5% {
    transform: scale(1, 0.8) translate3d(0, 100%, 0);
  }
  3.6% {
    transform: scale(1, 0.8) translate3d(0, -100%, 0);
    opacity: 1;
  }
  9% {
    transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
    filter: brightness(3);
    opacity: 0;
  }
  11% {
    transform: scale(1, 1) translate3d(0, 0, 0);
    filter: contrast(0) brightness(0);
    opacity: 0;
  }
  100% {
    transform: scale(1, 1) translate3d(0, 0, 0);
    filter: contrast(1) brightness(1);
    opacity: 1;
  }
`
export const crtTurnOffAnimation = keyframes`
  0% {
    transform: scale(1, 1.3) translate3d(0, 0, 0);
    filter: brightness(1);
    opacity: 1;
  }
  60% {
    transform: scale(1.3, 0.001) translate3d(0, 0, 0);
    filter: brightness(10);
  }
  100% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: scale(0, 0.0001) translate3d(0, 0, 0);
    filter: brightness(50);
  }
`
const HeroSection: React.FunctionComponent<HeroSectionProps> = (props) => {
  const [{ type: screenType }] = useScreenState()
  const [state, setState] = React.useState<HeroSectionState>({
    playState: 'loading',
  })
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = useRefCallback((node) => {
    if (props.onResize && node) {
      const onResize = props.onResize
      onResize(node.getBoundingClientRect())
      const resizeObserver = new ResizeObserver(() => {
        onResize(node.getBoundingClientRect())
      })
      resizeObserver.observe(node)
      return () => resizeObserver.disconnect()
    }
  })

  React.useEffect(() => {
    const video = videoRef.current
    if (state.playState === 'paused') {
      video?.pause()
    } else if (state.playState === 'playing') {
      video?.play()
    }
  }, [state.playState])

  const pauseResumeVideo = () => {
    const video = videoRef.current
    if (video?.ended || video?.paused) {
      setState((state) => ({
        ...state,
        playState: 'playing',
      }))
    } else {
      setState((state) => ({
        ...state,
        playState: 'paused',
      }))
    }
  }
  const onVideoLoaded = () => {
    const video = videoRef.current
    if (video) {
      setState((state) => ({
        ...state,
        playState: 'playing',
      }))
    }
  }
  const onVideoEnded = () => {
    const video = videoRef.current
    setState((state) => ({
      ...state,
      playState: 'stopped',
    }))
    if (video) {
      setState((state) => ({
        ...state,
        playState: 'playing',
      }))
      video.play()
    }
  }

  const theme = useTheme()
  const { playState } = state
  return (
    <Box
      ref={containerRef}
      onClick={playState !== 'loading' ? pauseResumeVideo : undefined}
      sx={{
        position: 'relative',
        width: '100vw',
        height: ['xs-phone', 'sm-tablet'].includes(screenType) ? '720px' : '960px',
        cursor: playState !== 'loading' ? 'pointer' : 'default',
        backgroundColor: 'black',
        overflow: 'hidden',
      }}
    >
      <Box
        component="video"
        ref={videoRef}
        playsInline
        muted
        onLoadedData={onVideoLoaded}
        onEnded={onVideoEnded}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation:
            playState === 'playing'
              ? `${crtTurnOnAnimation} 2.3s linear forwards`
              : playState === 'paused'
              ? `${crtTurnOffAnimation} 0.55s cubic-bezier(0.230, 1.000, 0.320, 1.000) forwards`
              : undefined,
        }}
      >
        <source src={HeroVideo} type="video/mp4" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: ['xs-phone', 'sm-tablet'].includes(screenType) ? '0 46px' : '0 192px',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            padding: '64px',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '24px',
              height: '36px',
              border: `2px solid ${theme.palette.primary[600]}`,
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '8px',
                left: 'calc(50% - 2.5px)',
                width: '5px',
                height: '5px',
                backgroundColor: theme.palette.primary[600],
                borderRadius: '2.5px',
                animation: `${mouseScrollDownAnimation} 2.4s infinite`,
              }}
            />
          </Box>
          <Typography level="body1" sx={{ fontSize: '12px', color: theme.palette.text.primary }}>
            scroll down
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
type HeroSectionState = {
  playState: 'loading' | 'playing' | 'paused' | 'stopped'
}
type HeroSectionProps = {
  onResize?: (dimension: DOMRect) => void
}

export default HeroSection
