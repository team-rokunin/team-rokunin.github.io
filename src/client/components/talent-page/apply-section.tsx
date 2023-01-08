import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useScreenState } from '../../store/screen'
import { useFormState } from '../../store/form'
import { useRefCallback } from '../common/hook'
import HeaderText from '../common/header-text'
import TextField from '../common/textfield'
import EmailTextField, { emailRegExp } from '../common/textfield/email'
import MobileNumberTextField, { mobileRegExp } from '../common/textfield/mobile-number'
import FileField from '../common/textfield/file'
import Button from '../common/button'
import { FormResultOverlay } from '../landing-page/contact-section'

const ApplySection: React.FunctionComponent<ApplySectionProps> = (props) => {
  const [{ type: screenType }] = useScreenState()
  const [{ submission }, { submitApplication, resetForm }] = useFormState()
  const [state, setState] = React.useState<ApplySectionState>({
    input: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      portfolioLink: '',
      resume: [],
      remarks: '',
    },
    error: {},
    result: submission.apply ? 'success' : undefined,
  })

  const containerRef = useRefCallback((node) => {
    if (props.onResize && node) {
      const onResize = props.onResize
      onResize(node.getBoundingClientRect())
      const resizeObserver = new ResizeObserver(() => {
        onResize(node.getBoundingClientRect())
      })
      resizeObserver.observe(node)
      return () => resizeObserver.disconnect()
    }
  })
  React.useEffect(() => {
    if (submission.apply) {
      setState((state) => ({ ...state, result: 'success' }))
    }
  }, [submission.apply])

  const onChange =
    <T extends keyof Omit<ApplySectionState['input'], 'resume'>>(
      key: T
    ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =>
    (event) => {
      setState((state) => ({ ...state, input: { ...state.input, [key]: event.target.value } }))
    }

  const onChangeFiles =
    <T extends 'resume'>(key: T) =>
    (files: File[]) => {
      setState((state) => ({ ...state, input: { ...state.input, [key]: files } }))
    }

  const onSubmit = async () => {
    const { input } = state
    const error: ApplySectionState['error'] = {}
    if (input.firstName === '') {
      error.firstName = 'Please complete field'
    }
    if (input.lastName === '') {
      error.lastName = 'Please complete field'
    }
    if (!emailRegExp.test(input.email)) {
      error.email = 'Please complete field'
    }
    if (!mobileRegExp.test(input.phoneNumber)) {
      error.phoneNumber = 'Please complete field'
    }
    if (input.resume.length === 0) {
      error.resume = 'Please upload at least 1 file'
    }
    setState((state) => ({ ...state, error }))
    if (Object.keys(error).length === 0) {
      try {
        await submitApplication(input)
        setState((state) => ({ ...state, result: 'success' }))
      } catch {
        setState((state) => ({ ...state, result: 'error' }))
      }
    }
  }

  const onReset = () => {
    resetForm('apply')
    setState((state) => ({
      ...state,
      input: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        portfolioLink: '',
        resume: [],
        remarks: '',
      },
      error: {},
      result: undefined,
    }))
  }

  const theme = useTheme()
  const { input, error, result } = state
  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: ['xs-phone', 'sm-tablet'].includes(screenType) ? '46px' : '64px 192px',
      }}
    >
      <HeaderText text="APPLY NOW" />
      <Typography
        level="body1"
        sx={{
          color: theme.palette.text.secondary,
          margin: '64px auto',
          maxWidth: '952px',
          textAlign: 'center',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Typography>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '64px',
          maxWidth: '952px',
          margin: '16px auto 64px',
        }}
      >
        <FormResultOverlay result={result} onReset={onReset} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: ['xs-phone'].includes(screenType) ? '1fr' : 'repeat(2, 1fr)',
            gap: '16px',
          }}
        >
          <TextField
            label="First Name"
            value={input.firstName}
            onChange={onChange('firstName')}
            placeholder="Type Here"
            helperText={error.firstName}
          />
          <TextField
            label="Last Name"
            value={input.lastName}
            onChange={onChange('lastName')}
            placeholder="Type Here"
            helperText={error.lastName}
          />
          <EmailTextField
            label="Email"
            value={input.email}
            onChange={onChange('email')}
            placeholder="Type Here"
            helperText={error.email}
          />
          <MobileNumberTextField
            label="Phone Number"
            value={input.phoneNumber}
            onChange={onChange('phoneNumber')}
            placeholder="Type Here"
            helperText={error.phoneNumber}
          />
          <Box sx={{ gridColumn: ['xs-phone'].includes(screenType) ? undefined : 'span 2' }}>
            <TextField
              label="Portfolio Link"
              value={input.portfolioLink}
              onChange={onChange('portfolioLink')}
              placeholder="Type Here"
            />
          </Box>
          <Box sx={{ gridColumn: ['xs-phone'].includes(screenType) ? undefined : 'span 2' }}>
            <FileField
              label="Resume"
              files={input.resume}
              onChangeFiles={onChangeFiles('resume')}
              helperText={error.resume}
            />
          </Box>
          <Box sx={{ gridColumn: ['xs-phone'].includes(screenType) ? undefined : 'span 2' }}>
            <TextField
              label="Remarks"
              value={input.remarks}
              onChange={onChange('remarks')}
              placeholder="Type Here"
              multiline
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button label="SUBMIT" onClick={onSubmit} />
        </Box>
      </Box>
    </Box>
  )
}
type ApplySectionProps = {
  onResize?: (dimension: DOMRect) => void
}
type ApplySectionState = {
  input: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    portfolioLink: string
    resume: File[]
    remarks: string
  }
  error: {
    firstName?: string
    lastName?: string
    email?: string
    phoneNumber?: string
    resume?: string
  }
  result?: 'success' | 'error'
}

export default ApplySection
