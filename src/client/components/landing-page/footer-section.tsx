import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

const FooterSection: React.FunctionComponent = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px 192px',
        backgroundColor: theme.palette.primary[400],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '16px',
          margin: '16px auto',
        }}
      >
        <Box>
          <Typography level="h3" sx={{ fontSize: '32px', color: 'black' }}>
            ROKUNIN
          </Typography>
          <Typography level="body3" sx={{ color: 'black' }}>
            Copyright © 2022 Rokunin Studio Reserved
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '32px' }}>
          {[
            {
              text: 'Terms of Service',
            },
            {
              text: 'Privacy Policy',
            },
          ].map((button) => (
            <Box
              key={button.text}
              component="button"
              sx={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <Typography level="body1" sx={{ fontFamily: ['Bank Gothic', 'sans-serif'].join(','), color: 'black' }}>
                {button.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default FooterSection
