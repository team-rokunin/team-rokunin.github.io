import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import TextField from '../common/textfield'
import Button from '../common/button'

const ContactSection: React.FunctionComponent = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '64px',
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
            animation: 'header-cursor 3s linear infinite',
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
        <TextField label="Email" placeholder="Type Here" />
        <TextField label="Phone Number" placeholder="Type Here" />
        <Box sx={{ gridColumn: 'span 2' }}>
          <TextField label="Company Name" placeholder="Type Here" />
        </Box>
      </Box>
    </Box>
  )
}

export default ContactSection
