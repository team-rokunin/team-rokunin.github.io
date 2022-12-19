import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useRefCallback } from '../common/hook'
import { replaceRGBAlpha } from '../common/color'
import Button from '../common/button'
import { headerCursorAnimation } from './'

const TalentSection: React.FunctionComponent<TalentSectionProps> = (props) => {
  const [state, setState] = React.useState<TalentSectionState>({
    progress: 0,
  })

  const containerRef = useRefCallback((node) => {
    if (props.onResize && node) {
      const onResize = props.onResize
      onResize(node.getBoundingClientRect())
      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0]
        if (entry) {
          onResize(entry.contentRect)
        }
      })
      resizeObserver.observe(node)
      return () => resizeObserver.disconnect()
    }
  })

  const onClick = () => {
    setState((state) => ({ ...state, progress: state.progress === 0 ? 100 : 0 }))
  }

  const theme = useTheme()
  const { progress } = state
  return (
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
        <Typography level="h3" sx={{ color: 'white' }}>
          TALENT
        </Typography>
      </Box>
      <Typography
        level="body1"
        sx={{
          color: theme.palette.primary[400],
          margin: '64px auto',
          maxWidth: '952px',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Typography>
      <Box
        sx={{
          maxWidth: '640px',
          margin: '16px auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Typography level="h4" sx={{ color: 'white', textAlign: 'center' }}>
          WE ARE LOOKING FOR
        </Typography>
        <Box>
          <Box sx={{ padding: '32px', border: `2px solid ${theme.palette.primary[400]}`, borderBottom: '0' }}>
            <Typography
              level="h4"
              sx={{ fontSize: '32px', letterSpacing: '1em', color: theme.palette.primary[400], textAlign: 'center' }}
            >
              TALENT
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'relative',
              padding: '12px',
              border: `2px solid ${theme.palette.primary[400]}`,
              borderBottomRightRadius: '32px',
            }}
          >
            <ProgressBar progress={progress} />
            <Box
              sx={{
                position: 'absolute',
                top: '0',
                right: '0',
                height: '100%',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ProgressLabel progress={progress} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '64px',
        }}
      >
        <Button label="VIEW" onClick={onClick} />
      </Box>
    </Box>
  )
}
type TalentSectionState = {
  progress: number
}
type TalentSectionProps = {
  onResize?: (dimension: DOMRect) => void
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = (props) => {
  const [state, setState] = React.useState<ProgressBarState>({})

  const containerRef = useRefCallback((node) => {
    if (node) {
      setState((state) => ({ ...state, dimension: node.getBoundingClientRect() }))
      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0]
        if (entry) {
          setState((state) => ({ ...state, dimension: entry.contentRect }))
        }
      })
      resizeObserver.observe(node)
      return () => resizeObserver.disconnect()
    }
  })

  const theme = useTheme()
  const { progress } = props
  const { dimension } = state
  const sectionWidth = dimension ? (dimension.width - 19 * 8) / 20 : 0
  return (
    <Box ref={containerRef} sx={{ height: '48px', borderBottomRightRadius: '21px', overflow: 'hidden' }}>
      {dimension ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${dimension.width} ${dimension.height}`}
          style={{ width: '100%', height: '100%' }}
        >
          <clipPath id="progress-bar">
            {Array(20)
              .fill(undefined)
              .map((_, index) => (
                <rect
                  key={index}
                  x={(sectionWidth + 8) * index}
                  y={0}
                  width={sectionWidth}
                  height={dimension.height}
                  fill="black"
                />
              ))}
          </clipPath>
          <rect
            clipPath="url(#progress-bar)"
            x={0}
            y={0}
            width={dimension.width * (progress / 100)}
            height={dimension.height}
            fill={theme.palette.primary[400].replace(...replaceRGBAlpha(0.5))}
            style={{ transition: 'width 3s ease-in-out' }}
          />
        </svg>
      ) : undefined}
    </Box>
  )
}
type ProgressBarState = {
  dimension?: DOMRect
}
type ProgressBarProps = {
  progress: number
}

const ProgressLabel: React.FunctionComponent<ProgressLabelProps> = (props) => {
  const [animationFrame, setAnimationFrame] = React.useState<number | undefined>(undefined)
  const [state, setState] = React.useState<ProgressLabelState>({ label: props.progress })

  const duration = 3 * 1000
  const progressing = React.useCallback(
    (startTime: Date, progress: { from: number; to: number }, resolve: () => void) => () => {
      const currentDuration = Date.now() - startTime.getTime()
      const relativeDuration = Math.abs((duration * (progress.to - progress.from)) / 100)
      if (relativeDuration <= 0) {
        resolve()
        return
      }
      const currentProgress = (currentDuration / relativeDuration) * (progress.to - progress.from) + progress.from
      setState((state) => ({ ...state, label: Math.round(currentProgress) }))
      if (Date.now() > startTime.getTime() + relativeDuration) {
        resolve()
      } else {
        setAnimationFrame(requestAnimationFrame(progressing(startTime, progress, resolve)))
      }
    },
    []
  )
  const startProgressing = React.useCallback(
    (progress: number) => {
      const { label } = state
      if (animationFrame) cancelAnimationFrame(animationFrame)
      let resolve: () => void = () => {}
      const promise = new Promise<void>((r) => (resolve = r))
      progressing(new Date(), { from: label, to: progress }, resolve)()
      return promise
    },
    [animationFrame, state.label]
  )
  React.useEffect(() => {
    startProgressing(props.progress)
  }, [props.progress])

  const theme = useTheme()
  const { label } = state
  return (
    <Typography level="h3" sx={{ color: theme.palette.primary[400] }}>
      {label.toString()}%
    </Typography>
  )
}
type ProgressLabelState = {
  label: number
}
type ProgressLabelProps = {
  progress: number
}

export default TalentSection
