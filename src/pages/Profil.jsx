import { Mail, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import foto from '../assets/profile.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

const Profil = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user dari localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <>
      {/* NAVBAR (PINDAH KE ATAS) */}
      <Navbar variant='clean' />

      {/* WRAPPER UTAMA */}
      <div className='min-h-screen flex flex-col bg-gray-50"'>
        {/* CONTENT */}
        <div className='flex-grow p-6'>
          <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-6'>
            {/* LEFT CARD */}
            <div className='bg-white rounded-xl shadow p-6 text-center'>
              <div className='relative w-28 h-28 mx-auto'>
                <img
                  src={foto}
                  alt='profile'
                  className='w-28 h-28 rounded-full object-cover border-4 border-orange-100'
                />
              </div>

              <h2 className='mt-4 font-bold text-xl text-gray-800'>
                {user.nama || 'User'}
              </h2>
              <p className='text-sm text-gray-500 capitalize'>Mahasiswa UIKA</p>

              <div className='space-y-3 mt-6'>
                <div className='bg-gray-50 p-3 rounded-xl text-left flex items-center gap-3 border border-gray-100'>
                  <Mail className='text-orange-500 w-5 h-5' />
                  <div>
                    <p className='text-[10px] font-black text-gray-400 uppercase'>
                      Email
                    </p>
                    <p className='text-sm font-medium'>{user.email}</p>
                  </div>
                </div>

                <div className='bg-gray-50 p-3 rounded-xl text-left flex items-center gap-3 border border-gray-100'>
                  <Phone className='text-orange-500 w-5 h-5' />
                  <div>
                    <p className='text-[10px] font-black text-gray-400 uppercase'>
                      TELEPON
                    </p>
                    <p className='text-sm font-medium'>{user.nomor_telepon}</p>
                  </div>
                </div>
              </div>

              <Link to='/edit-profile'>
                <button className='mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-200'>
                  Edit Profil
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className='mt-4 border bg-red-500 flex items-center justify-center gap-2 w-full text-white text-sm font-bold hover:bg-red-700 py-3 rounded-xl transition-colors'
              >
                Keluar
              </button>
            </div>

            {/* RIGHT CONTENT */}
            <div className='md:col-span-2 bg-white rounded-xl shadow p-8'>
              <h2 className='text-xl font-black mb-6 flex items-center gap-2 text-gray-800'>
                🍴 Tentang Kantin Digital
              </h2>

              <p className='text-sm text-gray-600 leading-relaxed'>
                Ke.Kantin adalah masa depan kuliner kampus...
              </p>

              <div className='grid md:grid-cols-2 gap-6 mt-6'>
                <div>
                  <h3 className='font-semibold text-sm mb-1'>
                    🚀 Modern & Cepat
                  </h3>
                  <p className='text-sm text-gray-500'>
                    Pesan makanan favoritmu...
                  </p>
                </div>

                <div>
                  <h3 className='font-semibold text-sm mb-1'>
                    🔗 Solusi Terintegrasi
                  </h3>
                  <p className='text-sm text-gray-500'>
                    Pantau status pesanan...
                  </p>
                </div>
              </div>

              <p className='text-xs text-gray-400 mt-6 italic'>
                “Misi kami adalah mendefinisikan kembali...”
              </p>

              <div className='flex gap-3 mt-4'>
                <span className='bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full'>
                  ✔ Visi 2024
                </span>
                <span className='bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full'>
                  50+ Stall Mitra
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* FOOTER (PINDAH KE BAWAH) */}
        <Footer />
      </div>
    </>
  );
};

export default Profil;
