import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Fragment>
  )
}

export default App
