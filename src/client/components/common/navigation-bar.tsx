import * as React from 'react'
import { useLinkClickHandler } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import { useTheme } from '@mui/joy/styles'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

import RokuninLogo from '../../../asset/img/rokunin.svg'
import FacebookLogo from '../../../asset/img/facebook.svg'
import TwitterLogo from '../../../asset/img/twitter.svg'
import LinkedInLogo from '../../../asset/img/linkedin.svg'
import InstagramLogo from '../../../asset/img/instagram.svg'
import { useScreenState } from '../../store/screen'
import { replaceRGBAlpha } from '../common/color'
import Glitch from '../common/glitch'
import shuffleText, { ShufflingText } from '../common/shuffling'

const letterShufflingAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translateX(10px) scaleX(2);
  },
  50% {
    opacity: 0;
    transform: translateX(0) scaleX(2);
  },
  100% {
    opacity: 1;
    transform: translateX(-10px) scaleX(2);
  }
`
const NavigationBar: React.FunctionComponent<NavigationBarProps> = (props) => {
  const [{ type: screenType }] = useScreenState()
  const [state, setState] = React.useState<NavigationBarState>({
    menuOpen: false,
  })

  React.useEffect(() => {
    if (['xs-phone', 'sm-tablet'].includes(screenType) && state.menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [screenType, state.menuOpen])

  const toggleMenu = () => {
    setState((state) => ({ ...state, menuOpen: !state.menuOpen }))
  }

  const navigateHome = useLinkClickHandler('/')
  const theme = useTheme()
  const { sections } = props
  const { menuOpen } = state
  return (
    <>
      {['xs-phone', 'sm-tablet'].includes(screenType) ? (
        <>
          <Box sx={{ height: '96px' }} />
          <Box
            sx={{
              position: 'fixed',
              top: '0',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              height: '96px',
              padding: '16px 24px',
              borderBottom: `2px solid ${theme.palette.primary[400]}`,
              backgroundColor: theme.palette.background.level1,
              zIndex: 1000,
            }}
          >
            <Box sx={{ width: '64px' }} />
            <Glitch url="/" onClick={navigateHome}>
              <img
                src={RokuninLogo}
                style={{
                  height: '64px',
                }}
              />
            </Glitch>
            <Box sx={{ width: '64px' }} />
          </Box>
        </>
      ) : undefined}
      {['xs-phone', 'sm-tablet'].includes(screenType) ? (
        <Box
          sx={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '112px',
            height: '96px',
            padding: '16px 24px',
            zIndex: 1501,
          }}
        >
          <Box
            component="button"
            onClick={toggleMenu}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '64px',
              height: '64px',
              backgroundColor: 'transparent',
              border: 'none',
              pointerEvents: 'all',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ height: '24px', width: '24px' }}>
              <g fill={theme.palette.text.primary}>
                <rect
                  x={3}
                  y={menuOpen ? 11 : 5}
                  width={18}
                  height={2}
                  style={{
                    transformOrigin: 'center',
                    ...(menuOpen
                      ? {
                          transform: 'rotate(45deg)',
                          transition: ['y 160ms ease-in-out', 'transform 160ms ease-in-out 160ms'].join(','),
                        }
                      : { transition: ['y 160ms ease-in-out 160ms', 'transform 160ms ease-in-out'].join(',') }),
                  }}
                />
                <rect
                  x={3}
                  y={menuOpen ? 11 : 9}
                  width={12}
                  height={2}
                  style={
                    menuOpen
                      ? { opacity: 0, transition: ['y 160ms ease-in-out', 'opacity 0ms 160ms'].join(',') }
                      : { transition: ['y 160ms ease-in-out 160ms', 'opacity 0ms 160ms'].join(',') }
                  }
                />
                <rect
                  x={3}
                  y={menuOpen ? 11 : 13}
                  width={18}
                  height={2}
                  style={{
                    transformOrigin: 'center',
                    ...(menuOpen
                      ? {
                          transform: 'rotate(-45deg)',
                          transition: ['y 160ms ease-in-out', 'transform 160ms ease-in-out 160ms'].join(','),
                        }
                      : { transition: ['y 160ms ease-in-out 160ms', 'transform 160ms ease-in-out'].join(',') }),
                  }}
                />
                <rect
                  x={3}
                  y={menuOpen ? 11 : 17}
                  width={12}
                  height={2}
                  style={
                    menuOpen
                      ? { opacity: 0, transition: ['y 160ms ease-in-out', 'opacity 0ms 160ms'].join(',') }
                      : { transition: ['y 160ms ease-in-out 160ms', 'opacity 0ms 160ms'].join(',') }
                  }
                />
              </g>
            </svg>
          </Box>
        </Box>
      ) : undefined}
      <Box
        sx={{
          position: 'fixed',
          top: '0',
          width: '100%',
          height: '100%',
          pointerEvents: ['xs-phone', 'sm-tablet'].includes(screenType) && menuOpen ? 'all' : 'none',
          display: 'flex',
          flexDirection: ['xs-phone', 'sm-tablet'].includes(screenType) ? 'column' : 'row',
          justifyContent: 'space-between',
          backgroundColor: ['xs-phone', 'sm-tablet'].includes(screenType)
            ? theme.palette.background.body.replace(...replaceRGBAlpha(0.8))
            : undefined,
          backdropFilter: ['xs-phone', 'sm-tablet'].includes(screenType) ? 'blur(6px)' : undefined,
          opacity: !['xs-phone', 'sm-tablet'].includes(screenType) || menuOpen ? 1 : 0,
          transition: 'opacity 320ms ease-in-out',
          zIndex: 1200,
        }}
      >
        {['xs-phone', 'sm-tablet'].includes(screenType) ? <Box sx={{ height: '96px' }} /> : undefined}
        <Box
          sx={{
            position: 'relative',
            width: !['xs-phone', 'sm-tablet'].includes(screenType) ? '192px' : undefined,
            display: 'flex',
            flexDirection: 'column',
            alignItems: !['xs-phone', 'sm-tablet'].includes(screenType) ? 'stretch' : 'flex-start',
            padding: !['xs-phone', 'sm-tablet'].includes(screenType) ? '0' : '24px',
            pointerEvents: !['xs-phone', 'sm-tablet'].includes(screenType) || menuOpen ? 'all' : 'none',
          }}
        >
          {!['xs-phone', 'sm-tablet'].includes(screenType) ? (
            <>
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
            </>
          ) : undefined}
          {!['xs-phone', 'sm-tablet'].includes(screenType) ? (
            <Box
              sx={{
                height: '226px',
                padding: '64px',
              }}
            >
              <Glitch url="/" onClick={navigateHome}>
                <img
                  src={RokuninLogo}
                  style={{
                    width: '64px',
                  }}
                />
              </Glitch>
            </Box>
          ) : undefined}
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
              <NavigationSectionButton
                key={section.label}
                section={{
                  ...section,
                  onClick: () => {
                    setState((state) => ({ ...state, menuOpen: false }))
                    section.onClick()
                  },
                }}
              />
            ))}
          </Box>
          {!['xs-phone', 'sm-tablet'].includes(screenType) ? <Box sx={{ height: '226px' }} /> : undefined}
        </Box>
        <Box
          sx={{
            position: 'relative',
            width: ['xs-phone', 'sm-tablet'].includes(screenType) ? '100%' : '192px',
            height: ['xs-phone', 'sm-tablet'].includes(screenType) ? '120px' : '100%',
            display: 'flex',
            flexDirection: ['xs-phone', 'sm-tablet'].includes(screenType) ? 'row' : 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!['xs-phone', 'sm-tablet'].includes(screenType) ? (
            <>
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
            </>
          ) : undefined}
          {[
            {
              label: 'Facebook',
              icon: FacebookLogo,
              url: 'https://www.facebook.com/TeamRokunin',
            },
            {
              label: 'Twitter',
              icon: TwitterLogo,
              url: 'https://twitter.com/teamrokunin',
            },
            {
              label: 'LinkedIn',
              icon: LinkedInLogo,
              url: 'https://www.linkedin.com/in/team-rokunin-224553200',
            },
            {
              label: 'Instagram',
              icon: InstagramLogo,
              url: 'https://www.instagram.com/teamrokunin',
            },
          ].map((button) => (
            <Box
              key={button.label}
              sx={{
                pointerEvents: !['xs-phone', 'sm-tablet'].includes(screenType) || menuOpen ? 'all' : 'none',
              }}
            >
              <Glitch url={button.url} onClick={() => window.open(button.url, '_self')}>
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
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}
type NavigationBarProps = {
  sections: NavigationSection[]
}
type NavigationBarState = {
  menuOpen: boolean
}

const NavigationSectionButton: React.FunctionComponent<NavigationSectionButtonProps> = (props) => {
  const [{ type: screenType }] = useScreenState()
  const [state, setState] = React.useState<NavigationSectionButtonState>({
    hover: false,
  })

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
  const { hover } = state
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
          section.active
            ? theme.palette.primary[400].replace(...replaceRGBAlpha(0.4))
            : theme.palette.text.primary.replace(...replaceRGBAlpha(0.2))
        }`,
        boxShadow: [
          `inset 0 0 16px ${
            section.active
              ? theme.palette.primary[400].replace(...replaceRGBAlpha(0.2))
              : theme.palette.text.primary.replace(...replaceRGBAlpha(0.1))
          }`,
          `0 0 ${section.active ? 48 : 16}px ${
            section.active
              ? theme.palette.primary[400].replace(...replaceRGBAlpha(0.5))
              : theme.palette.text.primary.replace(...replaceRGBAlpha(0.1))
          }`,
        ].join(','),
        backgroundColor: section.active
          ? theme.palette.primary[400].replace(...replaceRGBAlpha(0.2))
          : theme.palette.text.primary.replace(...replaceRGBAlpha(0.05)),
        cursor: 'pointer',
        backdropFilter: !['xs-phone', 'sm-tablet'].includes(screenType) ? 'blur(6px)' : undefined,
        transition: ['border', 'box-shadow', 'background-color']
          .map((property) => `${property} 160ms ease-in-out`)
          .join(','),
        ...(!section.active
          ? {
              ['&:hover']: {
                border: `2px solid ${theme.palette.text.primary.replace(...replaceRGBAlpha(0.3))}`,
                boxShadow: [
                  `inset 0 0 16px ${theme.palette.text.primary.replace(...replaceRGBAlpha(0.2))}`,
                  `0 0 32px ${theme.palette.text.primary.replace(...replaceRGBAlpha(0.2))}`,
                ].join(','),
              },
            }
          : {}),
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={{ height: '14px', width: '14px' }}>
        <g
          fill={section.active ? theme.palette.primary[400] : theme.palette.text.primary}
          style={{ transition: 'fill 160ms ease-in-out' }}
        >
          {section.icon}
        </g>
      </svg>
      <Box
        sx={{
          position: 'absolute',
          left: 'calc(100% + 24px)',
          width: '320px',
          pointerEvents: !['xs-phone', 'sm-tablet'].includes(screenType) ? 'none' : 'inherit',
        }}
      >
        <NavigationSectionButtonLabel
          show={['xs-phone', 'sm-tablet'].includes(screenType) || hover}
          text={section.label}
        />
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

const NavigationSectionButtonLabel: React.FunctionComponent<NavigationSectionButtonLabelProps> = (props) => {
  const [shufflingText] = shuffleText(props.show ? props.text : '')

  const theme = useTheme()
  return (
    <Typography level="body1" sx={{ textAlign: 'left', color: theme.palette.text.primary }}>
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
                color: theme.palette.text.secondary.replace(...replaceRGBAlpha(0.5)),
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
                willChange: 'transform, opacity',
                animation: letter.shuffling ? `${letterShufflingAnimation} 400ms infinite alternate` : undefined,
              },
            }}
            {...{ 'data-txt': letter.text }}
          >
            {letter.text}
          </Box>
        ))}
    </Typography>
  )
}
type NavigationSectionButtonLabelProps = {
  text: string
  show: boolean
}

type NavigationSection = {
  label: string
  active: boolean
  icon: JSX.Element
  onClick: () => void
}

export default NavigationBar
