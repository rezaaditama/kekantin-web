import { Book, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const KeKantinLanding = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/manual-guide');
  };

  return (
    <div className='min-h-screen font-sans text-slate-900 leading-relaxed flex flex-col'>
      {/* Navbar */}
      <Navbar variant='clean'></Navbar>

      {/* Hero Section */}
      <main className='max-w-7xl mx-auto px-6 lg:px-12 pt-8 md:pt-16 pb-20 flex-grow'>
        <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
          {/* Content Left (Sekarang muncul PERTAMA di mobile) */}
          <div className='flex-1 text-center lg:text-left order-1'>
            <div className='inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#F26522] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border border-orange-100'>
              Universitas Ibn Khaldun Bogor
            </div>

            <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight'>
              Kantin Kampus, <br />
              <span className='text-[#F26522]'>Sekarang Lebih Digital.</span>
            </h1>

            <p className='text-slate-500 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed'>
              Platform digital yang memudahkan anda untuk menemukan makanan
              favorit di kantin kampus dengan cepat dan praktis. Jelajahi
              berbagai pilihan menu dari berbagai tenant dan nikmati pengalaman
              memesan makanan yang lebih mudah.
            </p>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'>
              <button
                onClick={handleLogin}
                className='w-full sm:w-auto bg-[#F26522] hover:bg-[#d9541a] text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-orange-200'
              >
                <LogIn className='w-5 h-5' />
                Masuk
              </button>

              <button
                onClick={handleRegister}
                className='w-full sm:w-auto border-2 border-slate-100 bg-white hover:bg-slate-50 text-slate-700 px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-sm'
              >
                <Book className='w-5 h-5 text-[#F26522]' />
                Panduan
              </button>
            </div>
          </div>

          {/* Image Right (Sekarang muncul KEDUA di mobile) */}
          <div className='flex-1 order-2 w-full max-w-[450px] lg:max-w-none'>
            <div className='relative group'>
              <div className='absolute -inset-4 bg-orange-100 rounded-[3rem] blur-2xl opacity-60'></div>

              <div className='relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl border-[6px] md:border-[10px] border-white'>
                <img
                  src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000'
                  alt='Healthy Food UIKA'
                  className='w-full aspect-[4/3] object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40'></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KeKantinLanding;
