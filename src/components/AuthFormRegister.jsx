import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormRegister = ({ handleSubmit, errorMessage, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    nomor_telepon: '',
    password: '',
    confirmPassword: '',
    role: 'pembeli',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    const { confirmPassword, ...dataToSubmit } = formData;
    handleSubmit(dataToSubmit);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <main className='flex-1 flex items-center justify-center p-8'>
      <div className='w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl'>
        <h2 className='text-3xl font-bold mb-2 text-gray-800'>
          Buat Akun Baru
        </h2>

        <p className='text-gray-500 mb-8 text-sm'>
          Buat akunmu sekarang dan jadi bagian dari kantin digital kampus.
        </p>

        {/* FORM */}
        <form onSubmit={onSubmit} className='space-y-4'>
          <div>
            <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-1'>
              Nama Lengkap
            </label>
            <input
              type='text'
              name='nama_lengkap'
              required
              onChange={handleChange}
              placeholder='Reza Aditama'
              className='w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none'
            />
          </div>

          <div>
            <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-1'>
              Email
            </label>
            <input
              type='email'
              name='email'
              required
              onChange={handleChange}
              placeholder='name@email.com'
              className='w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none'
            />
          </div>

          <div>
            <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-1'>
              Nomor HP
            </label>
            <input
              type='tel'
              name='nomor_telepon'
              required
              onChange={handleChange}
              placeholder='0812xxxxxxx'
              className='w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none'
            />
          </div>

          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-1'>
                Password
              </label>
              <input
                type='password'
                name='password'
                required
                onChange={handleChange}
                className='w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none'
              />
            </div>
            <div>
              <label className='block text-xs font-black text-gray-400 uppercase tracking-widest mb-1'>
                Konfirmasi
              </label>
              <input
                type='password'
                name='confirmPassword'
                required
                onChange={handleChange}
                className='w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none'
              />
            </div>
          </div>

          {errorMessage && (
            <p className='text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100 italic'>
              ⚠ {errorMessage}
            </p>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className={`w-full py-4 bg-orange-500 text-white font-black uppercase tracking-widest rounded-full shadow-lg shadow-orange-100 transition-all ${
              isLoading ? 'opacity-50' : 'hover:bg-orange-600'
            }`}
          >
            {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className='text-center text-gray-500 mt-6 text-sm'>
          Sudah memiliki akun?
          <span
            onClick={() => navigate('/login')}
            className='text-orange-500 ml-1 cursor-pointer font-black hover:underline'
          >
            Masuk di sini
          </span>
        </p>
      </div>
    </main>
  );
};

export default FormRegister;
