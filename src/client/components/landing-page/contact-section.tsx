import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useRefCallback } from '../common/hook'
import TextField from '../common/textfield'
import EmailTextField from '../common/textfield/email'
import MobileNumberTextField from '../common/textfield/mobile-number'
import Button from '../common/button'
import { headerCursorAnimation } from './'

const ContactSection: React.FunctionComponent<ContactSectionProps> = (props) => {
  const containerRef = useRefCallback((node) => {
    if (props.onResize && node) {
      const onResize = props.onResize
      onResize(node.getBoundingClientRect())
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          onResize(entry.contentRect)
        }
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
        padding: '64px 192px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: '24px',
          margin: '64px auto',
          maxWidth: '952px',
        }}
      >
        <Box
          sx={{
            width: '16px',
            height: '32px',
            backgroundColor: theme.palette.primary[400],
            animation: `${headerCursorAnimation} 3s linear infinite`,
          }}
        />
        <Typography level="h3" sx={{ color: 'white' }}>
          CONTACT US
        </Typography>
      </Box>
      <Typography
        level="body1"
        sx={{
          color: theme.palette.primary[400],
          margin: '64px auto',
          maxWidth: '952px',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          maxWidth: '952px',
          margin: '16px auto',
        }}
      >
        <TextField label="First Name" placeholder="Type Here" />
        <TextField label="Last Name" placeholder="Type Here" />
        <EmailTextField label="Email" placeholder="Type Here" />
        <MobileNumberTextField label="Phone Number" placeholder="Type Here" />
        <Box sx={{ gridColumn: 'span 2' }}>
          <TextField label="Company Name" placeholder="Type Here" />
        </Box>
        <Box sx={{ gridColumn: 'span 2' }}>
          <TextField label="Remarks" placeholder="Type Here" multiline />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '64px',
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
