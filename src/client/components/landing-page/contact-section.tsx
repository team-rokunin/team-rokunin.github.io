import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useScreenState } from '../../store/screen'
import { useRefCallback } from '../common/hook'
import { replaceRGBAlpha } from '../common/color'
import TextField from '../common/textfield'
import EmailTextField from '../common/textfield/email'
import MobileNumberTextField from '../common/textfield/mobile-number'
import Button from '../common/button'
import { headerCursorAnimation } from './'

const ContactSection: React.FunctionComponent<ContactSectionProps> = (props) => {
  const [{ type: screenType }] = useScreenState()

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

  const theme = useTheme()
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: ['xs-phone'].includes(screenType) ? '16px' : '24px',
          margin: '64px auto',
          maxWidth: '952px',
        }}
      >
        <Box
          sx={{
            width: ['xs-phone'].includes(screenType) ? '12px' : '16px',
            height: ['xs-phone'].includes(screenType) ? '24px' : '32px',
            backgroundColor: theme.palette.primary[400],
            animation: `${headerCursorAnimation} 3s linear infinite`,
          }}
        />
        <Typography level="h3" sx={{ color: theme.palette.text.primary }}>
          CONTACT US
        </Typography>
      </Box>
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
          display: 'grid',
          gridTemplateColumns: ['xs-phone'].includes(screenType) ? '1fr' : 'repeat(2, 1fr)',
          gap: '16px',
          maxWidth: '952px',
          margin: '16px auto',
        }}
      >
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
            backgroundColor: theme.palette.background.body.replace(...replaceRGBAlpha(0.3)),
            backdropFilter: 'blur(6px)',
          }}
        >
          <Typography>Success</Typography>
        </Box>
        <TextField label="First Name" placeholder="Type Here" />
        <TextField label="Last Name" placeholder="Type Here" />
        <EmailTextField label="Email" placeholder="Type Here" />
        <MobileNumberTextField label="Phone Number" placeholder="Type Here" />
        <Box sx={{ gridColumn: ['xs-phone'].includes(screenType) ? undefined : 'span 2' }}>
          <TextField label="Company Name" placeholder="Type Here" />
        </Box>
        <Box sx={{ gridColumn: ['xs-phone'].includes(screenType) ? undefined : 'span 2' }}>
          <TextField label="Remarks" placeholder="Type Here" multiline />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '64px',
        }}
      >
        <Button label="SUBMIT" />
      </Box>
    </Box>
  )
}
type ContactSectionProps = {
  onResize?: (dimension: DOMRect) => void
}

export default ContactSection
