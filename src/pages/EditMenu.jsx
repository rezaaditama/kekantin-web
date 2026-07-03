import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Utensils, 
  Edit2, 
  Save, 
  X, 
  Loader2, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getBerandaPenjual } from '../services/penjualService';
// Asumsi service diimpor dari menuService atau penjualService Anda
import { getMenuByShop, updateMenuData } from '../services/menuService'; 

const EditMenu = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [menus, setMenus] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedMenu, setSelectedMenu] = useState(null);

  const getUserIdFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser.user_id ? Number(parsedUser.user_id) : null;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const userId = getUserIdFromStorage();

  const loadInitialData = async () => {
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      const sellerInfo = await getBerandaPenjual(userId);
      if (sellerInfo && sellerInfo.toko) {
        const currentShopId = sellerInfo.toko.shop_id;
        
        // Mengambil daftar menu berdasarkan shop_id relasi schema
        const menuList = await getMenuByShop(currentShopId);
        setMenus(menuList);
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Gagal memuat daftar menu kuliner.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [userId]);

  const handleEditClick = (menu) => {
    setSelectedMenu({ ...menu });
    setMessage({ type: '', text: '' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedMenu(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (isSaving || !selectedMenu) return;

    try {
      setIsSaving(true);
      // Mengirimkan payload objek berisi: product_id, product_name, product_price
      await updateMenuData(selectedMenu);
      setMessage({ type: 'success', text: 'Menu jualan berhasil diperbarui!' });
      
      setSelectedMenu(null);
      await loadInitialData(); // Refresh data dari database
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: error || 'Gagal menyimpan perubahan menu.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#F4F9FF] flex flex-col justify-between'>
      <Navbar variant='clean'/>

      <main className='max-w-4xl mx-auto w-full py-8 px-4 md:px-6 flex-grow space-y-6'>
        
        {/* Tombol Kembali & Judul */}
        <div className='flex items-center gap-3'>
          <button 
            onClick={() => navigate('/dashboard-penjual')}
            className='p-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-2xl border border-slate-200 shadow-xs transition-all active:scale-95'
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className='text-2xl font-black text-slate-800 uppercase tracking-tight'>Kelola Menu Kuliner</h1>
            <p className='text-xs text-slate-500 font-medium'>Lihat etalase menu jualan dan sesuaikan informasi harga hidangan kantin.</p>
          </div>
        </div>

        {/* Banner Alert Status */}
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
            <Loader2 className='w-10 h-10 animate-spin mb-3 text-emerald-600' />
            <p className='font-black uppercase tracking-widest text-[10px] text-slate-500'>Memuat data dari database...</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
            
            {/* TAMPILAN VIEW UTAMA: DAFTAR MENU */}
            <div className='md:col-span-2 space-y-3 max-h-[65vh] overflow-y-auto pr-1'>
              {menus.length > 0 ? (
                menus.map((item) => (
                  <div 
                    key={item.product_id}
                    className={`bg-white p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      selectedMenu?.product_id === item.product_id ? 'border-emerald-600 ring-1 ring-emerald-600' : 'border-slate-100'
                    }`}
                  >
                    <div className='flex items-center gap-3.5'>
                      <div className='w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center'>
                        <Utensils size={22} />
                      </div>
                      <div>
                        {/* Menampilkan product_name dari database */}
                        <h4 className='text-sm font-black text-slate-800 tracking-tight'>
                          {item.product_name}
                        </h4>
                        {/* Menampilkan product_price dari database */}
                        <p className='text-xs text-emerald-600 font-extrabold'>
                          Rp {Number(item.product_price).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {/* Tombol Aksi untuk memicu Form Edit */}
                    <button
                      type='button'
                      onClick={() => handleEditClick(item)}
                      className='p-2 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-500 rounded-xl transition-all border border-slate-100 active:scale-95 flex items-center gap-1.5 text-xs font-bold'
                    >
                      <Edit2 size={14} />
                      <span>Ubah</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className='text-center py-12 bg-white rounded-2xl border border-slate-100 p-4 text-slate-400 text-xs font-bold'>
                  Belum ada hidangan kuliner yang terdaftar di toko ini.
                </div>
              )}
            </div>

            {/* FORM AKSES EDIT DI SISI KANAN */}
            <div className='md:col-span-1'>
              {selectedMenu ? (
                <form onSubmit={handleUpdateSubmit} className='bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4'>
                  <div className='flex items-center justify-between border-b border-slate-50 pb-2.5'>
                    <h3 className='text-xs font-black text-slate-800 uppercase tracking-wider'>Form Edit Menu</h3>
                    <button 
                      type='button' 
                      onClick={() => setSelectedMenu(null)}
                      className='p-1 text-slate-400 hover:bg-slate-50 rounded-lg'
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Input Bind ke product_name */}
                  <div className='space-y-1'>
                    <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block'>Nama Makanan / Minuman</label>
                    <input
                      type='text'
                      name='product_name'
                      required
                      value={selectedMenu.product_name}
                      onChange={handleFormChange}
                      className='w-full px-3 py-2 border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-emerald-600 rounded-xl text-sm font-bold text-slate-800 outline-hidden transition-all'
                    />
                  </div>

                  {/* Input Bind ke product_price */}
                  <div className='space-y-1'>
                    <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block'>Harga Jual Menu (Rp)</label>
                    <input
                      type='number'
                      name='product_price'
                      required
                      value={selectedMenu.product_price}
                      onChange={handleFormChange}
                      className='w-full px-3 py-2 border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-emerald-600 rounded-xl text-sm font-bold text-slate-800 outline-hidden transition-all'
                    />
                  </div>

                  {/* Tombol Simpan Perubahan */}
                  <button
                    type='submit'
                    disabled={isSaving}
                    className='w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-98 shadow-xs'
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={14} className='animate-spin' />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Simpan Menu</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className='bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-3xl text-center text-slate-400'>
                  <Utensils size={24} className='mx-auto mb-2 text-slate-300' />
                  <p className='text-xs font-bold leading-normal'>Klik tombol <b>Ubah</b> pada item menu di sebelah kiri untuk mengedit.</p>
                </div>
              )}
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EditMenu;