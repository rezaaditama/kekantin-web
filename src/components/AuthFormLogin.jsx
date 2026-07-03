import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Store } from 'lucide-react';

const AuthFormLogin = ({ handleSubmit, errorMessage, isLoading }) => {
  const [selectedRole, setSelectedRole] = useState('pembeli');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Mengirim objek email, password, bersama role yang sedang aktif ke Login.jsx
    handleSubmit({ ...formData, role: selectedRole });
  };

  return (
    <div className='flex-1 flex items-center justify-center p-8 bg-[#F4F9FF]'>
      <div className='w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-slate-100'>
        <h2 className='text-3xl font-black mb-2 text-center text-slate-800 tracking-tight'>
          Selamat Datang Kembali
        </h2>
        <p className='text-gray-400 mb-6 text-center text-sm font-medium'>
          Silakan masuk ke akun Anda untuk melanjutkan
        </p>

        {/* SWITCH ROLE BUTTONS */}
        <div className='flex bg-slate-100 p-1.5 rounded-xl mb-6 gap-1'>
          <button
            type='button'
            onClick={() => setSelectedRole('pembeli')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              selectedRole === 'pembeli'
                ? 'bg-[#FF6B35] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag size={16} />
            Sebagai Pembeli
          </button>
          <button
            type='button'
            onClick={() => setSelectedRole('penjual')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              selectedRole === 'penjual'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Store size={16} />
            Sebagai Penjual (Dapur)
          </button>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={onSubmit} className='space-y-5'>
          <div>
            <label className='block font-bold text-slate-700 mb-1 text-sm'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='nama@email.com'
              required
              className='w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium'
            />
          </div>

          <div>
            <label className='block font-bold text-slate-700 mb-1 text-sm'>Kata Sandi</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='••••••••'
              required
              className='w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium'
            />
          </div>

          {errorMessage && (
            <div className='bg-red-50 border text-center border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-bold animate-pulse'>
              {errorMessage}
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className={`w-full py-3.5 text-white font-bold rounded-full text-sm transition-all duration-200 ${
              selectedRole === 'penjual'
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100'
                : 'bg-[#FF6B35] hover:bg-[#e05626] shadow-md shadow-orange-100'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Memproses Verifikasi...' : `Masuk Sebagai ${selectedRole === 'pembeli' ? 'Pembeli' : 'Penjual'}`}
          </button>
        </form>

        <p className='text-center mt-8 text-sm text-gray-400 font-medium'>
          Belum punya akun?
          <Link
            to='/register'
            className='text-[#FF6B35] ml-1 font-bold hover:underline'
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthFormLogin;