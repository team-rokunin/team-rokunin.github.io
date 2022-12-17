import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import InputUnstyled, { InputUnstyledRootSlotProps } from '@mui/base/InputUnstyled'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { Typography } from '@mui/joy'

const MatrixTextField = React.forwardRef(
  (
    props: InputUnstyledRootSlotProps & TextFieldProps,
    ref: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const theme = useTheme()
    const { label, autoresize, ownerState, ...others } = props
    const styles = {
      width: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: '20px',
      fontFamily: theme.typography.body1.fontFamily as React.CSSProperties['fontFamily'],
      color: theme.palette.primary[400],
    }
    return (
      <Box
        sx={{
          border: `1px solid ${theme.palette.primary[400]}`,
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
        <Box
          sx={{
            width: '100%',
            padding: '12px',
            ['& input::placeholder, & textarea::placeholder']: {
              fontStyle: 'italic',
            },
          }}
        >
          {autoresize ? (
            <TextareaAutosize {...others} ref={ref as any} style={{ ...styles, resize: 'none' }} />
          ) : (
            <Box component="input" {...others} ref={ref} sx={styles} />
          )}
        </Box>
      </Box>
    )
  }
)

const TextField = React.forwardRef(
  (props: TextFieldProps, ref: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement>) => {
    return <InputUnstyled ref={ref as any} slots={{ input: MatrixTextField }} slotProps={{ input: props }} />
  }
)
type TextFieldProps = {
  label: string
  placeholder?: string
  autoresize?: boolean
}

export default TextField
