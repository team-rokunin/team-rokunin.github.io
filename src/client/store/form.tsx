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
    try {
      await fetch(
        'https://discord.com/api/webhooks/1056938852096409600/vkts4LpGEoyIcyv6QNxopPd77xOLXrJaZqBJoKVB5r2ltFSze4IeDw22jz3MzPYaRZNK',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: 'We have a new contact dropping in',
            embeds: [
              {
                title: 'New contact',
                description: [
                  `**First Name:** ${form.firstName}`,
                  `**Last Name:** ${form.lastName}`,
                  `**Email:** ${form.email}`,
                  `**Phone Number:** ${form.phoneNumber}`,
                  `**Company Name:** ${form.companyName}`,
                  ...(form.remarks ? [`**Remarks:** ${form.remarks}`] : []),
                ].join('\n'),
              },
            ],
          }),
        }
      ).then((response) => response.text())
      localStorage.setItem('submitted-contact', 'true')
      setState((state) => ({ ...state, submission: { ...state.submission, contact: true } }))
    } catch (error) {
      throw error
    }
  }

  const submitApplication: Action['submitApplication'] = async (form) => {
    try {
      await fetch(
        'https://discord.com/api/webhooks/1056938852096409600/vkts4LpGEoyIcyv6QNxopPd77xOLXrJaZqBJoKVB5r2ltFSze4IeDw22jz3MzPYaRZNK',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: 'We have a new candidate applying for a position',
            embeds: [
              {
                title: 'New candidate',
                description: [
                  `**First Name:** ${form.firstName}`,
                  `**Last Name:** ${form.lastName}`,
                  `**Email:** ${form.email}`,
                  `**Phone Number:** ${form.phoneNumber}`,
                  ...(form.portfolioLink ? [`**Portfolio Link:** ${form.portfolioLink}`] : []),
                  ...(form.remarks ? [`**Remarks:** ${form.remarks}`] : []),
                ].join('\n'),
              },
            ],
          }),
        }
      ).then((response) => response.text())
      const formData = new FormData()
      formData.append('content', `From ${form.firstName} ${form.lastName}`)
      for (const file of form.resume) {
        formData.append('file', file)
      }
      await fetch(
        'https://discord.com/api/webhooks/1056938852096409600/vkts4LpGEoyIcyv6QNxopPd77xOLXrJaZqBJoKVB5r2ltFSze4IeDw22jz3MzPYaRZNK',
        {
          method: 'POST',
          body: formData,
        }
      ).then((response) => response.text())
      localStorage.setItem('submitted-application', 'true')
      setState((state) => ({ ...state, submission: { ...state.submission, application: true } }))
    } catch (error) {
      throw error
    }
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
