import { FirebaseApp, initializeApp } from 'firebase/app'

let firebaseApp: FirebaseApp | undefined
const initializeFirebaseApp = () => {
  if (firebaseApp === undefined) {
    const app = initializeApp({
      apiKey: 'AIzaSyA6W8Sks-dsn1c5nKllAVl7eMCtBb4YYyg',
      authDomain: 'rokunin-67eb4.firebaseapp.com',
      projectId: 'rokunin-67eb4',
      storageBucket: 'rokunin-67eb4.appspot.com',
      messagingSenderId: '391931977765',
      appId: '1:391931977765:web:8d5d5459fe66477a3e9fcc',
      measurementId: 'G-CKH8KT47LV',
    })
    firebaseApp = app
    return app
  } else {
    return firebaseApp
  }
}

export default initializeFirebaseApp
