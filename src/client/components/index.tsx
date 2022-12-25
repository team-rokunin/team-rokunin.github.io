import * as React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

const LandingPage = React.lazy(() => import(/* webpackChunkName:'landing' */ './landing-page'))
const PortfolioPage = React.lazy(() => import(/* webpackChunkName:'portfolio' */ './portfolio-page'))
const TalentPage = React.lazy(() => import(/* webpackChunkName:'talent' */ './talent-page'))

const Router: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <LocationListener />
      <Routes>
        <Route
          path={`/`}
          element={
            <React.Suspense>
              <LandingPage />
            </React.Suspense>
          }
        />
        <Route
          path={`/portfolio`}
          element={
            <React.Suspense>
              <PortfolioPage />
            </React.Suspense>
          }
        />
        <Route
          path={`/talent`}
          element={
            <React.Suspense>
              <TalentPage />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
const LocationListener: React.FunctionComponent = () => {
  const { pathname } = useLocation()

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [pathname])

  return null
}

export default Router
