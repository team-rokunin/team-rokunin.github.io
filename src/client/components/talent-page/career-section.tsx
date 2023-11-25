import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import { useScreenState } from '../../store/screen'
import { useCareerState } from '../../store/career'
import { useRefCallback } from '../common/hook'
import HeaderText from '../common/header-text'

const CareerSection: React.FunctionComponent<CareerSectionProps> = (props) => {
  const [{ type: screenType }] = useScreenState()
  const [{ careers }] = useCareerState()

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
      <Box sx={{ margin: ['xs-phone', 'sm-tablet'].includes(screenType) ? '0 -24px' : '0' }}>
        <HeaderText text="CAREER" />
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
        {careers.length > 0
          ? 'We value artists growth and development, providing you the best opportunity to showcase your skills and abilities.'
          : 'We are not hiring at the moment.'
        }
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
            sx={{ border: `1px solid ${theme.palette.primary[400]}`, padding: '6px 16px 16px' }}
          >
            <Typography component="legend" level="h4" sx={{ padding: '0 16px' }}>
              {career.title}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                margin: '16px 0',
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
