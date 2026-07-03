import { useState, useEffect } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderCard from '../layouts/OrderCard';
import { getUserOrders } from '../services/orderService';
import { getOrCreateChatRoom } from '../services/chatService';

const OrderStatusPage = () => {
  const [activeTab, setActiveTab] = useState('aktif');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnectingChat, setIsConnectingChat] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const getUserFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser.user_id ? Number(parsedUser.user_id) : null;
      } catch (error) {
        console.error("Gagal memparsing data user dari localStorage:", error);
        return null;
      }
    }
    return null;
  };

  const userId = getUserFromStorage();

  useEffect(() => {
    if (!userId) {
      console.warn('User ID tidak ditemukan, mengarahkan kembali ke login.');
      setIsLoading(false);
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setErrorText('');
        const data = await getUserOrders(userId);
        
        // Memastikan data yang masuk berupa Array
        const sanitizedData = Array.isArray(data) ? data : [];
        setOrders(sanitizedData);
      } catch (error) {
        console.error('Gagal mengambil data pesanan:', error);
        setErrorText('Gagal memuat data pesanan. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId, navigate]);

  // Handler Chat Penjual
  const handleChatPenjual = async (shopId) => {
    if (!userId) return alert("Sesi kamu telah berakhir. Silakan login kembali.");
    if (!shopId) return alert("ID Toko tidak ditemukan untuk pesanan ini!");
    
    try {
      setIsConnectingChat(true);
      const data = await getOrCreateChatRoom(userId, Number(shopId));
      if (data && data.room_id) {
        navigate(`/chat/room/${data.room_id}`);
      } else {
        throw new Error("Room ID tidak valid dari server");
      }
    } catch (error) {
      console.error('Gagal menghubungkan ke chat:', error);
      alert('Gagal memuat room chat, silakan coba lagi.');
    } finally {
      setIsConnectingChat(false);
    }
  };

  // Toleransi filter backend
  const activeOrders = orders.filter((order) => {
    return !order.is_finished && order.status !== 'selesai' && order.status_pesanan !== 'selesai';
  });

  const historyOrders = orders.filter((order) => {
    return order.is_finished || order.status === 'selesai' || order.status_pesanan === 'selesai';
  });

  return (
    <div className='min-h-screen bg-[#F4F9FF] flex flex-col'>
      <Navbar />

      {/* HEADER BANNER */}
      <div className='bg-[#FF6B35] py-8 md:py-14 px-6 relative overflow-hidden'>
        <div className='max-w-5xl mx-auto relative z-10 text-white'>
          <h1 className='text-2xl md:text-4xl font-black mb-2 uppercase tracking-tight'>
            Daftar Pesanan Kamu
          </h1>
          <p className='text-sm md:text-base opacity-90 font-medium max-w-md'>
            Pantau dan cek riwayat kuliner kampusmu dalam satu tempat.
          </p>
        </div>
        <ShoppingBag className='absolute right-[-40px] top-[-40px] text-white/10 w-48 h-48 md:w-64 md:h-64 -rotate-12' />
      </div>

      <main className='max-w-5xl mx-auto w-full py-6 md:py-10 px-4 md:px-6 flex-grow'>
        {/* TAB SWITCHER */}
        <div className='flex p-1.5 bg-slate-200/50 rounded-2xl w-full md:w-fit mb-8'>
          <button
            type='button'
            onClick={() => setActiveTab('aktif')}
            className={`flex-1 md:flex-none px-6 md:px-10 py-3 rounded-xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'aktif'
                ? 'bg-[#FF6B35] text-white shadow-md'
                : 'text-slate-500 hover:bg-white/50'
            }`}
          >
            Aktif ({activeOrders.length})
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('riwayat')}
            className={`flex-1 md:flex-none px-6 md:px-10 py-3 rounded-xl font-black text-xs md:text-sm transition-all ${
              activeTab === 'riwayat'
                ? 'bg-[#FF6B35] text-white shadow-md'
                : 'text-slate-500 hover:bg-white/50'
            }`}
          >
            Riwayat ({historyOrders.length})
          </button>
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className='flex flex-col items-center justify-center py-20 text-slate-400'>
            <Loader2 className='w-10 h-10 animate-spin mb-4 text-[#FF6B35]' />
            <p className='font-bold uppercase tracking-widest text-xs'>
              Memuat data...
            </p>
          </div>
        ) : errorText ? (
          /* ERROR STATE */
          <div className='text-center py-20 bg-white rounded-[32px] border border-red-100 p-6'>
            <p className='text-red-500 font-bold mb-2'>{errorText}</p>
            <button 
              type='button'
              onClick={() => window.location.reload()} 
              className='text-xs bg-[#FF6B35] text-white px-4 py-2 rounded-xl font-bold uppercase'
            >
              Muat Ulang Halaman
            </button>
          </div>
        ) : (
          /* DATA RENDER */
          <div className='grid grid-cols-1 gap-4 md:gap-6'>
            {activeTab === 'aktif' ? (
              activeOrders.length > 0 ? (
                activeOrders.map((order) => (
                  <OrderCard
                    key={order.order_id || order.id_order}
                    {...order}
                    order_id={order.order_id || order.id_order}
                    parent_shop_id={order.shop_id || order.id_toko} // Fallback ke level order jika ada
                    items={order.items || []}
                    status='aktif'
                    total_amount={order.total_harga || order.total_amount}
                    onChatClick={handleChatPenjual}
                    isConnectingChat={isConnectingChat}
                  />
                ))
              ) : (
                <div className='text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200'>
                  <ShoppingBag className='mx-auto text-slate-200 mb-4' size={48} />
                  <p className='text-slate-400 font-bold'>
                    Belum ada pesanan aktif.
                  </p>
                </div>
              )
            ) : (
              historyOrders.length > 0 ? (
                historyOrders.map((order) => (
                  <OrderCard
                    key={order.order_id || order.id_order}
                    {...order}
                    order_id={order.order_id || order.id_order}
                    parent_shop_id={order.shop_id || order.id_toko}
                    items={order.items || []}
                    status='selesai'
                    total_amount={order.total_harga || order.total_amount}
                  />
                ))
              ) : (
                <div className='text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200'>
                  <ShoppingBag className='mx-auto text-slate-200 mb-4' size={48} />
                  <p className='text-slate-400 font-bold'>
                    Riwayat pesanan kosong.
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderStatusPage;