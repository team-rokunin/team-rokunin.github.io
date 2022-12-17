import * as React from 'react'
import { Global, css } from '@emotion/react'

import GrainBackground from '../common/grain-background'
import LinedForeground from '../common/lined-foreground'
import NavigationBar from './navigation-bar'
import HeroSection from './hero-section'
import PortfolioSection from './portfolio-section'
import ContactSection from './contact-section'
import TalentSection from './talent-section'
import FooterSection from './footer-section'

const style = css(`
  @keyframes header-cursor {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`)
const LandingPage: React.FunctionComponent = () => {
  const [state, setState] = React.useState<LandingPageState>({
    dimensions: {},
    activeSection: 'hero',
  })
  const { dimensions } = state
  const sections = ['hero', 'portfolio', 'contact', 'talent'] as const
  const heights = [
    dimensions.hero?.height ?? 0,
    dimensions.portfolio?.height ?? 0,
    dimensions.contact?.height ?? 0,
    dimensions.talent?.height ?? 0,
  ]

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
      <Global styles={style} />
      <GrainBackground />
      <LinedForeground />
      <NavigationBar
        sections={[
          {
            label: 'HOME',
            active: activeSection === 'hero',
            icon: (
              <>
                <path d="M19,5v-1h-2v-1h-2v-1h-2V1H7v1h-2v1H3v1H1v1H0v2H1v10H0v2H9v-7h2v7h9v-2h-1V7h1v-2h-1Zm-2,12h-4v-7H7v7H3V6h2v-1h2v-1h2v-1h2v1h2v1h2v1h2v11Z" />
              </>
            ),
            onClick: () => onClickSection('hero'),
          },
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
          {
            label: 'TALENT',
            active: activeSection === 'talent',
            icon: (
              <>
                <path d="M19,7v-1h-4V1h-1V0H6V1h-1V6H1v1H0v12H1v1H19v-1h1V7h-1Zm-1,10h-1v1H3v-1h-1V9h1v-1h14v1h1v8ZM7,3h1v-1h4v1h1v3H7V3Z" />
              </>
            ),
            onClick: () => onClickSection('talent'),
          },
        ]}
      />
      <HeroSection onResize={(dimension) => setDimension('hero', dimension)} />
      <PortfolioSection onResize={(dimension) => setDimension('portfolio', dimension)} />
      <ContactSection onResize={(dimension) => setDimension('contact', dimension)} />
      <TalentSection onResize={(dimension) => setDimension('talent', dimension)} />
      <FooterSection />
    </>
  )
}
type LandingPageState = {
  dimensions: {
    hero?: DOMRect
    portfolio?: DOMRect
    contact?: DOMRect
    talent?: DOMRect
  }
  activeSection: 'hero' | 'portfolio' | 'contact' | 'talent'
}
export default LandingPage
