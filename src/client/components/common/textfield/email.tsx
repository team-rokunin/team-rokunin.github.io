import * as React from 'react'
import MaskedInput from 'react-text-mask'
import InputUnstyled, { InputUnstyledInputSlotProps } from '@mui/base/InputUnstyled'
import { MatrixContainer } from './'

export const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const MatrixEmailField = React.forwardRef(
  (
    props: InputUnstyledInputSlotProps & EmailTextFieldProps,
    forwardRef: React.ForwardedRef<HTMLInputElement | undefined>
  ) => {
    const [state, setState] = React.useState<MatrixEmailFieldState>({ focus: false })

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

    const { label, ownerState, helperText, ...others } = props
    const { focus } = state
    return (
      <MatrixContainer label={label} helperText={helperText} focus={focus}>
        <MaskedInput
          {...others}
          ref={setRef}
          onFocus={onFocus}
          onBlur={onFocus}
          mask={
            {
              mask: (value: string) =>
                value.includes('@')
                  ? value
                      .split('@')
                      .flatMap((value, index) =>
                        index === 0
                          ? [...value.split(''), /@/]
                          : Array(value.length + 1).fill(/[a-zA-Z0-9@.!#$%&'*+/=?^_`{|}~-]/)
                      )
                  : Array(value.length + 1).fill(/[a-zA-Z0-9@.!#$%&'*+/=?^_`{|}~-]/),
              pipe: (value: string) =>
                value.replace(/@/g, (character, index) => (index === value.indexOf('@') ? character : '')),
            } as any
          }
          guide={false}
        />
      </MatrixContainer>
    )
  }
)
type MatrixEmailFieldState = {
  input?: HTMLInputElement
  focus: boolean
}

const EmailTextField = React.forwardRef((props: EmailTextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return <InputUnstyled ref={ref} slots={{ input: MatrixEmailField }} slotProps={{ input: props }} />
})
type EmailTextFieldProps = {
  label: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  placeholder?: string
  helperText?: string
}

export default EmailTextField
