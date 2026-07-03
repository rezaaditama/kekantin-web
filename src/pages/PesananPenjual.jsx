import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle2, 
  Loader2, 
  Utensils, 
  ChevronLeft, 
  RefreshCw,
  User,
  Calendar,
  AlertCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getPesananAktif, getRiwayatPenjualan, updateStatusSelesai } from '../services/penjualService';

const PesananPenjual = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('aktif'); // 'aktif' atau 'selesai'
  const [pesananAktif, setPesananAktif] = useState([]);
  const [riwayatSelesai, setRiwayatSelesai] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorText, setErrorText] = useState('');

  const getUserIdFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser.user_id ? Number(parsedUser.user_id) : null;
      } catch (e) {
        console.error("Gagal membaca session user:", e);
        return null;
      }
    }
    return null;
  };

  const userId = getUserIdFromStorage();

  const fetchOrderData = async (showLoading = true) => {
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      if (showLoading) setIsLoading(true);
      setErrorText('');

      if (activeTab === 'aktif') {
        const dataAktif = await getPesananAktif(userId);
        setPesananAktif(dataAktif);
      } else {
        const dataSelesai = await getRiwayatPenjualan(userId);
        setRiwayatSelesai(dataSelesai);
      }
    } catch (error) {
      console.error(error);
      setErrorText('Gagal mengambil data pesanan dari server.');
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData(true);
  }, [userId, activeTab]);

  const handleSelesaikanPesanan = async (orderId) => {
    if (!orderId || isProcessing) return;
    if (!window.confirm(`Selesaikan pesanan #${orderId}? Pembeli akan diberitahu bahwa makanan siap diambil.`)) return;

    try {
      setIsProcessing(true);
      await updateStatusSelesai(orderId);
      await fetchOrderData(false);
    } catch (error) {
      alert(error || 'Gagal menyelesaikan pesanan.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#F4F9FF] flex flex-col justify-between'>
      <Navbar variant='clean'/>

      <main className='max-w-4xl mx-auto w-full py-8 px-4 md:px-6 flex-grow space-y-6'>
        
        {/* Header Section */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <button 
              onClick={() => navigate('/dashboard-penjual')}
              className='p-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-2xl border border-slate-200 shadow-xs transition-all active:scale-95'
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className='text-2xl font-black text-slate-800 uppercase tracking-tight'>Manajemen Pesanan</h1>
              <p className='text-xs text-slate-500 font-medium'>Proses antrean masakan aktif dan cek riwayat transaksi toko.</p>
            </div>
          </div>

          <button
            onClick={() => fetchOrderData(false)}
            disabled={isLoading || isProcessing}
            className='inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-xs transition-all active:scale-95 self-start sm:self-center'
          >
            <RefreshCw size={14} className={`${isLoading || isProcessing ? 'animate-spin' : ''}`} />
            <span>Sinkron Data</span>
          </button>
        </div>

        {/* 🗂️ TAB NAVIGATION (Orange 500 & Hijau Tua) */}
        <div className='bg-white p-1.5 rounded-2xl border border-slate-200/60 shadow-xs grid grid-cols-2 gap-1'>
          <button
            onClick={() => setActiveTab('aktif')}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
              activeTab === 'aktif' 
                ? 'bg-orange-500 text-white shadow-md shadow-orange-100' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Clock size={16} />
            <span>Pesanan Aktif ({pesananAktif.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('selesai')}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
              activeTab === 'selesai' 
                ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 size={16} />
            <span>Riwayat Selesai</span>
          </button>
        </div>

        {errorText && (
          <div className='p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-bold text-center'>
            {errorText}
          </div>
        )}

        {/* 📦 CONTENT BODY */}
        {isLoading ? (
          <div className='flex flex-col items-center justify-center py-24 text-slate-400'>
            <Loader2 className='w-10 h-10 animate-spin mb-3 text-orange-500' />
            <p className='font-black uppercase tracking-widest text-[10px] text-slate-500'>Menghubungkan ke Dapur...</p>
          </div>
        ) : activeTab === 'aktif' ? (
          /* ======================== TAB PESANAN AKTIF ======================== */
          pesananAktif.length > 0 ? (
            <div className='space-y-4'>
              {pesananAktif.map((order) => (
                <div key={order.order_id} className='bg-white rounded-3xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all space-y-4'>
                  <div className='flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-dashed border-slate-100'>
                    <div className='flex items-center gap-2.5'>
                      <span className='bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider'>
                        #{order.order_id}
                      </span>
                      <span className='inline-flex items-center gap-1 text-xs font-bold text-slate-700'>
                        <User size={14} className='text-slate-400' /> {order.nama_pembeli}
                      </span>
                    </div>
                    <span className='text-[11px] text-slate-400 font-medium flex items-center gap-1'>
                      <Clock size={12} /> {new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Rincian Menu Pesanan */}
                  <div className='bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-3'>
                    <div>
                      <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1'>Item Masakan:</p>
                      <p className='text-sm text-slate-800 font-bold whitespace-pre-line leading-relaxed'>
                        {order.rincian_menu}
                      </p>
                    </div>

                    {/* 📝 NOTES / CATATAN PEMBELI */}
                    {order.catatan_pesanan ? (
                      <div className='pt-2.5 border-t border-slate-200/60 flex items-start gap-2 text-amber-700 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100'>
                        <AlertCircle size={15} className='mt-0.5 flex-shrink-0 text-amber-600' />
                        <div>
                          <p className='text-[10px] font-black uppercase tracking-wider text-amber-800/80'>Catatan Pembeli:</p>
                          <p className='text-xs font-bold leading-relaxed'>{order.catatan_pesanan}</p>
                        </div>
                      </div>
                    ) : (
                      <div className='pt-2.5 border-t border-slate-200/60 text-slate-400 text-xs italic font-medium'>
                        Tidak ada catatan khusus dari pembeli.
                      </div>
                    )}
                  </div>

                  <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1'>
                    <div>
                      <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Total Dibayar</p>
                      <p className='text-base font-black text-emerald-800'>
                        Rp {Number(order.total_harga).toLocaleString('id-ID')}
                      </p>
                    </div>
                    
                    <button
                      type='button'
                      disabled={isProcessing}
                      onClick={() => handleSelesaikanPesanan(order.order_id)}
                      className='px-6 py-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-black rounded-xl uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-emerald-900/10'
                    >
                      Selesaikan Masakan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200 p-6'>
              <Utensils size={32} className='text-slate-300 mx-auto mb-3' />
              <p className='text-slate-400 font-bold text-sm'>Dapur Bersih!</p>
              <p className='text-slate-400 text-xs mt-0.5'>Belum ada antrean pesanan baru untuk dimasak.</p>
            </div>
          )
        ) : (
          /* ======================== TAB RIWAYAT SELESAI ======================== */
          riwayatSelesai.length > 0 ? (
            <div className='space-y-4'>
              {riwayatSelesai.map((order) => (
                <div key={order.order_id} className='bg-white rounded-3xl p-5 border border-slate-100 shadow-xs hover:border-emerald-100 transition-all grid grid-cols-1 sm:grid-cols-3 gap-4 items-center'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <span className='bg-emerald-50 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-100'>
                        #{order.order_id}
                      </span>
                      <span className='bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider'>
                        {order.payment_method || 'QRIS'}
                      </span>
                    </div>
                    <h4 className='text-sm font-black text-slate-800 tracking-tight truncate'>
                      {order.nama_pembeli}
                    </h4>
                  </div>

                  <div className='space-y-0.5 text-left sm:text-center'>
                    <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest block'>Waktu Ambil</span>
                    <span className='text-xs font-bold text-slate-700 inline-flex items-center gap-1'>
                      <Calendar size={13} className='text-slate-400' /> {order.pickup_time || 'Langsung'}
                    </span>
                  </div>

                  <div className='text-left sm:text-right flex items-center sm:justify-end justify-between border-t border-dashed border-slate-100 sm:border-none pt-3 sm:pt-0'>
                    <div className='sm:block hidden'>
                      <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest block'>Dana Masuk</span>
                      <span className='text-sm font-black text-slate-800'>
                        Rp {Number(order.total_harga).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className='sm:hidden flex items-center justify-between w-full'>
                      <span className='text-xs font-bold text-slate-500'>Total Omzet:</span>
                      <span className='text-sm font-black text-slate-800'>Rp {Number(order.total_harga).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200 p-6'>
              <CheckCircle2 size={32} className='text-slate-300 mx-auto mb-3' />
              <p className='text-slate-400 font-bold text-sm'>Belum Ada Riwayat.</p>
              <p className='text-slate-400 text-xs mt-0.5'>Transaksi jualan lapak Anda yang berhasil diselesaikan akan muncul disini.</p>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PesananPenjual;