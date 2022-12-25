import * as React from 'react'
import { keyframes } from '@emotion/react'
import Portal from '@mui/base/Portal'

import GrainBackground from '../common/grain-background'
import LightForeground from '../common/light-foreground'
import LinedForeground from '../common/lined-foreground'
import NavigationBar from '../common/navigation-bar'
import FooterSection from '../landing-page/footer-section'
import CareerSection from './career-section'
import ApplySection from './apply-section'

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
const TalentPage: React.FunctionComponent = () => {
  const [state, setState] = React.useState<TalentPageState>({
    dimensions: {},
    activeSection: 'career',
  })
  const { dimensions } = state
  const sections = ['career', 'apply'] as const
  const heights = [dimensions.career?.height ?? 0, dimensions.apply?.height ?? 0]

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

  const setDimension = (section: keyof TalentPageState['dimensions'], dimension: DOMRect) => {
    setState((state) => ({ ...state, dimensions: { ...state.dimensions, [section]: dimension } }))
  }
  const onClickSection = (section: keyof TalentPageState['dimensions']) => {
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
            label: 'CAREER',
            active: activeSection === 'career',
            icon: (
              <>
                <path d="M19,7v-1h-4V1h-1V0H6V1h-1V6H1v1H0v12H1v1H19v-1h1V7h-1Zm-1,10h-1v1H3v-1h-1V9h1v-1h14v1h1v8ZM7,3h1v-1h4v1h1v3H7V3Z" />
              </>
            ),
            onClick: () => onClickSection('career'),
          },
          {
            label: 'APPLY NOW',
            active: activeSection === 'apply',
            icon: (
              <>
                <path d="M19,2V1H1v1H0V18H1v1H19v-1h1V2h-1Zm-1,3h-1v1h-2v1h-2v1h-2v1h-2v-1h-2v-1h-2v-1H3v-1h-1v-1h1v-1h14v1h1v1Zm0,11h-1v1H3v-1h-1V8h1v1h2v1h2v1h1v1h4v-1h1v-1h2v-1h2v-1h1v8Z" />
              </>
            ),
            onClick: () => onClickSection('apply'),
          },
        ]}
      />
      <CareerSection onResize={(dimension) => setDimension('career', dimension)} />
      <ApplySection onResize={(dimension) => setDimension('apply', dimension)} />
      <FooterSection />
      <Portal>
        <LightForeground />
        <LinedForeground />
      </Portal>
    </>
  )
}
type TalentPageState = {
  dimensions: {
    career?: DOMRect
    apply?: DOMRect
  }
  activeSection: 'career' | 'apply'
}
export default TalentPage
