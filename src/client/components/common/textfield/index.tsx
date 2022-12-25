import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import InputUnstyled, { InputUnstyledInputSlotProps } from '@mui/base/InputUnstyled'
import TextareaAutosize, { TextareaAutosizeProps } from '@mui/base/TextareaAutosize'
import { Typography } from '@mui/joy'

import { replaceRGBAlpha } from '../color'

export const MatrixContainer: React.FunctionComponent<MatrixContainerProps> = (props) => {
  const theme = useTheme()
  const { label, focus, children } = props
  const color = theme.palette.primary[400]
  return (
    <Box
      sx={{
        border: `1px solid ${color}`,
        transition: 'box-shadow 160ms ease-in-out',
        boxShadow: focus ? `0 0 16px ${color.replace(...replaceRGBAlpha(0.5))}` : undefined,
      }}
    >
      <Box
        sx={{
          padding: '4px 12px',
          borderBottom: `1px solid ${color}`,
          transition: 'box-shadow 160ms ease-in-out',
          boxShadow: focus ? `inset 0 0 16px ${color.replace(...replaceRGBAlpha(0.3))}` : undefined,
        }}
      >
        <Typography level="body1" sx={{ color }}>
          {label}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: '12px',
          transition: 'box-shadow 160ms ease-in-out',
          boxShadow: focus ? `inset 0 0 16px ${color.replace(...replaceRGBAlpha(0.3))}` : undefined,
          ['& span']: {
            fontSize: '20px',
            fontFamily: theme.typography.body1.fontFamily as React.CSSProperties['fontFamily'],
            color,
          },
          ['& input, & textarea']: {
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '20px',
            fontFamily: theme.typography.body1.fontFamily as React.CSSProperties['fontFamily'],
            color: theme.palette.text.primary,
          },
          ['& input::placeholder, & textarea::placeholder']: {
            fontStyle: 'italic',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
type MatrixContainerProps = React.PropsWithChildren<{
  label: string
  focus: boolean
}>

const MatrixTextField = React.forwardRef(
  (props: InputUnstyledInputSlotProps & TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [state, setState] = React.useState<MatrixTextState>({ focus: false })

    const onFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
      switch (event.type) {
        case 'focus':
          setState((state) => ({ ...state, focus: true }))
          break
        case 'blur':
          setState((state) => ({ ...state, focus: false }))
          break
      }
    }

    const { label, ownerState, ...others } = props
    const { focus } = state
    return (
      <MatrixContainer label={label} focus={focus}>
        <input {...others} onFocus={onFocus} onBlur={onFocus} ref={ref} />
      </MatrixContainer>
    )
  }
)
const MatrixTextArea = React.forwardRef(
  (
    props: InputUnstyledInputSlotProps & TextareaAutosizeProps & TextFieldProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const [state, setState] = React.useState<MatrixTextState>({ focus: false })

    const onFocus: React.FocusEventHandler<HTMLTextAreaElement> = (event) => {
      switch (event.type) {
        case 'focus':
          setState((state) => ({ ...state, focus: true }))
          break
        case 'blur':
          setState((state) => ({ ...state, focus: false }))
          break
      }
    }

    const { label, ownerState, minRows, maxRows, ...others } = props
    const { focus } = state
    return (
      <MatrixContainer label={label} focus={focus}>
        <TextareaAutosize {...others} ref={ref} onFocus={onFocus} onBlur={onFocus} style={{ resize: 'none' }} />
      </MatrixContainer>
    )
  }
)
type MatrixTextState = {
  focus: boolean
}

const TextField = React.forwardRef((props: TextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { multiline, ...inputProps } = props
  return (
    <InputUnstyled
      ref={ref}
      slots={{ input: MatrixTextField, textarea: MatrixTextArea }}
      slotProps={{ input: inputProps }}
      multiline={multiline}
    />
  )
})
type TextFieldProps = {
  label: string
  placeholder?: string
  multiline?: boolean
}

export default TextField
