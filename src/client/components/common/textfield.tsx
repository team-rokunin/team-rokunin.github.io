import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import InputUnstyled, { InputUnstyledRootSlotProps } from '@mui/base/InputUnstyled'
import { Typography } from '@mui/joy'

const MatrixTextField = React.forwardRef(
  (props: InputUnstyledRootSlotProps & TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const theme = useTheme()
    const { label, ownerState, ...others } = props
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
          component="input"
          {...others}
          ref={ref}
          sx={{
            width: '100%',
            padding: '12px',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '24px',
            fontFamily: theme.typography.body1.fontFamily,
            color: theme.palette.primary[400],
          }}
        />
      </Box>
    )
  }
)

const TextField = React.forwardRef((props: TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return <InputUnstyled ref={ref} slots={{ input: MatrixTextField }} slotProps={{ input: props }} />
})
type TextFieldProps = {
  label: string
  placeholder?: string
}

export default TextField
