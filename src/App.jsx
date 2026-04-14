import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Tambahkan Navigate di sini
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loading imports tetap sama
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const OrderStatusPage = lazy(() => import('./pages/OrderStatusPage'));
const DaftarMenu = lazy(() => import('./pages/DaftarMenu'));
const Keranjang = lazy(() => import('./pages/Keranjang'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Profil = lazy(() => import('./pages/Profil'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const Detailpesanan = lazy(() => import('./pages/Detailpesanan'));

const PageLoader = () => (
  <div className='min-h-screen flex items-center justify-center bg-[#F4F9FF]'>
    <div className='text-orange-500 font-bold animate-pulse uppercase tracking-widest text-xs'>
      Memuat Halaman...
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* ALIAS/REDIRECTS (Supaya link lama tidak broken) */}
        <Route path='/login' element={<Navigate to='/' replace />} />
        <Route path='/dashboard' element={<Navigate to='/beranda' replace />} />
        <Route path='/keranjang' element={<Navigate to='/cart' replace />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          {/* Beranda (Sebelumnya Dashboard) */}
          <Route path='/beranda' element={<Dashboard />} />

          {/* Cart (Sebelumnya Keranjang) */}
          <Route path='/cart' element={<Keranjang />} />

          <Route path='/order-status' element={<OrderStatusPage />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orders/:shop_id' element={<DaftarMenu />} />
          <Route path='/detail-pesanan' element={<Detailpesanan />} />
          <Route path='/profil' element={<Profil />} />
          <Route path='/edit-profile' element={<EditProfile />} />
        </Route>

        {/* 404 CATCH-ALL */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
