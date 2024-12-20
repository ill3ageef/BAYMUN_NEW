import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Success = React.lazy(() => import('./views/pages/Success'))
const Confirm = React.lazy(() => import('./views/pages/Confirm'))
const Closed = React.lazy(() => import('./views/pages/Reg_closed.js'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* <Route exact path="/login" name="Login Page" element={<Login />} /> */}
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/confirm/" name="Confirmation Page" element={<Success />} />
          <Route exact path="/success/" name="Success Page" element={<Confirm />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/300" name="Page 500" element={<Page500 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route exact path="/closed" name="Registrations Closed" element={<Closed />} />

          <Route path="*" element={<Navigate to="/register?type=RGVsZWdhdGUK" replace />} />
          <Route
            path="/register/delegate/"
            element={<Navigate to="/register?type=RGVsZWdhdGUK" replace />}
          />
          <Route
            path="/register/security/"
            element={<Navigate to="/register?type=U2VjdXJpdHk" replace />}
          />
          <Route
            path="/register/press/"
            element={<Navigate to="/register?type=UHJlc3M" replace />}
          />
          <Route
            path="/register/chair/"
            element={<Navigate to="/register?type=Q2hhaXI" replace />}
          />
          <Route
            path="/register/runner/"
            element={<Navigate to="/register?type=UnVubmVyIA" replace />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
