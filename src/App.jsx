import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
    <div className='text-orange-500 font-bold animate-pulse'>
      Memuat Halaman...
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Tama */}
        <Route path='*' element={<ErrorPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/order-status' element={<OrderStatusPage />} />

          {/* Risma */}
          <Route path='/keranjang' element={<Keranjang />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orders/:shop_id' element={<DaftarMenu />} />

          {/* Tasya */}
          <Route path='/detail-pesanan' element={<Detailpesanan />} />
          <Route path='/profil' element={<Profil />} />
          <Route path='/edit-profile' element={<EditProfile />} />

          {/* Zahra */}
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Suspense>
  );
}

export default App;
