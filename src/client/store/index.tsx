import * as React from 'react'

import { Provider as ScreenProvider } from './screen'
import { Provider as PortfolioProvider } from './portfolio'

const providers = [ScreenProvider, PortfolioProvider]
const Provider: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  return [...providers].reverse().reduce((child, Provider) => <Provider>{child}</Provider>, <>{props.children}</>)
}
export default Provider
