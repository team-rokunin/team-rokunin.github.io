import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useScreenState } from '../../store/screen'
import Glitch from '../common/glitch'

const FooterSection: React.FunctionComponent = () => {
  const [{ type: screenType }] = useScreenState()
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: ['xs-phone', 'sm-tablet'].includes(screenType) ? '16px 46px' : '64px 192px',
        borderTop: `2px solid ${theme.palette.primary[400]}`,
        backgroundColor: theme.palette.background.level1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          columnGap: '32px',
          rowGap: '16px',
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            columnGap: '32px',
            rowGap: '12px',
          }}
        >
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
