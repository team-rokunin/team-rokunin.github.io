import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useCareerState } from '../../store/career'
import { useRefCallback } from '../common/hook'
import { headerCursorAnimation } from './'

const CareerSection: React.FunctionComponent<CareerSectionProps> = (props) => {
  const [{ careers }] = useCareerState()

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
        padding: '64px 192px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
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
        <Typography level="h3" sx={{ color: theme.palette.text.primary }}>
          CAREER
        </Typography>
      </Box>
      <Typography
        level="body1"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: '952px',
          margin: '64px auto',
          textAlign: 'center',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Typography>
      <Box
        sx={{
          maxWidth: '952px',
          margin: '16px auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        {careers.map((career) => (
          <Box
            key={career.title}
            component="fieldset"
            sx={{ borderColor: theme.palette.primary[400], padding: '6px 16px 16px' }}
          >
            <Typography component="legend" level="h4" sx={{ padding: '0 16px' }}>
              {career.title}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                paddingLeft: '32px',
                ['& li']: {
                  paddingLeft: '12px',
                  textIndent: '-12px',
                },
                ['& li:before']: {
                  content: '"-"',
                  display: 'inline-block',
                  width: '12px',
                },
              }}
            >
              {career.descriptions.map((description) => (
                <Typography key={description} component="li" level="body1" sx={{ color: theme.palette.text.primary }}>
                  {description}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
type CareerSectionProps = {
  onResize?: (dimension: DOMRect) => void
}

export default CareerSection
