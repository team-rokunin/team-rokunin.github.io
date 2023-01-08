import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useScreenState } from '../../store/screen'
import { useFormState } from '../../store/form'
import { useRefCallback } from '../common/hook'
import { replaceRGBAlpha } from '../common/color'
import HeaderText from '../common/header-text'
import TextField from '../common/textfield'
import EmailTextField, { emailRegExp } from '../common/textfield/email'
import MobileNumberTextField, { mobileRegExp } from '../common/textfield/mobile-number'
import Button from '../common/button'

const ContactSection: React.FunctionComponent<ContactSectionProps> = (props) => {
  const [{ type: screenType }] = useScreenState()
  const [{ submission }, { submitContact, resetForm }] = useFormState()
  const [state, setState] = React.useState<ContactSectionState>({
    input: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      remarks: '',
    },
    error: {},
    result: submission.contact ? 'success' : undefined,
  })

  const [containerRef] = useRefCallback((node) => {
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
    if (submission.contact) {
      setState((state) => ({ ...state, result: 'success' }))
    }
  }, [submission.contact])

  const onChange =
    <T extends keyof ContactSectionState['input']>(
      key: T
    ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =>
    (event) => {
      setState((state) => ({ ...state, input: { ...state.input, [key]: event.target.value } }))
    }

  const onSubmit = async () => {
    const { input } = state
    const error: ContactSectionState['error'] = {}
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
    if (input.companyName === '') {
      error.companyName = 'Please complete field'
    }
    setState((state) => ({ ...state, error }))
    if (Object.keys(error).length === 0) {
      try {
        await submitContact(input)
        setState((state) => ({ ...state, result: 'success' }))
      } catch {
        setState((state) => ({ ...state, result: 'error' }))
      }
    }
  }

  const onReset = () => {
    resetForm('contact')
    setState((state) => ({
      ...state,
      input: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
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
      <HeaderText text="CONTACT US" />
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
              label="Company Name"
              value={input.companyName}
              onChange={onChange('companyName')}
              placeholder="Type Here"
              helperText={error.companyName}
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
type ContactSectionProps = {
  onResize?: (dimension: DOMRect) => void
}
type ContactSectionState = {
  input: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    companyName: string
    remarks: string
  }
  error: {
    firstName?: string
    lastName?: string
    email?: string
    phoneNumber?: string
    companyName?: string
  }
  result?: 'success' | 'error'
}

export const FormResultOverlay: React.FunctionComponent<FormResultOverlayProps> = (props) => {
  const [{ type: screenType }] = useScreenState()
  const [state, setState] = React.useState<FormResultOverlayState>({
    open: props.result !== undefined,
    result: props.result,
  })

  React.useEffect(() => {
    if (props.result) {
      setState((state) => ({ ...state, open: true, result: props.result }))
    } else {
      setState((state) => ({ ...state, open: false }))
      const timeout = setTimeout(() => setState((state) => ({ ...state, result: undefined })), 160)
      return () => clearTimeout(timeout)
    }
  }, [props.result])

  const theme = useTheme()
  const { onReset } = props
  const { open, result } = state
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'calc(100% + 64px)',
        height: 'calc(100% + 64px)',
        top: '-32px',
        left: '-32px',
        padding: '32px',
        backgroundColor: theme.palette.background.body.replace(...replaceRGBAlpha(0.3)),
        backdropFilter: 'blur(6px)',
        pointerEvents: open ? 'all' : 'none',
        opacity: open ? 1 : 0,
        transition: 'opacity 160ms ease-in-out',
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '32px',
          transform: open ? undefined : 'translateY(64px)',
          transition: 'transform 160ms ease-in-out',
        }}
      >
        <Box
          sx={{
            padding: '12px',
            border: `2px solid ${result === 'error' ? theme.palette.danger[400] : theme.palette.primary[400]}`,
            borderBottomRightRadius: '32px',
          }}
        >
          <Typography
            level="h4"
            sx={{
              fontSize: '32px',
              paddingLeft: ['xs-phone'].includes(screenType) ? '0.5em' : '1em',
              letterSpacing: ['xs-phone'].includes(screenType) ? '0.5em' : '1em',
              color: result === 'error' ? theme.palette.danger[400] : theme.palette.primary[400],
              textAlign: 'center',
              wordBreak: 'break-word',
            }}
          >
            {result === 'error' ? 'SUBMISSION FAILED' : 'SUBMITTED'}
          </Typography>
        </Box>
        <Button label="RETRY" onClick={onReset} color={result === 'error' ? 'danger' : 'primary'} />
      </Box>
    </Box>
  )
}
type FormResultOverlayProps = {
  result?: 'success' | 'error'
  onReset: () => void
}
type FormResultOverlayState = {
  open: boolean
  result?: 'success' | 'error'
}

export default ContactSection
