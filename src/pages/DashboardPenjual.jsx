import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  Wallet, 
  CheckCircle2, 
  MessageSquare, 
  User, 
  Utensils, 
  Clock, 
  ChevronRight, 
  Loader2,
  RefreshCw
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getBerandaPenjual, updateStatusSelesai } from '../services/penjualService';

const DashboardPenjual = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Validasi user session dari localStorage
  const getUserIdFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser.user_id ? Number(parsedUser.user_id) : null;
      } catch (error) {
        console.error("Gagal membaca session user:", error);
        return null;
      }
    }
    return null;
  };

  const userId = getUserIdFromStorage();

  // Fungsi Fetch Ringkasan Data Dashboard
  const loadDashboardData = async (showLoading = true) => {
    if (!userId) {
      navigate('/login');
      return;
    }
    try {
      if (showLoading) setIsLoading(true);
      setErrorText('');
      const data = await getBerandaPenjual(userId);
      setDashboardData(data);
    } catch (error) {
      console.error(error);
      setErrorText('Gagal menyinkronkan data toko dengan server.');
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData(true);
  }, [userId]);

  // Handler untuk menyelesaikan pesanan pembeli langsung dari dashboard
  const handleSelesaikanPesanan = async (orderId) => {
    if (!orderId || isProcessingAction) return;
    if (!window.confirm(`Selesaikan pesanan #${orderId}? Pembeli akan mendapatkan notifikasi.`)) return;

    try {
      setIsProcessingAction(true);
      await updateStatusSelesai(orderId);
      // Refresh senyap data dashboard pasca sukses update status
      await loadDashboardData(false);
    } catch (error) {
      alert(error || 'Gagal menyelesaikan pesanan.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#F4F9FF] flex flex-col justify-between'>
        <Navbar />
        <div className='flex flex-col items-center justify-center py-20 text-slate-400 my-auto'>
          <Loader2 className='w-12 h-12 animate-spin mb-4 text-emerald-600' />
          <p className='font-black uppercase tracking-widest text-xs text-slate-500'>Memuat Panel Dapur Toko...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const shopName = dashboardData?.toko?.shop_name || 'Lapak Kuliner';
  const totalPemasukan = dashboardData?.total_pemasukan || 0;
  const totalSelesai = dashboardData?.total_selesai || 0;
  const pesananAktif = dashboardData?.pesanan_aktif || [];

  return (
    <div className='min-h-screen bg-[#F4F9FF] flex flex-col justify-between'>
      <Navbar variant='minimal'/>

      {/* HEADER MERCHANDISE BANNER */}
      <div className='bg-gradient-to-r from-emerald-600 to-teal-700 py-10 md:py-16 px-6 relative overflow-hidden shadow-inner'>
        <div className='max-w-5xl mx-auto relative z-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6'>
          <div>
            <div className='inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-xs'>
              <Store size={14} /> Panel Utama Penjual
            </div>
            <h1 className='text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight'>
              {shopName}
            </h1>
            <p className='text-sm opacity-90 font-medium mt-1 max-w-md'>
              Kelola pesanan masuk, daftar menu kuliner, dan pantau omzet jualan dengan mudah.
            </p>
          </div>
          <button 
            onClick={() => loadDashboardData(false)}
            className='p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all self-start md:self-center text-white border border-white/10'
            title="Refresh Data"
          >
            <RefreshCw size={20} className={isProcessingAction ? 'animate-spin' : ''} />
          </button>
        </div>
        <Store className='absolute right-[-30px] bottom-[-30px] text-white/5 w-64 h-64 -rotate-12' />
      </div>

      <main className='max-w-5xl mx-auto w-full py-8 px-4 md:px-6 flex-grow space-y-8'>
        
        {errorText && (
          <div className='p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-bold text-center'>
            {errorText}
          </div>
        )}

        {/* 📊 RINGKASAN METRIK BISNIS TOKO */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6'>
          {/* Card Total Pemasukan */}
          <div className='bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between group hover:border-emerald-200 transition-all'>
            <div className='space-y-1'>
              <p className='text-xs font-black text-slate-400 uppercase tracking-widest'>Total Pemasukan</p>
              <h3 className='text-2xl md:text-3xl font-black text-slate-800 tracking-tight'>
                Rp {Number(totalPemasukan).toLocaleString('id-ID')}
              </h3>
            </div>
            <div className='w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-all'>
              <Wallet size={26} />
            </div>
          </div>

          {/* Card Pesanan Selesai */}
          <div className='bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between group hover:border-blue-200 transition-all'>
            <div className='space-y-1'>
              <p className='text-xs font-black text-slate-400 uppercase tracking-widest'>Pesanan Selesai</p>
              <h3 className='text-2xl md:text-3xl font-black text-slate-800 tracking-tight'>
                {totalSelesai} <span className='text-sm text-slate-400 font-bold tracking-normal'>Transaksi</span>
              </h3>
            </div>
            <div className='w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-all'>
              <CheckCircle2 size={26} />
            </div>
          </div>
        </div>

        {/* 🕹️ GRID TOMBOL NAVIGASI CEPAT (Daftar Aksi Penjual) */}
        <div className='bg-white rounded-3xl p-6 border border-slate-100 shadow-xs'>
          <h2 className='text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2'>
            <span>Menu Manajemen Toko</span>
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3'>
            <button 
              onClick={() => navigate('/pesanan-aktif')} 
              className='flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-2xl border border-slate-200/60 hover:border-emerald-200 transition-all font-bold text-xs'
            >
              <Clock size={20} className='text-emerald-600' />
              <span>Pesanan Aktif</span>
            </button>

            <button 
              onClick={() => navigate('/pesanan-aktif')} 
              className='flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-2xl border border-slate-200/60 hover:border-blue-200 transition-all font-bold text-xs'
            >
              <CheckCircle2 size={20} className='text-blue-600' />
              <span>Pesanan Selesai</span>
            </button>

            <button 
              onClick={() => navigate('/list-chat')} 
              className='flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-2xl border border-slate-200/60 hover:border-amber-200 transition-all font-bold text-xs'
            >
              <MessageSquare size={20} className='text-amber-500' />
              <span>Daftar Chat</span>
            </button>

            <button 
              onClick={() => navigate('/edit-menu')} 
              className='flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-700 rounded-2xl border border-slate-200/60 hover:border-orange-200 transition-all font-bold text-xs'
            >
              <Utensils size={20} className='text-[#FF6B35]' />
              <span>Edit Menu</span>
            </button>

            <button 
              onClick={() => navigate('/profil-penjual')} 
              className='flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 rounded-2xl border border-slate-200/60 hover:border-purple-200 transition-all font-bold text-xs col-span-2 sm:col-span-1'
            >
              <User size={20} className='text-purple-600' />
              <span>Lihat Profil</span>
            </button>
          </div>
        </div>

        {/* 📋 DAFTAR ANTRIAN PESANAN MASUK */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between px-1'>
            <h2 className='text-base font-black text-slate-800 uppercase tracking-tight flex items-center gap-2'>
              <Clock size={18} className='text-emerald-600 animate-pulse' />
              <span>Antrean Pesanan Masuk ({pesananAktif.length})</span>
            </h2>
            <button 
              onClick={() => navigate('/pesanan-aktif')} 
              className='text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 group'
            >
              <span>Lihat Semua</span>
              <ChevronRight size={14} className='group-hover:translate-x-0.5 transition-all' />
            </button>
          </div>

          {pesananAktif.length > 0 ? (
            <div className='grid grid-cols-1 gap-4'>
              {pesananAktif.map((order) => (
                <div 
                  key={order.order_id} 
                  className='bg-white rounded-3xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4'
                >
                  <div className='space-y-2 flex-grow'>
                    <div className='flex items-center gap-3'>
                      <span className='bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider'>
                        #{order.order_id}
                      </span>
                      <span className='bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider border border-emerald-100'>
                        {order.status_pembayaran}
                      </span>
                      <span className='text-[11px] text-slate-400 font-medium'>
                        {new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div>
                      <h4 className='text-sm font-black text-slate-800 leading-tight mb-0.5'>
                        Pelanggan: {order.nama_pembeli}
                      </h4>
                      <p className='text-xs text-slate-500 font-semibold'>
                        Total Pembayaran: <span className='text-emerald-600 font-extrabold'>Rp {Number(order.total_harga).toLocaleString('id-ID')}</span>
                      </p>
                    </div>
                  </div>

                  {/* Tombol Aksi Penyelesaian Langsung */}
                  <div className='flex items-center justify-end border-t border-dashed border-slate-50 pt-3 sm:pt-0 sm:border-none flex-shrink-0'>
                    <button
                      type='button'
                      disabled={isProcessingAction}
                      onClick={() => handleSelesaikanPesanan(order.order_id)}
                      className='w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black rounded-xl uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-emerald-50'
                    >
                      Selesaikan Masakan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-16 bg-white rounded-[32px] border-2 border-dashed border-slate-200 p-6'>
              <div className='w-14 h-14 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-3'>
                <Utensils size={24} />
              </div>
              <p className='text-slate-400 font-bold text-sm'>Dapur Kosong.</p>
              <p className='text-slate-400 text-xs mt-0.5'>Belum ada antrean pesanan baru saat ini.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPenjual;