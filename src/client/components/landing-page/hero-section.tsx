import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'

import HeroVideo from '../../../asset/vid/hero-section.mp4'
import { useScreenState } from '../../store/screen'
import Button from '../common/button'

const HeroSection: React.FunctionComponent = () => {
  const [{ type: screenType }] = useScreenState()
  const [state, setState] = React.useState<HeroSectionState>({
    playState: 'loading',
  })
  const videoRef = React.useRef<HTMLVideoElement>(null)

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
          background: theme.palette.primary[400].replace(/1\)$/, '0.3)'),
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
            justifyContent: 'center',
            padding: '64px',
          }}
        >
          <Button label="LEARN MORE" />
        </Box>
      </Box>
    </Box>
  )
}
type HeroSectionState = {
  playState: 'loading' | 'playing' | 'paused' | 'stopped'
}

export default HeroSection
