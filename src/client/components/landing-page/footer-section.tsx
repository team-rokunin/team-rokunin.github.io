import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import Glitch from '../common/glitch'

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
        borderTop: `2px solid ${theme.palette.primary[400]}`,
        backgroundColor: theme.palette.background.level1,
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
          <Typography level="h3" sx={{ fontSize: '32px', color: theme.palette.text.secondary }}>
            ROKUNIN
          </Typography>
          <Typography level="body3" sx={{ color: theme.palette.text.secondary }}>
            Copyright © 2022 Rokunin Studio Reserved
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '32px' }}>
          {[
            {
              text: 'Terms of Service',
            },
            {
              text: 'Privacy Policy',
            },
          ].map((button) => (
            <Glitch key={button.text}>
              <Typography
                level="body1"
                sx={{ fontFamily: ['Bank Gothic', 'sans-serif'].join(','), color: theme.palette.text.secondary }}
              >
                {button.text}
              </Typography>
            </Glitch>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default FooterSection
