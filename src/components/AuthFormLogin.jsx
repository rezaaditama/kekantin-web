import { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthFormLogin = ({ handleSubmit, errorMessage, isLoading }) => {
  // Initial state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Kirim data ke parent
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };
  return (
    <div className='flex-1 flex items-center justify-center p-8'>
      <div className='w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl'>
        <h2 className='text-3xl font-bold mb-2 text-center'>
          Selamat Datang Kembali
        </h2>

        <p className='text-gray-500 mb-8 text-center'>
          Silakan masuk ke akun Anda untuk melanjutkan
        </p>

        {/* FORM */}
        <form onSubmit={onSubmit} className='space-y-5'>
          <div>
            <label className='block font-semibold mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='nama@email.com'
              required
              className='w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
          </div>

          <div>
            <div className='flex justify-between mb-1'>
              <label className='font-semibold'>Kata Sandi</label>
            </div>

            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='••••••••'
              required
              className='w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
          </div>

          {/* Kalau error */}
          {errorMessage && (
            <div className='bg-red-50 border text-center border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium animate-pulse'>
              {errorMessage}
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className={`w-full py-3 bg-orange-500 text-white font-bold rounded-full transition ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-orange-600'
            }`}
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className='text-center mt-8 text-gray-500'>
          Belum punya akun?
          <Link
            to='/register'
            className='text-orange-500 ml-1 cursor-pointer font-semibold hover:underline'
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthFormLogin;
