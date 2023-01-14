import * as React from 'react'
import { useLinkClickHandler } from 'react-router-dom'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useScreenState } from '../../store/screen'
import { usePortfolioState } from '../../store/portfolio'
import { useRefCallback } from '../common/hook'
import { replaceRGBAlpha } from '../common/color'
import HeaderText from '../common/header-text'
import Button from '../common/button'
import VideoLightboxModal from '../common/lightbox'
import { crtTurnOnAnimation, crtTurnOffAnimation } from './hero-section'

const PortfolioSection: React.FunctionComponent<PortfolioSectionProps> = (props) => {
  const [{ type: screenType }] = useScreenState()
  const [{ videos }] = usePortfolioState()
  const [state, setState] = React.useState<PortfolioSectionState>({
    playing: [],
    videoAnchors: {},
  })
  const [containerRef] = useRefCallback((node) => {
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
  const playingVideoRef = React.useRef<HTMLVideoElement>(null)
  const videosLength = ['xs-phone'].includes(screenType) ? 2 : 4

  React.useEffect(() => {
    if (state.playing.length !== videosLength) {
      const playing = Array(videosLength)
        .fill(undefined)
        .map(() => (Math.random() > 0.25 ? true : false))
      if (playing.every((playing) => !playing)) {
        playing[Math.floor(Math.random() * videosLength)] = true
      }
      setState((state) => ({ ...state, playing }))
      setTimeout(playAll, 1000)
    }
    startRandomlyPause()
  }, [])

  const randomlyPause = () => {
    setState((state) => {
      const playing = [...state.playing]
      const index = Math.floor(Math.random() * videosLength)
      playing[index] = !playing[index]
      return !playing.every((playing) => !playing) && Math.random() > 0.5
        ? {
            ...state,
            playing,
          }
        : state
    })
    setTimeout(playAll, 1000)
    startRandomlyPause()
  }
  const playAll = () => setState((state) => ({ ...state, playing: state.playing.map(() => true) }))
  const startRandomlyPause = () => setTimeout(randomlyPause, Math.round(Math.random() * 3 + 6) * 1000)

  const videoAnchors = React.useRef<Record<string, HTMLElement>>({})
  const setVideoRef = React.useCallback((link: string, node: HTMLElement | null) => {
    if (node) {
      videoAnchors.current = { ...videoAnchors.current, [link]: node }
    }
  }, [])

  const openVideoModal = (link: string) => {
    setState((state) => ({ ...state, modal: { type: 'video', link } }))
    setTimeout(() => {
      playingVideoRef.current?.play()
    }, 480)
  }
  const onCloseVideoModal = () => {
    playingVideoRef.current?.pause()
    onCloseModal()
  }
  const onCloseModal = () => setState((state) => ({ ...state, modal: undefined }))

  const navigatePortfolio = useLinkClickHandler('/portfolio')
  const theme = useTheme()
  const { playing, modal } = state
  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: ['xs-phone', 'sm-tablet'].includes(screenType) ? '46px 0' : '64px 192px',
        }}
      >
        <Box sx={{ padding: ['xs-phone', 'sm-tablet'].includes(screenType) ? '0 22px' : '0' }}>
          <HeaderText text="WE ARE ROKUNIN" />
        </Box>
        <Typography
          level="h4"
          sx={{
            color: theme.palette.text.secondary,
            padding: ['xs-phone', 'sm-tablet'].includes(screenType) ? '0 46px' : '0',
            margin: '64px auto',
            maxWidth: '952px',
            textAlign: 'center',
          }}
        >
          PERSISTANCE IS OUR GUIDE
        </Typography>
        <Typography
          level="body1"
          sx={{
            color: theme.palette.text.secondary,
            padding: ['xs-phone', 'sm-tablet'].includes(screenType) ? '0 46px' : '0',
            margin: '64px auto',
            maxWidth: '952px',
            textAlign: 'center',
          }}
        >
          We are an experienced game animation team based in Malaysia and have worked with various successful studios.
          Our team of animators and artists consists of highly talented people who are well-versed in their respective
          fields, capable of providing quality service and ensure your game stand out visually.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: ['xs-phone'].includes(screenType) ? '1fr' : 'repeat(2, 1fr)',
            gap: '64px',
            maxWidth: '1016px',
            margin: '96px auto 16px',
            padding: ['xs-phone', 'sm-tablet'].includes(screenType) ? '0 46px' : '0 32px',
          }}
        >
          {videos.slice(0, videosLength).map((demo, index) => (
            <Box key={demo.title} onClick={() => openVideoModal(demo.video)}>
              <VideoDemo
                ref={(video) => setVideoRef(demo.video, video)}
                title={demo.title}
                video={demo.thumbnail}
                playState={playing[index] ? 'playing' : 'paused'}
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: ['xs-phone', 'sm-tablet'].includes(screenType) ? '0 46px' : '0',
            margin: '64px',
          }}
        >
          <Button label="VIEW" url="/portfolio" onClick={navigatePortfolio} />
        </Box>
      </Box>
      <VideoLightboxModal
        open={modal?.type === 'video'}
        onClose={onCloseVideoModal}
        anchor={modal?.type === 'video' ? videoAnchors.current[modal.link] : undefined}
      >
        {modal?.type === 'video' ? (
          <Box
            component="video"
            ref={playingVideoRef}
            controls
            playsInline
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              outline: 'none',
            }}
          >
            <source src={modal.link} type="video/mp4" />
          </Box>
        ) : undefined}
      </VideoLightboxModal>
    </>
  )
}
type PortfolioSectionProps = {
  onResize?: (dimension: DOMRect) => void
}
type PortfolioSectionState = {
  playing: boolean[]
  videoAnchors: Record<string, HTMLElement>
  modal?: {
    type: 'video'
    link: string
  }
}

export const VideoDemo = React.forwardRef<HTMLDivElement, VideoDemoProps>((props, ref) => {
  const [state, setState] = React.useState<VideoDemoState>({
    playState: 'loading',
    controlled: false,
  })
  const [videoRef, video] = useRefCallback<HTMLVideoElement>((node) => {
    const setPlayState = () =>
      setState((state) => ({
        ...state,
        playState: props.playState,
      }))
    ;(async () => {
      await node.play()
      if (node.readyState === 4) {
        setPlayState()
      }
    })()
    node.addEventListener('canplay', setPlayState)
    return () => node.removeEventListener('canplay', setPlayState)
  })

  React.useEffect(() => {
    if (!state.controlled && !['loading', 'stopped'].includes(state.playState)) {
      setState((state) => ({
        ...state,
        playState: props.playState,
      }))
    }
  }, [props.playState, state.playState, state.controlled])

  React.useEffect(() => {
    if (state.playState === 'paused') {
      video?.pause()
    } else if (state.playState === 'playing') {
      video?.play()
    }
  }, [state.playState])

  const onVideoLoaded = () => {
    if (video) {
      setState((state) => ({
        ...state,
        playState: props.playState,
      }))
    }
  }
  const onVideoEnded = () => {
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

  const onMouseEvent: React.MouseEventHandler = (event) => {
    switch (event.type) {
      case 'mouseenter':
        if (!['loading', 'stopped'].includes(state.playState)) {
          setState((state) => ({ ...state, playState: 'playing', controlled: true }))
        }
        break
      case 'mouseleave':
        if (!['loading', 'stopped'].includes(state.playState)) {
          setState((state) => ({ ...state, playState: props.playState, controlled: false }))
        }
        break
    }
  }

  const theme = useTheme()
  const { playState } = state
  return (
    <Box
      ref={ref}
      onMouseEnter={onMouseEvent}
      onMouseLeave={onMouseEvent}
      sx={{
        position: 'relative',
        height: '240px',
        cursor: playState !== 'loading' ? 'pointer' : 'default',
        overflow: 'hidden',
        backgroundColor: 'rgb(0, 0, 0)',
        opacity: playState === 'playing' ? 1 : 0.2,
        transition: 'opacity 3s ease-in-out',
        ['& .filter']: {
          transition: 'background-color 160ms ease-in-out',
          backgroundColor: theme.palette.primary[400].replace(...replaceRGBAlpha(0.2)),
        },
        ['&:hover .filter']: {
          backgroundColor: theme.palette.primary[400].replace(...replaceRGBAlpha(0)),
        },
      }}
    >
      <Box
        component="video"
        ref={videoRef}
        autoPlay
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
        <source src={props.video} type="video/mp4" />
      </Box>
      <Box
        className="filter"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transition: 'background-color 160ms ease-in-out',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: playState === 'playing' ? 1 : 0,
          transition: 'opacity 160ms ease-in-out',
          zIndex: 2,
        }}
      >
        {[
          ['top', 'left'],
          ['top', 'right'],
          ['bottom', 'left'],
          ['bottom', 'right'],
        ].map((directions) => (
          <Box
            key={directions.toString()}
            sx={{
              position: 'absolute',
              width: '16px',
              height: '16px',
              ...directions.reduce((sx, direction) => ({ ...sx, [direction]: '8px' }), {}),
              ...directions.reduce(
                (sx, direction) => ({
                  ...sx,
                  [`border${direction[0].toUpperCase()}${direction.slice(
                    1
                  )}`]: `2px solid ${theme.palette.text.primary}`,
                }),
                {}
              ),
            }}
          />
        ))}
      </Box>
    </Box>
  )
})
type VideoDemoProps = {
  title: string
  video: string
  playState: 'playing' | 'paused'
}
type VideoDemoState = {
  playState: 'loading' | 'playing' | 'paused' | 'stopped'
  controlled: boolean
}

export default PortfolioSection
