import { UtensilsCrossed, Home, MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-[#F4F9FF] flex flex-col items-center justify-center p-6 font-sans'>
      <div className='max-w-md w-full text-center'>
        {/* Ilustrasi Icon */}
        <div className='relative mb-8 flex justify-center'>
          <div className='absolute inset-0 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse'></div>
          <div className='relative bg-white p-8 rounded-full shadow-xl border-4 border-white'>
            <UtensilsCrossed size={80} className='text-[#FF6B35]' />
          </div>
          {/* Badge 404 */}
          <div className='absolute bottom-0 right-1/4 bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg tracking-widest'>
            ERROR 404
          </div>
        </div>

        {/* Text Content */}
        <h1 className='text-6xl font-black text-slate-800 mb-2 tracking-tighter'>
          Waduh!
        </h1>
        <h2 className='text-xl font-bold text-slate-700 mb-3'>
          Menu Ini Tidak Ditemukan
        </h2>
        <p className='text-slate-500 mb-10 leading-relaxed text-sm px-4'>
          Sepertinya halaman yang kamu cari sudah habis dipesan atau pindah ke
          meja lain. Yuk, balik lagi ke jalur yang benar!
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          {/* Tombol Kembali */}
          <button
            onClick={() => navigate(-1)}
            className='w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-700 font-bold rounded-2xl border-2 border-slate-100 hover:border-orange-200 hover:bg-orange-50 transition-all shadow-sm'
          >
            <MoveLeft size={18} />
            Kembali
          </button>

          {/* Tombol Beranda - PENTING: Agar user tidak terjebak */}
          <button
            onClick={() => navigate('/dashboard')}
            className='w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-md shadow-orange-100'
          >
            <Home size={18} />
            Ke Beranda
          </button>
        </div>
      </div>

      {/* Dekorasi kecil */}
      <div className='mt-16 flex flex-col items-center gap-2'>
        <div className='h-1 w-10 bg-orange-200 rounded-full'></div>
        <div className='text-slate-300 text-[10px] font-black tracking-[0.2em] uppercase'>
          E-Canteen • Kampus Digital
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
