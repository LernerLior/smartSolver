import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PageComplaint from './pages/PageComplaint'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/complaint/:id" element={<PageComplaint/>} />
    </Routes>
  )
}
