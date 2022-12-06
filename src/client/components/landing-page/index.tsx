import * as React from 'react'
import { Global, css } from '@emotion/react'

import GrainBackground from '../common/grain-background'
import LinedForeground from '../common/lined-foreground'
import NavigationBar from './navigation-bar'
import HeroSection from './hero-section'
import PortfolioSection from './portfolio-section'
import ContactSection from './contact-section'

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
  return (
    <>
      <Global styles={style} />
      <GrainBackground />
      <LinedForeground />
      <NavigationBar />
      <HeroSection />
      <PortfolioSection />
      <ContactSection />
    </>
  )
}
export default LandingPage
