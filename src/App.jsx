import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      {/* Alamat utama langsung diarahkan ke login atau dashboard */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Halaman 404 sederhana */}
      <Route path="*" element={<div className="p-10">404 - Halaman Tidak Ditemukan</div>} />
    </Routes>
  )
}

export default App