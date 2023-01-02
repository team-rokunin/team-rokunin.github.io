import * as React from 'react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'

const LightForeground: React.FunctionComponent = () => {
  const theme = useTheme()
  return (
    <>
      {Array(3)
        .fill(undefined)
        .map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'block',
              position: 'fixed',
              top: '4px',
              bottom: '-64px',
              left: '6px',
              right: '6px',
              boxShadow: [
                `inset 0 0 48px 2px ${theme.palette.text.primary}`,
                `0 0 16px 2px ${theme.palette.text.primary}`,
              ].join(','),
              borderRadius: '16px',
              mixBlendMode: 'overlay',
              zIndex: 10000,
              pointerEvents: 'none',
            }}
          />
        ))}
    </>
  )
}
export default LightForeground
