import * as React from 'react'
import * as Database from 'firebase/database'

import initializeFirebaseApp from './firebase'

export type State = {
  careers: {
    title: string
    descriptions: string[]
  }[]
}
const CareerContext = React.createContext([{} as State] as const)

export const Provider: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  const [state, setState] = React.useState<State>({
    careers: [],
  })

  React.useEffect(() => {
    const firebase = initializeFirebaseApp()
    const database = Database.getDatabase(
      firebase,
      'https://rokunin-67eb4-default-rtdb.asia-southeast1.firebasedatabase.app'
    )
    const ref = Database.ref(database, 'careers')
    Database.get(ref).then((snapshot) => {
      const values = snapshot.val() as { title: string; descriptions: string[] }[]
      setState((state) => ({
        ...state,
        careers: values.map((value) => ({
          title: value.title.toUpperCase(),
          descriptions: value.descriptions,
        })),
      }))
    })
  }, [])

  return <CareerContext.Provider value={[state]}>{props.children}</CareerContext.Provider>
}
export const useCareerState = () => {
  return React.useContext(CareerContext)
}
