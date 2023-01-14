import * as React from 'react'
import { keyframes } from '@emotion/react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useScreenState } from '../../store/screen'
import { useRefCallback } from '../common/hook'

const headerCursorAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const HeaderText: React.FC<HeaderTextProps> = (props) => {
  const [{ type: screenType }] = useScreenState()
  const [state, setState] = React.useState<HeaderTextState>({
    appear: false,
    width: 0,
  })

  const [typographyRef] = useRefCallback((node) => {
    if (!state.appear) {
      const onScroll = () => {
        const dimension = node.getBoundingClientRect()
        if (dimension.top + dimension.height < window.innerHeight) {
          setTimeout(
            () =>
              setState((state) => ({
                ...state,
                appear: true,
              })),
            160
          )
        }
      }
      const timeout = setTimeout(() => {
        const dimension = node.getBoundingClientRect()
        setState((state) => ({ ...state, width: dimension.width }))
        onScroll()
      }, 160)
      document.addEventListener('scroll', onScroll)
      return () => {
        clearTimeout(timeout)
        document.removeEventListener('scroll', onScroll)
      }
    }
  })

  const theme = useTheme()
  const { appear, width } = state
  const cursorDimension = {
    width: `${(['xs-phone'].includes(screenType) ? 12 : 16) * (appear ? 1 : 0.5)}px`,
    height: ['xs-phone'].includes(screenType) ? '24px' : '32px',
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '64px auto',
        maxWidth: '952px',
        opacity: appear ? 1 : 0,
      }}
    >
      <Box
        sx={{
          ...cursorDimension,
          position: 'relative',
          backgroundColor: appear ? 'transparent' : theme.palette.primary[400],
          transform: appear ? 'translateX(0)' : `translateX(${width / 2}px)`,
          transition: appear
            ? [
                'width 640ms ease-in-out 640ms',
                'background-color 640ms ease-in-out 640ms',
                'transform 640ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              ].join(',')
            : undefined,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.primary[400],
            animation: `${headerCursorAnimation} 3s linear infinite`,
          }}
        />
      </Box>
      <Box
        ref={typographyRef}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          transform: appear ? 'translateX(0)' : `translateX(-${width / 2}px)`,
          transition: appear ? 'transform 640ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : undefined,
        }}
      >
        <Typography
          level="h3"
          sx={{
            letterSpacing: ['xs-phone'].includes(screenType) ? '1px' : undefined,
            color: theme.palette.text.primary,
            padding: `0 ${['xs-phone'].includes(screenType) ? 12 : 24}px`,
            transform: appear ? 'translateX(0)' : `translateX(${width}px)`,
            transition: appear ? 'transform 640ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : undefined,
          }}
        >
          {props.text}
        </Typography>
      </Box>
      <Box
        sx={{
          ...cursorDimension,
          backgroundColor: appear ? 'transparent' : theme.palette.primary[400],
          transform: appear ? 'translateX(0)' : `translateX(${-width / 2}px)`,
          transition: appear
            ? [
                'width 640ms ease-in-out 640ms',
                'background-color 640ms ease-in-out 640ms',
                'transform 640ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              ].join(',')
            : undefined,
        }}
      />
    </Box>
  )
}
type HeaderTextProps = {
  text: string
}
type HeaderTextState = {
  appear: boolean
  width: number
}

export default HeaderText
