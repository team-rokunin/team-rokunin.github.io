import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import MaskedInput, { conformToMask, MaskedInputProps } from 'react-text-mask'
import InputUnstyled, { InputUnstyledInputSlotProps } from '@mui/base/InputUnstyled'
import { MatrixContainer, useStyles } from './'

export const mobileNumberRegExp = /^\+601(1\d{8}|[02-9]\d{7})$/
export const conformToMobileNumber = (value: string) => {
  const cleaned = value.replace(/^\+60/, '')
  return `+60${
    conformToMask(
      cleaned,
      cleaned.startsWith('11') || cleaned.startsWith('15')
        ? [/1/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
        : [/1/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
    ).conformedValue
  }`
}

const MatrixMobileNumberField = React.forwardRef(
  (props: InputUnstyledInputSlotProps & MobileNumberTextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const theme = useTheme()
    const { label, ownerState, ...others } = props
    const styles = useStyles(theme)
    const { width, ...textStyles } = styles
    return (
      <MatrixContainer label={label}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography component="span" sx={textStyles}>
            +60
          </Typography>
          <Box component="input" {...others} ref={ref} sx={{ ...styles, flex: 1 }} />
        </Box>
      </MatrixContainer>
    )
  }
)

const MobileNumberTextField = React.forwardRef(
  (props: MobileNumberTextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <InputUnstyled ref={ref} slots={{ input: MatrixMobileNumberField }} slotProps={{ input: props }} />
  }
)
type MobileNumberTextFieldProps = {
  label: string
  placeholder?: string
}

export default MobileNumberTextField
