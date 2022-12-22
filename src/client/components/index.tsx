import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const LandingPage = React.lazy(() => import(/* webpackChunkName:'landing' */ './landing-page'))
const PortfolioPage = React.lazy(() => import(/* webpackChunkName:'portfolio' */ './portfolio-page'))

const Router: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  )
}

export default Router
