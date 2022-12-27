import * as React from 'react'
import * as Database from 'firebase/database'
import * as Storage from 'firebase/storage'

import initializeFirebaseApp from './firebase'

/**
 * One of the options to host a video free is on Google Drive with the following hack
 * Find the ID of the public file via share
 * The URL of the raw file will be https://drive.google.com/uc?export=download&id={ID}
 **/

export type State = {
  videos: {
    title: string
    video: string
    thumbnail: string
  }[]
}
const PortfolioContext = React.createContext([{} as State] as const)

export const Provider: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  const [state, setState] = React.useState<State>({
    videos: [],
  })

  React.useEffect(() => {
    const firebase = initializeFirebaseApp()
    const database = Database.getDatabase(
      firebase,
      'https://rokunin-67eb4-default-rtdb.asia-southeast1.firebasedatabase.app'
    )
    const storage = Storage.getStorage(firebase, 'gs://rokunin-67eb4.appspot.com')
    const databaseRef = Database.ref(database, 'portfolios')
    Database.get(databaseRef)
      .then((snapshot) => {
        const values = snapshot.val() as { title: string; video: string; thumbnail: string }[]
        return Promise.all(
          values.reverse().map(async (value) => {
            const videoRef = Storage.ref(storage, value.video)
            const thumbnailRef = Storage.ref(storage, value.thumbnail)
            return {
              title: value.title,
              video: await Storage.getDownloadURL(videoRef),
              thumbnail: await Storage.getDownloadURL(thumbnailRef),
            }
          })
        )
      })
      .then((videos) =>
        setState((state) => ({
          ...state,
          videos,
        }))
      )
  }, [])

  return <PortfolioContext.Provider value={[state]}>{props.children}</PortfolioContext.Provider>
}
export const usePortfolioState = () => {
  return React.useContext(PortfolioContext)
}
