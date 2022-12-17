import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useRefCallback } from '../common/hook'
import { replaceRGBAlpha } from '../common/color'
import Button from '../common/button'
import { headerCursorAnimation } from './'

const TalentSection: React.FunctionComponent<TalentSectionProps> = (props) => {
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
          TALENT
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
          maxWidth: '640px',
          margin: '16px auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Typography level="h4" sx={{ color: 'white', textAlign: 'center' }}>
          WE ARE LOOKING FOR
        </Typography>
        <Box>
          <Box sx={{ padding: '32px', border: `2px solid ${theme.palette.primary[400]}`, borderBottom: '0' }}>
            <Typography
              level="h4"
              sx={{ fontSize: '32px', letterSpacing: '1em', color: theme.palette.primary[400], textAlign: 'center' }}
            >
              TALENT
            </Typography>
          </Box>
          <Box
            sx={{ padding: '12px', border: `2px solid ${theme.palette.primary[400]}`, borderBottomRightRadius: '32px' }}
          >
            <Box
              sx={{
                height: '48px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                columnGap: '8px',
                borderBottomRightRadius: '21px',
                overflow: 'hidden',
              }}
            >
              {Array(20)
                .fill(undefined)
                .map((_, index) => (
                  <Box
                    key={index}
                    sx={{ flex: 1, backgroundColor: theme.palette.primary[400].replace(...replaceRGBAlpha(0.5)) }}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '64px',
        }}
      >
        <Button label="VIEW" />
      </Box>
    </Box>
  )
}
type TalentSectionProps = {
  onResize?: (dimension: DOMRect) => void
}

export default TalentSection
