import * as React from 'react'

export type State = {
  submission: {
    contact: boolean
    apply: boolean
  }
}
export type Action = {
  submitContact: (form: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    companyName: string
    remarks: string
  }) => Promise<void>
  submitApplication: (form: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    portfolioLink: string
    resume: File[]
    remarks: string
  }) => Promise<void>
  resetForm: (form: 'contact' | 'apply') => void
}
const FormContext = React.createContext([{} as State, {} as Action] as const)

export const Provider: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  const [state, setState] = React.useState<State>({
    submission: {
      contact: localStorage.getItem('submitted-contact') === 'true',
      apply: localStorage.getItem('submitted-application') === 'true',
    },
  })

  const submitContact: Action['submitContact'] = async (form) => {
    localStorage.setItem('submitted-contact', 'true')
    setState((state) => ({ ...state, submission: { ...state.submission, contact: true } }))
  }

  const submitApplication: Action['submitApplication'] = async (form) => {
    localStorage.setItem('submitted-application', 'true')
    setState((state) => ({ ...state, submission: { ...state.submission, application: true } }))
  }

  const resetForm: Action['resetForm'] = (form) => {
    switch (form) {
      case 'contact':
        localStorage.removeItem('submitted-contact')
        setState((state) => ({ ...state, submission: { ...state.submission, [form]: false } }))
        break
      case 'apply':
        localStorage.removeItem('submitted-application')
        setState((state) => ({ ...state, submission: { ...state.submission, [form]: false } }))
        break
    }
  }

  return (
    <FormContext.Provider value={[state, { submitContact, submitApplication, resetForm }]}>
      {props.children}
    </FormContext.Provider>
  )
}
export const useFormState = () => {
  return React.useContext(FormContext)
}
