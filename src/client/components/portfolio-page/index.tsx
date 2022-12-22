import * as React from 'react'
import { keyframes } from '@emotion/react'
import Portal from '@mui/base/Portal'

import GrainBackground from '../common/grain-background'
import LightForeground from '../common/light-foreground'
import LinedForeground from '../common/lined-foreground'
import NavigationBar from '../common/navigation-bar'
import FooterSection from '../landing-page/footer-section'
import ContactSection from '../landing-page/contact-section'
import PortfolioSection from './portfolio-section'

export const headerCursorAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const LandingPage: React.FunctionComponent = () => {
  const [state, setState] = React.useState<LandingPageState>({
    dimensions: {},
    activeSection: 'portfolio',
  })
  const { dimensions } = state
  const sections = ['portfolio', 'contact'] as const
  const heights = [dimensions.portfolio?.height ?? 0, dimensions.contact?.height ?? 0]

  React.useEffect(() => {
    const onScroll = () => {
      const { activeSection } = state
      for (const index of [0, 1, 2, 3]) {
        const height = heights.slice(0, index + 1).reduce((total, next) => total + next, 0) - heights[index] / 2
        if (window.scrollY <= height) {
          const section = sections[index]
          if (activeSection !== section) {
            setState((state) => ({ ...state, activeSection: section }))
          }
          break
        }
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [state.dimensions, state.activeSection])

  const setDimension = (section: keyof LandingPageState['dimensions'], dimension: DOMRect) => {
    setState((state) => ({ ...state, dimensions: { ...state.dimensions, [section]: dimension } }))
  }
  const onClickSection = (section: keyof LandingPageState['dimensions']) => {
    window.scroll({
      top: heights.slice(0, sections.indexOf(section)).reduce((total, next) => total + next, 0),
      behavior: 'smooth',
    })
  }

  const { activeSection } = state
  return (
    <>
      <GrainBackground />
      <NavigationBar
        sections={[
          {
            label: 'PORTFOLIO',
            active: activeSection === 'portfolio',
            icon: (
              <>
                <path d="M9.5,1H3.5V19h6v-2h2v-2h2v-2h2v-1h1v-4h-1v-1h-2v-2h-2V3h-2V1Zm2,10v2h-2v2h-2v2h-2V3h2v2h2v2h2v2h2v2h-2Z" />
              </>
            ),
            onClick: () => onClickSection('portfolio'),
          },
          {
            label: 'CONTACT US',
            active: activeSection === 'contact',
            icon: (
              <>
                <path d="M19,2V1H1v1H0V18H1v1H19v-1h1V2h-1Zm-1,3h-1v1h-2v1h-2v1h-2v1h-2v-1h-2v-1h-2v-1H3v-1h-1v-1h1v-1h14v1h1v1Zm0,11h-1v1H3v-1h-1V8h1v1h2v1h2v1h1v1h4v-1h1v-1h2v-1h2v-1h1v8Z" />
              </>
            ),
            onClick: () => onClickSection('contact'),
          },
        ]}
      />
      <PortfolioSection onResize={(dimension) => setDimension('portfolio', dimension)} />
      <ContactSection onResize={(dimension) => setDimension('contact', dimension)} />
      <FooterSection />
      <Portal>
        <LightForeground />
        <LinedForeground />
      </Portal>
    </>
  )
}
type LandingPageState = {
  dimensions: {
    portfolio?: DOMRect
    contact?: DOMRect
  }
  activeSection: 'portfolio' | 'contact'
}
export default LandingPage
