import * as React from 'react'

const ServiceWorkerRegistrator: React.FunctionComponent = () => {
  React.useEffect(() => {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service worker registered: ', registration)
        })
        .catch((error) => {
          console.error('Service worker registration failed: ', error)
        })
    })
  }, [])
  return null
}

export default ServiceWorkerRegistrator
