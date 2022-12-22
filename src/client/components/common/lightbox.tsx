import * as React from 'react'
import { Transition } from 'react-transition-group'
import Modal from '@mui/joy/Modal'
import Box from '@mui/joy/Box'

const videoSize = [1920, 1080] as const
const VideoLightboxModal: React.FunctionComponent<React.PropsWithChildren<VideoLightboxModalProps>> = (props) => {
  const [state, setState] = React.useState<VideoLightboxModalState>({ open: props.open })

  React.useEffect(() => {
    if (props.open && props.anchor) {
      const anchor = props.anchor
      setState((state) => ({
        ...state,
        position: anchor.getBoundingClientRect(),
        children: props.children,
      }))
      const timeout = setTimeout(
        () =>
          setState((state) => ({
            ...state,
            open: true,
          })),
        160
      )
      return () => clearTimeout(timeout)
    } else {
      setState((state) => ({ ...state, open: false }))
      const timeout = setTimeout(
        () =>
          setState((state) => ({
            ...state,
            position: undefined,
            children: undefined,
          })),
        480
      )
      return () => clearTimeout(timeout)
    }
  }, [props.open, props.anchor, props.children])

  const getFullscreen = () => {
    const padding = 32
    const windowHeight = window.innerHeight - padding * 2
    const windowWidth = window.innerWidth - padding * 2
    if (windowHeight / windowWidth > videoSize[1] / videoSize[0]) {
      const width = windowWidth
      const height = (videoSize[1] / videoSize[0]) * windowWidth
      return [width, height] as const
    } else {
      const height = windowHeight
      const width = (windowHeight / videoSize[1]) * videoSize[0]
      return [width, height] as const
    }
  }

  const { onClose } = props
  const { open, position, children } = state
  return (
    <Transition in={open} timeout={480}>
      {(state) => {
        const fullscreen = getFullscreen()
        return (
          <Modal
            keepMounted
            open={!['exited', 'exiting'].includes(state)}
            onClose={onClose}
            sx={{ visibility: state === 'exited' ? 'hidden' : 'visible' }}
            componentsProps={{
              backdrop: {
                sx: {
                  transition: ['opacity 160ms ease-in-out'].join(','),
                  opacity: ['entered', 'entering'].includes(state) ? 1 : 0,
                },
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                transition:
                  state !== 'exited'
                    ? [
                        `opacity 160ms ease-in-out ${state === 'entering' ? '' : '320ms'}`,
                        ...['top', 'left', 'width', 'height'].map(
                          (property) => `${property} 320ms ease-in-out ${state === 'entering' ? '160ms' : ''}`
                        ),
                      ].join(',')
                    : 'none',
                top: ['entered', 'entering'].includes(state) ? `calc(50vh - ${fullscreen[1] / 2}px)` : position?.top,
                left: ['entered', 'entering'].includes(state) ? `calc(50vw - ${fullscreen[0] / 2}px)` : position?.left,
                width: ['entered', 'entering'].includes(state) ? fullscreen[0] : position?.width,
                height: ['entered', 'entering'].includes(state) ? fullscreen[1] : position?.height,
                opacity: ['entered', 'entering'].includes(state) ? 1 : 0,
              }}
            >
              {children}
            </Box>
          </Modal>
        )
      }}
    </Transition>
  )
}
type VideoLightboxModalProps = {
  open: boolean
  onClose: () => void
  anchor?: HTMLElement
}
type VideoLightboxModalState = {
  open: boolean
  position?: DOMRect
  children?: React.ReactNode
}

export default VideoLightboxModal
