import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Store, 
  Mail, 
  Phone, 
  ChevronLeft, 
  Edit3,
  Save, 
  X,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getBerandaPenjual, updateProfilePenjual } from '../services/penjualService';

const ProfilPenjual = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditable, setIsEditable] = useState(false); // State untuk mengunci/membuka form
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Backup data asli jika user membatalkan edit
  const [originalData, setOriginalData] = useState(null);

  // Form State disesuaikan dengan field tabel 'users' & 'toko' di image_dd7064.png
  const [formData, setFormData] = useState({
    id: '',
    nama_lengkap: '',
    email: '',
    nomor_telepon: '',
    shop_name: ''
  });

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

  const fetchProfilData = async () => {
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      const response = await getBerandaPenjual(userId);
      
      if (response && response.toko) {
        const profileData = {
          id: response.toko.user_id || userId,
          nama_lengkap: response.toko.nama_lengkap || '', 
          email: response.toko.email || '',
          nomor_telepon: response.toko.nomor_telepon || '',
          shop_name: response.toko.shop_name || ''
        };
        setFormData(profileData);
        setOriginalData(profileData);
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Gagal mengambil data profil dari server.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfilData();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData); // Kembalikan ke data semula
    }
    setIsEditable(false);
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    try {
      setIsSaving(true);
      setMessage({ type: '', text: '' });
      
      const response = await updateProfilePenjual(formData);
      setMessage({ type: 'success', text: response.message || 'Profil berhasil diperbarui!' });
      
      // Update data backup & sync localStorage
      setOriginalData(formData);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.nama_lengkap = formData.nama_lengkap;
        localStorage.setItem('user', JSON.stringify(parsedUser));
      }
      
      // Kunci kembali form setelah berhasil
      setIsEditable(false);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: error || 'Gagal memperbarui profil.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#F4F9FF] flex flex-col justify-between'>
      <Navbar variant='clean'/>

      <main className='max-w-2xl mx-auto w-full py-8 px-4 md:px-6 flex-grow space-y-6'>
        
        {/* Header Section */}
        <div className='flex items-center gap-3'>
          <button 
            onClick={() => navigate('/dashboard-penjual')}
            className='p-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-2xl border border-slate-200 shadow-xs transition-all active:scale-95'
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className='text-2xl font-black text-slate-800 uppercase tracking-tight'>Profil Toko & Penjual</h1>
            <p className='text-xs text-slate-500 font-medium'>Kelola informasi identitas akun pribadi dan nama lapak kuliner Anda.</p>
          </div>
        </div>

        {/* Notifikasi Message */}
        {message.text && (
          <div className={`p-4 rounded-2xl text-sm font-bold flex items-center gap-2 border ${
            message.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border-red-200 text-red-600'
          }`}>
            {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        {isLoading ? (
          <div className='flex flex-col items-center justify-center py-20 text-slate-400'>
            <Loader2 className='w-10 h-10 animate-spin mb-3 text-orange-500' />
            <p className='font-black uppercase tracking-widest text-[10px] text-slate-500'>Mengambil Berkas Profil...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5'>
            
            {/* Bagian Atas: Avatar & Preview Nama Toko */}
            <div className='flex flex-col items-center justify-center pb-5 border-b border-dashed border-slate-100 text-center space-y-2'>
              <div className='w-20 h-20 rounded-3xl bg-orange-50 text-orange-500 border border-orange-200 flex items-center justify-center shadow-md shadow-orange-100'>
                <Store size={36} />
              </div>
              <div>
                <h3 className='text-lg font-black text-slate-800 uppercase tracking-tight'>{formData.shop_name || 'Lapak Kuliner'}</h3>
                <p className='text-xs text-slate-400 font-semibold'>{formData.nama_lengkap || 'Nama Pemilik'}</p>
              </div>
            </div>

            {/* Input 1: Nama Lapak Toko (toko.shop_name) */}
            <div className='space-y-1.5'>
              <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block'>Nama Lapak / Toko</label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400'>
                  <Store size={16} />
                </span>
                <input
                  type='text'
                  name='shop_name'
                  required
                  disabled={!isEditable}
                  value={formData.shop_name}
                  onChange={handleChange}
                  placeholder='Masukkan nama lapak kantin'
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-bold text-slate-800 outline-hidden transition-all ${
                    isEditable 
                      ? 'bg-white border-orange-500 ring-1 ring-orange-500 focus:bg-white' 
                      : 'bg-slate-100/70 border-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Input 2: Nama Lengkap Pemilik (users.nama_lengkap) */}
            <div className='space-y-1.5'>
              <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block'>Nama Lengkap Pemilik</label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400'>
                  <User size={16} />
                </span>
                <input
                  type='text'
                  name='nama_lengkap'
                  required
                  disabled={!isEditable}
                  value={formData.nama_lengkap}
                  onChange={handleChange}
                  placeholder='Nama lengkap pemilik akun'
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-bold text-slate-800 outline-hidden transition-all ${
                    isEditable 
                      ? 'bg-white border-orange-500 ring-1 ring-orange-500 focus:bg-white' 
                      : 'bg-slate-100/70 border-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Input 3: Email (users.email) */}
            <div className='space-y-1.5'>
              <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block'>Alamat Email</label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400'>
                  <Mail size={16} />
                </span>
                <input
                  type='email'
                  name='email'
                  required
                  disabled={!isEditable}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Alamat email aktif'
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-bold text-slate-800 outline-hidden transition-all ${
                    isEditable 
                      ? 'bg-white border-orange-500 ring-1 ring-orange-500 focus:bg-white' 
                      : 'bg-slate-100/70 border-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Input 4: Nomor Telepon / WhatsApp (users.nomor_telepon) */}
            <div className='space-y-1.5'>
              <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block'>Nomor Telepon / WhatsApp</label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400'>
                  <Phone size={16} />
                </span>
                <input
                  type='text'
                  name='nomor_telepon'
                  required
                  disabled={!isEditable}
                  value={formData.nomor_telepon}
                  onChange={handleChange}
                  placeholder='Contoh: 0812XXXXXXXX'
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-bold text-slate-800 outline-hidden transition-all ${
                    isEditable 
                      ? 'bg-white border-orange-500 ring-1 ring-orange-500 focus:bg-white' 
                      : 'bg-slate-100/70 border-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Panel Aksi Dinamis di Bagian Bawah */}
            <div className='pt-2 flex gap-3'>
              {!isEditable ? (
                // MODE LOCK: Menampilkan tombol untuk memicu edit mode (Aksen Orange)
                <button
                  type='button'
                  onClick={() => setIsEditable(true)}
                  className='w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md shadow-orange-500/10'
                >
                  <Edit3 size={16} />
                  <span>Ubah Data Profil</span>
                </button>
              ) : (
                // MODE EDIT: Menampilkan tombol Batal dan Simpan Perubahan (Hijau Tua)
                <>
                  <button
                    type='button'
                    onClick={handleCancel}
                    className='px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-black rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-98'
                  >
                    <X size={16} />
                    <span>Batal</span>
                  </button>

                  <button
                    type='submit'
                    disabled={isSaving}
                    className='flex-grow py-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-black rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md shadow-emerald-900/10'
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={16} className='animate-spin' />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Simpan Perubahan Profil</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProfilPenjual;