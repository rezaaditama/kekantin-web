import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = localStorage.getItem('user');

  // Jika tidak ada user di localStorage, redirect ke login
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  // Jika ada, tampilkan halaman yang diminta (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
