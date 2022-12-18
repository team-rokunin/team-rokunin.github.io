import * as React from 'react'
import { useTheme, Theme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import InputUnstyled, { InputUnstyledInputSlotProps } from '@mui/base/InputUnstyled'
import TextareaAutosize, { TextareaAutosizeProps } from '@mui/base/TextareaAutosize'
import { Typography } from '@mui/joy'

export const useStyles = (theme: Theme) => ({
  width: '100%',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontSize: '20px',
  fontFamily: theme.typography.body1.fontFamily as React.CSSProperties['fontFamily'],
  color: theme.palette.primary[400],
})
export const MatrixContainer: React.FunctionComponent<MatrixContainerProps> = (props) => {
  const theme = useTheme()
  const { label, children } = props
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.primary[400]}`,
        ['& input::placeholder, & textarea::placeholder']: {
          fontStyle: 'italic',
        },
      }}
    >
      <Box
        sx={{
          padding: '4px 12px',
          borderBottom: `1px solid ${theme.palette.primary[400]}`,
        }}
      >
        <Typography level="body1" sx={{ color: theme.palette.primary[400] }}>
          {label}
        </Typography>
      </Box>
      <Box sx={{ width: '100%', padding: '12px' }}>{children}</Box>
    </Box>
  )
}
type MatrixContainerProps = React.PropsWithChildren<{
  label: string
}>

const MatrixTextField = React.forwardRef(
  (props: InputUnstyledInputSlotProps & TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const theme = useTheme()
    const { label, ownerState, ...others } = props
    return (
      <MatrixContainer label={label}>
        <Box component="input" {...others} ref={ref} sx={useStyles(theme)} />
      </MatrixContainer>
    )
  }
)
const MatrixTextArea = React.forwardRef(
  (
    props: InputUnstyledInputSlotProps & TextareaAutosizeProps & TextFieldProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const theme = useTheme()
    const { label, ownerState, minRows, maxRows, ...others } = props
    return (
      <MatrixContainer label={label}>
        <TextareaAutosize {...others} ref={ref} style={{ ...useStyles(theme), resize: 'none' }} />
      </MatrixContainer>
    )
  }
)

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
