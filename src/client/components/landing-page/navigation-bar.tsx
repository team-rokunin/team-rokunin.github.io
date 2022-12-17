import * as React from 'react'
import { Global, css } from '@emotion/react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import RokuninLogo from '../../../asset/img/rokunin.svg'
import FacebookLogo from '../../../asset/img/facebook.svg'
import TwitterLogo from '../../../asset/img/twitter.svg'
import LinkedInLogo from '../../../asset/img/linkedin.svg'
import InstagramLogo from '../../../asset/img/instagram.svg'
import { replaceRGBAlpha } from '../common/color'
import Glitch from '../common/glitch'
import shuffleText, { ShufflingText } from '../common/shuffling'

const style = css(`
  @keyframes text-shuffling {
    0%: {
      opacity: 1;
      transform: translateX(10px) scaleX(2);
    },
    50%: {
      opacity: 0;
      transform: translateX(0) scaleX(2);
    },
    100%: {
      opacity: 1;
      transform: translateX(-10px) scaleX(2);
    }
  }
`)
const NavigationBar: React.FunctionComponent<NavigationBarProps> = (props) => {
  const theme = useTheme()
  const { sections } = props
  return (
    <>
      <Global styles={style} />
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1200,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '192px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              left: '48px',
              width: '1px',
              height: '100%',
              background: `linear-gradient(${[
                'to bottom',
                theme.palette.primary[400].replace(...replaceRGBAlpha(0.3)),
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 2% 12%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0.2))} 14%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 16%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0.2))} 18%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 22% 74%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0.1))} 82%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 96%`,
              ].join(',')})`,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              right: '48px',
              width: '1px',
              height: '100%',
              background: `linear-gradient(${[
                'to bottom',
                theme.palette.primary[400].replace(...replaceRGBAlpha(0.3)),
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0.4))} 6%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 13% 16%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0.2))} 20% 32%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 37% 88%`,
                theme.palette.primary[400].replace(...replaceRGBAlpha(0.3)),
              ].join(',')})`,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '226px',
              padding: '64px',
            }}
          >
            <Glitch>
              <img
                src={RokuninLogo}
                style={{
                  width: '64px',
                }}
              />
            </Glitch>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              rowGap: '4px',
            }}
          >
            {sections.map((section) => (
              <NavigationSectionButton key={section.label} section={section} />
            ))}
          </Box>
          <Box sx={{ height: '226px' }} />
        </Box>
        <Box
          sx={{
            position: 'relative',
            width: '192px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              left: '48px',
              width: '1px',
              height: '100%',
              background: `linear-gradient(${[
                'to bottom',
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 38%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0.1))} 42% 56%`,
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 64%`,
              ].join(',')})`,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              right: '48px',
              width: '1px',
              height: '100%',
              background: `linear-gradient(${[
                'to bottom',
                theme.palette.primary[400].replace(...replaceRGBAlpha(0.3)),
                `${theme.palette.primary[400].replace(...replaceRGBAlpha(0))} 58% 82%`,
                theme.palette.primary[400].replace(...replaceRGBAlpha(0.1)),
              ].join(',')})`,
            }}
          />
          {[
            {
              label: 'Facebook',
              icon: FacebookLogo,
            },
            {
              label: 'Twitter',
              icon: TwitterLogo,
            },
            {
              label: 'LinkedIn',
              icon: LinkedInLogo,
            },
            {
              label: 'Instagram',
              icon: InstagramLogo,
            },
          ].map((button) => (
            <Glitch key={button.label}>
              <Box
                sx={{
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={button.icon} alt={button.label} style={{ height: '16px', width: '16px' }} />
              </Box>
            </Glitch>
          ))}
        </Box>
      </Box>
    </>
  )
}
type NavigationBarProps = {
  sections: NavigationSection[]
}

const NavigationSectionButton: React.FunctionComponent<NavigationSectionButtonProps> = (props) => {
  const [state, setState] = React.useState<NavigationSectionButtonState>({
    hover: false,
  })
  const [shufflingText] = shuffleText(state.hover ? props.section.label : '')

  const onMouseEvent: React.MouseEventHandler = (event) => {
    switch (event.type) {
      case 'mouseenter':
        setState((state) => ({ ...state, hover: true }))
        break
      case 'mouseleave':
        setState((state) => ({ ...state, hover: false }))
        break
    }
  }

  const theme = useTheme()
  const { section } = props
  return (
    <Box
      component="button"
      onMouseEnter={onMouseEvent}
      onMouseLeave={onMouseEvent}
      onClick={section.onClick}
      sx={{
        position: 'relative',
        width: '64px',
        height: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `2px solid ${
          section.active ? theme.palette.primary[400].replace(...replaceRGBAlpha(0.4)) : 'rgba(255, 255, 255, 0.2)'
        }`,
        boxShadow: [
          `inset 0 0 16px ${
            section.active ? theme.palette.primary[400].replace(...replaceRGBAlpha(0.2)) : 'rgba(255, 255, 255, 0.1)'
          }`,
          `0 0 ${section.active ? 48 : 16}px ${
            section.active ? theme.palette.primary[400].replace(...replaceRGBAlpha(0.5)) : 'rgba(255, 255, 255, 0.1)'
          }`,
        ].join(','),
        backgroundColor: section.active
          ? theme.palette.primary[400].replace(...replaceRGBAlpha(0.2))
          : 'rgba(255, 255, 255, 0.05)',
        pointerEvents: 'all',
        cursor: 'pointer',
        backdropFilter: 'blur(6px)',
        transition: ['border', 'box-shadow', 'background-color']
          .map((property) => `${property} 160ms ease-in-out`)
          .join(','),
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={{ height: '14px', width: '14px' }}>
        <g
          fill={section.active ? theme.palette.primary[400] : 'rgb(255, 255, 255)'}
          style={{ transition: 'fill 160ms ease-in-out' }}
        >
          {section.icon}
        </g>
      </svg>
      <Box sx={{ position: 'absolute', left: 'calc(100% + 24px)', width: '320px', pointerEvents: 'none' }}>
        <Typography level="body1" sx={{ textAlign: 'left', color: 'white' }}>
          {shufflingText
            .reduce((letters, letter) => {
              const previousLetter = letters.slice(-1)[0]
              return previousLetter && !previousLetter.shuffling && !letter.shuffling
                ? [
                    ...letters.slice(0, -1),
                    {
                      text: previousLetter.text + letter.text,
                      shuffling: false,
                    },
                  ]
                : [...letters, letter]
            }, [] as ShufflingText[])
            .map((letter, index) => (
              <Box
                key={index}
                component="span"
                sx={{
                  position: 'relative',
                  opacity: letter.shuffling ? 0.3 : 1,
                  '&:after': {
                    content: 'attr(data-txt)',
                    color: theme.palette.primary[400].replace(...replaceRGBAlpha(0.5)),
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0,
                    willChange: 'transform, opacity',
                    animation: letter.shuffling ? 'text-shuffling 400ms infinite alternate' : undefined,
                  },
                }}
                {...{ 'data-txt': letter.text }}
              >
                {letter.text}
              </Box>
            ))}
        </Typography>
      </Box>
    </Box>
  )
}
type NavigationSectionButtonState = {
  hover: boolean
}
type NavigationSectionButtonProps = {
  section: NavigationSection
}
type NavigationSection = {
  label: string
  active: boolean
  icon: JSX.Element
  onClick: () => void
}

export default NavigationBar
