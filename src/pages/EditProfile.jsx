import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { updateProfile } from '../services/authService';

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    nama_lengkap: '',
    email: '',
    nomor_telepon: '',
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setFormData({
        id: userData.user_id || userData.id,
        nama_lengkap: userData.nama || userData.nama_lengkap || '',
        email: userData.email || '',
        nomor_telepon: userData.nomor_telepon || '',
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await updateProfile(formData);

      if (response) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const updatedUser = {
          ...currentUser,
          nama: formData.nama_lengkap,
          email: formData.email,
          nomor_telepon: formData.nomor_telepon,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        alert('Profil berhasil diperbarui!');
        navigate('/profil');
      }
    } catch (error) {
      alert(error.message || 'Gagal memperbarui profil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className='pt-10 pb-12 px-4 flex justify-center'>
        <div className='max-w-2xl w-full'>
          {/* BACK */}
          <button
            onClick={() => navigate('/profil')}
            className='mb-6 flex items-center gap-2 text-gray-500 hover:text-orange-500 font-medium'
          >
            ← Kembali ke Profil
          </button>

          {/* CARD HEADER */}
          <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6'>
            <h1 className='text-2xl font-black text-gray-800'>Edit Profil</h1>
            <p className='text-gray-500 text-sm font-medium'>
              Perbarui informasi akun Anda
            </p>
          </div>

          {/* FORM */}
          <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5'>
            {/* Nama */}
            <div>
              <label className='text-xs font-black text-gray-400 uppercase tracking-widest'>
                Nama Lengkap
              </label>
              <input
                type='text'
                name='nama_lengkap'
                value={formData.nama_lengkap}
                onChange={handleChange}
                className='w-full mt-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all'
                placeholder='Masukkan nama lengkap'
              />
            </div>

            {/* Email */}
            <div>
              <label className='text-xs font-black text-gray-400 uppercase tracking-widest'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full mt-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all'
                placeholder='nama@email.com'
              />
            </div>

            {/* Telepon */}
            <div>
              <label className='text-xs font-black text-gray-400 uppercase tracking-widest'>
                Telepon
              </label>
              <input
                type='text'
                name='nomor_telepon'
                value={formData.nomor_telepon}
                onChange={handleChange}
                className='w-full mt-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all'
                placeholder='0812xxxx'
              />
            </div>

            {/* BUTTON */}
            <div className='flex flex-col md:flex-row gap-3 pt-6'>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`flex-1 bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>

              <button
                onClick={() => navigate('/profil')}
                className='flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all'
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
