import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const LandingPage = React.lazy(() => import(/* webpackChunkName:'landing' */ './landing-page'))

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
      </Routes>
    </BrowserRouter>
  )
}

export default Router
