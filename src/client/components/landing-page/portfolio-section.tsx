import * as React from 'react'
import { Global, css } from '@emotion/react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import FalseLightDemo from '../../../asset/vid/falselight.mp4'
import DystopiaLocoDemo from '../../../asset/vid/dystopia-loco.mp4'
import RokuninOniDemo from '../../../asset/vid/rokunin-oni.mp4'
import DystopiaFinalDemo from '../../../asset/vid/dystopia-final.mp4'
import LizardRunDemo from '../../../asset/vid/lizard-run.mp4'
import NoMansLandDemo from '../../../asset/vid/no-mans-land.mp4'

const style = css(`
  @keyframes crt-turn-on {
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
  }
  @keyframes crt-turn-off {
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
  }
`)
const PortfolioSection: React.FunctionComponent = () => {
  const theme = useTheme()
  return (
    <>
      <Global styles={style} />
      <Box
        sx={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '64px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
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
              animation: 'header-cursor 3s linear infinite',
            }}
          />
          <Typography
            level="h3"
            sx={{
              color: 'white',
            }}
          >
            WE ARE ROKUNIN
          </Typography>
        </Box>
        <Typography
          level="h4"
          sx={{
            color: theme.palette.primary[400],
            margin: '64px auto',
            maxWidth: '952px',
          }}
        >
          PERSISTANCE IS OUR GUIDE
        </Typography>
        <Typography
          level="body1"
          sx={{
            color: theme.palette.primary[400],
            margin: '64px auto',
            maxWidth: '952px',
          }}
        >
          We are an experienced game animation team based in Malaysia and have worked with various successful studios.
          Our team of animators and artists consists of highly talented people who are well-versed in their respective
          fields, capable of providing quality service and ensure your game stand out visually.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '64px',
            maxWidth: '952px',
            margin: '96px auto',
          }}
        >
          {[
            {
              title: 'False Light',
              video: FalseLightDemo,
            },
            {
              title: 'Dystopia',
              video: DystopiaLocoDemo,
            },
            {
              title: 'Oni',
              video: RokuninOniDemo,
            },
            {
              title: 'Dystopia Final',
              video: DystopiaFinalDemo,
            },
            {
              title: 'Lizard Run',
              video: LizardRunDemo,
            },
            {
              title: "No Man's Land",
              video: NoMansLandDemo,
            },
          ].map((demo) => (
            <VideoDemo key={demo.title} title={demo.title} video={demo.video} />
          ))}
        </Box>
      </Box>
    </>
  )
}

const VideoDemo: React.FunctionComponent<VideoDemoProps> = (props) => {
  const [state, setState] = React.useState<VideoDemoState>({
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

  const { video } = props
  const { playState } = state
  return (
    <Box
      onClick={playState !== 'loading' ? pauseResumeVideo : undefined}
      sx={{
        position: 'relative',
        height: '240px',
        cursor: playState !== 'loading' ? 'pointer' : 'default',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      <video
        ref={videoRef}
        playsInline
        muted
        onLoadedData={onVideoLoaded}
        onEnded={onVideoEnded}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation:
            playState === 'playing'
              ? `crt-turn-on 2.3s linear forwards`
              : playState === 'paused'
              ? `crt-turn-off 0.55s cubic-bezier(0.230, 1.000, 0.320, 1.000) forwards`
              : undefined,
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
    </Box>
  )
}
type VideoDemoProps = {
  title: string
  video: string
}
type VideoDemoState = {
  playState: 'loading' | 'playing' | 'paused' | 'stopped'
}

export default PortfolioSection
