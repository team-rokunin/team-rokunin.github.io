import * as React from 'react'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import MaskedInput, { conformToMask } from 'react-text-mask'
import InputUnstyled, { InputUnstyledInputSlotProps } from '@mui/base/InputUnstyled'
import { MatrixContainer } from './'

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
  (
    props: InputUnstyledInputSlotProps & MobileNumberTextFieldProps,
    forwardRef: React.ForwardedRef<HTMLInputElement | undefined>
  ) => {
    const [state, setState] = React.useState<MatrixMobileNumberFieldState>({
      value: '',
      mask: [/1/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
      focus: false,
    })

    const setRef: React.Ref<MaskedInput> = React.useCallback(
      (ref: MaskedInput) => {
        const input = ref ? (ref.inputElement as HTMLInputElement) : null
        if (input && !state.input) {
          setState((state) => ({ ...state, input }))
        }
      },
      [state.input]
    )
    React.useImperativeHandle(
      forwardRef,
      () => {
        return state.input
      },
      [state.input]
    )

    const onClick = React.useCallback(() => {
      const { input } = state
      input?.focus()
    }, [state.input])
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      setState((state) => ({
        ...state,
        value: event.target.value,
        mask: event.target.value?.startsWith('11')
          ? [/1/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
          : [/1/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
      }))
    }
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
    const { value, mask, focus } = state
    return (
      <MatrixContainer label={label} focus={focus}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography component="span" onClick={onClick}>
            +60
          </Typography>
          <MaskedInput
            {...others}
            ref={setRef}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onFocus}
            mask={mask}
            guide={false}
            placeholderChar={'\u2000'}
            style={{ flex: 1 }}
          />
        </Box>
      </MatrixContainer>
    )
  }
)
type MatrixMobileNumberFieldState = {
  input?: HTMLInputElement
  value: string
  mask: (string | RegExp)[]
  focus: boolean
}

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
