import * as React from 'react'
import { keyframes } from '@emotion/react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import HeroVideo from '../../../asset/vid/hero-section.mp4'
import { useScreenState } from '../../store/screen'
import { useRefCallback } from '../common/hook'
import { replaceRGBAlpha } from '../common/color'

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
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          onResize(entry.contentRect)
        }
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
      sx={{
        position: 'relative',
        width: '100vw',
        height: screenType === 'xs-phone' ? '640px' : '960px',
      }}
    >
      <video
        ref={videoRef}
        playsInline
        muted
        onLoadedData={onVideoLoaded}
        onEnded={onVideoEnded}
        onClick={playState !== 'loading' ? pauseResumeVideo : undefined}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          cursor: playState !== 'loading' ? 'pointer' : 'default',
        }}
      >
        <source src={HeroVideo} type="video/mp4" />
      </video>
      {[
        {
          state: 'loading',
          background: theme.palette.primary[400],
        },
        {
          state: 'stopped',
          background: theme.palette.primary[400],
        },
        {
          state: 'paused',
          background: theme.palette.primary[400].replace(...replaceRGBAlpha(0.3)),
        },
      ].map((screen) => (
        <Box
          key={screen.state}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '32px',
            backgroundColor: screen.background,
            opacity: playState === screen.state ? 1 : 0,
            pointerEvents: 'none',
          }}
        />
      ))}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: '0 192px',
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
              border: `2px solid ${theme.palette.primary[400]}`,
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
                backgroundColor: theme.palette.primary[400],
                borderRadius: '2.5px',
                animation: `${mouseScrollDownAnimation} 2.4s infinite`,
              }}
            />
          </Box>
          <Typography level="body1" sx={{ fontSize: '12px', color: 'white' }}>
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
