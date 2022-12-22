import * as React from 'react'

import FalseLightDemo from '../../asset/vid/falselight.mp4'
import DystopiaLocoDemo from '../../asset/vid/dystopia-loco.mp4'
import RokuninOniDemo from '../../asset/vid/rokunin-oni.mp4'
import DystopiaFinalDemo from '../../asset/vid/dystopia-final.mp4'
import LizardRunDemo from '../../asset/vid/lizard-run.mp4'
import NoMansLandDemo from '../../asset/vid/no-mans-land.mp4'

/**
 * One of the options to host a video free is on Google Drive with the following hack
 * Find the ID of the public file via share
 * The URL of the raw file will be https://drive.google.com/uc?export=download&id={ID}
 **/

export type State = {
  videos: {
    title: string
    url: string
  }[]
}
const PortfolioContext = React.createContext([{} as State] as const)

export const Provider: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  const [state, setState] = React.useState<State>({
    videos: [
      {
        title: 'False Light',
        url: FalseLightDemo,
      },
      {
        title: 'Dystopia',
        url: DystopiaLocoDemo,
      },
      {
        title: 'Oni',
        url: RokuninOniDemo,
      },
      {
        title: 'Dystopia Final',
        url: DystopiaFinalDemo,
      },
      {
        title: 'Lizard Run',
        url: LizardRunDemo,
      },
      {
        title: "No Man's Land",
        url: NoMansLandDemo,
      },
    ],
  })

  return <PortfolioContext.Provider value={[state]}>{props.children}</PortfolioContext.Provider>
}
export const usePortfolioState = () => {
  return React.useContext(PortfolioContext)
}
