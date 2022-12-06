import * as React from 'react'

export type ScreenType = 'xl-desktop' | 'lg-desktop' | 'md-desktop' | 'sm-tablet' | 'xs-phone'

export type State = {
  type: ScreenType
}
const ScreenContext = React.createContext([{} as State] as const)

const trackScreenType = () => {
  const width = window.innerWidth
  const type: ScreenType =
    width >= 1536
      ? 'xl-desktop'
      : width >= 1200
      ? 'lg-desktop'
      : width >= 900
      ? 'md-desktop'
      : width >= 600
      ? 'sm-tablet'
      : 'xs-phone'
  return type
}

export const Provider: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  const [state, setState] = React.useState<State>({
    type: trackScreenType(),
  })

  React.useEffect(() => {
    const listenResize = () => {
      const type = trackScreenType()
      if (state.type !== type) {
        setState((state) => ({ ...state, type }))
      }
    }
    window.addEventListener('resize', listenResize)
    return () => {
      window.removeEventListener('resize', listenResize)
    }
  }, [state.type])

  return <ScreenContext.Provider value={[state]}>{props.children}</ScreenContext.Provider>
}
export const useScreenState = () => {
  return React.useContext(ScreenContext)
}
