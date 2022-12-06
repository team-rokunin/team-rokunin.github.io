import * as React from 'react'

import { Provider as ScreenProvider } from './screen'

const providers = [ScreenProvider]
const Provider: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  return [...providers].reverse().reduce((child, Provider) => <Provider>{child}</Provider>, <>{props.children}</>)
}
export default Provider
