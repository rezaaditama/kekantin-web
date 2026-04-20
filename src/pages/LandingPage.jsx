import { UtensilsCrossed, LogIn, UserPlus, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const KeKantinLanding = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className='min-h-screen bg-[#FFFBF7] font-sans text-slate-900 leading-relaxed'>
      {/* Navbar */}
      <nav className='sticky top-0 z-50 bg-[#FFFBF7]/80 backdrop-blur-md'>
        <div className='max-w-7xl mx-auto px-6 lg:px-12 py-5 flex justify-between items-center'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <div className='bg-[#F26522] p-2 rounded-xl shadow-lg shadow-orange-200'>
              <UtensilsCrossed className='text-white w-5 h-5' />
            </div>
            <span className='text-xl font-bold tracking-tight uppercase'>
              ke.<span className='text-[#F26522]'>kantin</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className='max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-20'>
        <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
          {/* Content Left */}
          <div className='flex-1 text-center lg:text-left order-2 lg:order-1'>
            <div className='inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#F26522] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border border-orange-100'>
              Universitas Ibn Khaldun Bogor
            </div>

            <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight'>
              Kantin Kampus, <br />
              <span className='text-[#F26522]'>Sekarang Lebih Digital.</span>
            </h1>

            <p className='text-slate-500 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed'>
              Platform digital yang memudahkan mahasiswa menemukan makanan
              favorit dan membuka toko untuk menjangkau lebih banyak pelanggan.
            </p>

            {/* Action Buttons - Updated to Masuk and Daftar */}
            <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'>
              <button
                onClick={handleLogin}
                className='w-full sm:w-auto bg-[#F26522] hover:bg-[#d9541a] text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-orange-200'
              >
                <LogIn className='w-5 h-5' />
                Masuk
              </button>

              <button
                onClick={handleRegister}
                className='w-full sm:w-auto border-2 border-slate-100 bg-white hover:bg-slate-50 text-slate-700 px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-sm'
              >
                <UserPlus className='w-5 h-5 text-[#F26522]' />
                Daftar
              </button>
            </div>
          </div>

          {/* Image Right */}
          <div className='flex-1 order-1 lg:order-2 w-full max-w-[500px] lg:max-w-none'>
            <div className='relative group'>
              {/* Decorative Background Element */}
              <div className='absolute -inset-4 bg-orange-100 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity'></div>

              <div className='relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl border-[10px] border-white'>
                <img
                  src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000'
                  alt='Healthy Food UIKA'
                  className='w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105'
                />
                {/* Subtle Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40'></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <Footer />
    </div>
  );
};

export default KeKantinLanding;
