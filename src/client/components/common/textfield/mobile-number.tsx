import * as React from 'react'
import MaskedInput from 'react-text-mask'
import InputUnstyled, { InputUnstyledInputSlotProps } from '@mui/base/InputUnstyled'
import { MatrixContainer } from './'

export const mobileRegExp = /^\+?[0-9-]+$/

const MatrixMobileNumberField = React.forwardRef(
  (
    props: InputUnstyledInputSlotProps & MobileNumberTextFieldProps,
    forwardRef: React.ForwardedRef<HTMLInputElement | undefined>
  ) => {
    const [state, setState] = React.useState<MatrixMobileNumberFieldState>({ focus: false })

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
        <MaskedInput
          {...others}
          ref={setRef}
          onFocus={onFocus}
          onBlur={onFocus}
          mask={
            {
              mask: (value: string) =>
                Array(value.length + 1)
                  .fill(undefined)
                  .map((_, index) => (index === 0 ? /[0-9+-]/ : /[0-9-]/)),
              pipe: (value: string) => value,
            } as any
          }
          guide={false}
        />
      </MatrixContainer>
    )
  }
)
type MatrixMobileNumberFieldState = {
  input?: HTMLInputElement
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
