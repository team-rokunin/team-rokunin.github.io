import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { usePortfolioState } from '../../store/portfolio'
import { useRefCallback } from '../common/hook'
import { replaceRGBAlpha } from '../common/color'
import VideoLightboxModal from '../common/lightbox'
import { headerCursorAnimation } from './'
import { VideoDemo } from '../landing-page/portfolio-section'

const PortfolioSection: React.FunctionComponent<PortfolioSectionProps> = (props) => {
  const [{ videos }] = usePortfolioState()
  const [state, setState] = React.useState<PortfolioSectionState>({
    playing: [],
    videoAnchors: {},
    currentPage: 0,
  })
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
  const playingVideoRef = React.useRef<HTMLVideoElement>(null)
  const videosLength = 4

  React.useEffect(() => {
    if (state.playing.length !== videosLength) {
      const playing = Array(videosLength)
        .fill(undefined)
        .map(() => (Math.random() > 0.25 ? true : false))
      if (playing.every((playing) => !playing)) {
        playing[Math.floor(Math.random() * videosLength)] = true
      }
      setState((state) => ({ ...state, playing }))
    }
    startRandomlyPausePlay()
  }, [])

  const randomlyPausePlay = () => {
    setState((state) => {
      const playing = [...state.playing]
      const index = Math.floor(Math.random() * videosLength)
      playing[index] = !playing[index]
      return !playing.every((playing) => !playing) && (playing[index] || Math.random() > 0.5)
        ? {
            ...state,
            playing,
          }
        : state
    })
    startRandomlyPausePlay()
  }
  const startRandomlyPausePlay = () => setTimeout(randomlyPausePlay, Math.round(Math.random() * 3 + 1) * 500)

  const videoAnchors = React.useRef<Record<string, HTMLElement>>({})
  const setVideoRef = React.useCallback((link: string, node: HTMLElement | null) => {
    if (node) {
      videoAnchors.current = { ...videoAnchors.current, [link]: node }
    }
  }, [])

  const onChangePage = (index: number) => {
    setState((state) => ({ ...state, currentPage: index }))
  }

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

  const theme = useTheme()
  const { playing, currentPage, modal } = state
  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '36px',
    height: '36px',
    backgroundColor: 'transparent',
  }
  const navigationButton = (label: string, nextPage?: number) => (
    <Box
      component="button"
      onClick={typeof nextPage === 'number' ? () => onChangePage(nextPage) : undefined}
      sx={{
        ...buttonStyle,
        cursor: typeof nextPage === 'number' ? 'pointer' : 'default',
        border: `1.5px solid ${
          typeof nextPage === 'number'
            ? theme.palette.text.primary.replace(...replaceRGBAlpha(0.4))
            : theme.palette.text.primary.replace(...replaceRGBAlpha(0.2))
        }`,
        boxShadow: `inset 0 0 16px ${
          typeof nextPage === 'number' ? theme.palette.text.primary.replace(...replaceRGBAlpha(0.1)) : 'transparent'
        }`,
        transition: ['border', 'box-shadow'].map((property) => `${property} 160ms ease-in-out`).join(','),
        ['& > span']: {
          transition: 'color 160ms ease-in-out',
          color:
            typeof nextPage === 'number'
              ? theme.palette.text.primary
              : theme.palette.text.primary.replace(...replaceRGBAlpha(0.5)),
        },
      }}
    >
      <Typography component="span" level="body1" sx={{ fontSize: '12px' }}>
        {label}
      </Typography>
    </Box>
  )
  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '64px 192px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: '24px',
            margin: '64px auto',
            maxWidth: '952px',
          }}
        >
          <Box
            sx={{
              width: '16px',
              height: '32px',
              backgroundColor: theme.palette.primary[400],
              animation: `${headerCursorAnimation} 3s linear infinite`,
            }}
          />
          <Typography
            level="h3"
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            WE ARE ROKUNIN
          </Typography>
        </Box>
        <Typography
          level="h4"
          sx={{
            color: theme.palette.text.secondary,
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
            margin: '64px auto',
            maxWidth: '952px',
            textAlign: 'center',
          }}
        >
          We are an experienced game animation team based in Malaysia and have worked with various successful studios.
          Our team of animators and artists consists of highly talented people who are well-versed in their respective
          fields, capable of providing quality service and ensure your game stand out visually.
        </Typography>
        <SwipeableViews
          index={currentPage}
          onChangeIndex={onChangePage}
          style={{
            maxWidth: '1016px',
            margin: '96px auto 16px',
          }}
        >
          {videos
            .reduce((pages, video) => {
              const lastPage = pages[pages.length - 1]
              if (lastPage && lastPage.length < videosLength) {
                return [...pages.slice(0, -1), [...lastPage, video]]
              } else {
                return [...pages, [video]]
              }
            }, [] as typeof videos[])
            .map((page, index) => (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '64px',
                  padding: '0 32px',
                }}
              >
                {page.map((demo, index) => (
                  <Box key={demo.title} onClick={() => openVideoModal(demo.url)}>
                    <VideoDemo
                      ref={(video) => setVideoRef(demo.url, video)}
                      title={demo.title}
                      video={demo.url}
                      playState={playing[index] ? 'playing' : 'paused'}
                    />
                  </Box>
                ))}
              </Box>
            ))}
        </SwipeableViews>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '64px',
            columnGap: '16px',
          }}
        >
          {navigationButton('<', currentPage > 0 ? currentPage - 1 : undefined)}
          {Array(Math.ceil(videos.length / videosLength))
            .fill(undefined)
            .map((_, index) => (
              <Box
                component="button"
                key={index}
                onClick={() => onChangePage(index)}
                sx={{
                  ...buttonStyle,
                  cursor: 'pointer',
                  border: `1.5px solid ${
                    index === currentPage
                      ? theme.palette.primary[400].replace(...replaceRGBAlpha(0.6))
                      : theme.palette.text.primary.replace(...replaceRGBAlpha(0.4))
                  }`,
                  boxShadow: `inset 0 0 16px ${
                    index === currentPage
                      ? theme.palette.primary[400].replace(...replaceRGBAlpha(0.2))
                      : theme.palette.text.primary.replace(...replaceRGBAlpha(0.1))
                  }`,
                  transition: ['border', 'box-shadow'].map((property) => `${property} 160ms ease-in-out`).join(','),
                  ['& > span']: {
                    transition: 'color 160ms ease-in-out',
                    color: index === currentPage ? theme.palette.text.secondary : theme.palette.text.primary,
                  },
                }}
              >
                <Typography component="span" level="body1" sx={{ fontSize: '12px' }}>
                  {index + 1}
                </Typography>
              </Box>
            ))}
          {navigationButton(
            '>',
            currentPage < Math.ceil(videos.length / videosLength) - 1 ? currentPage + 1 : undefined
          )}
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
  currentPage: number
  modal?: {
    type: 'video'
    link: string
  }
}

export default PortfolioSection
