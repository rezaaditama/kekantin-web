import { useState, useEffect } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderCard from '../layouts/OrderCard';
import { getUserOrders } from '../services/orderService';

const OrderStatusPage = () => {
  const [activeTab, setActiveTab] = useState('aktif');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = 1;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getUserOrders(userId);
        setOrders(data);
      } catch (error) {
        console.error('Gagal mengambil data pesanan:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const activeOrders = orders.filter((order) => !order.is_finished);

  const historyOrders = orders.filter((order) => order.is_finished);

  const IMAGE_BASE_URL = 'https://be-mobile-ecanteen.vercel.app/uploads/';
  return (
    <div className='min-h-screen bg-[#F4F9FF] flex flex-col'>
      <Navbar />

      {/* HEADER BANNER - Dibuat lebih slim di mobile */}
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
        {/* TAB SWITCHER - Scrollable di mobile jika item bertambah */}
        <div className='flex p-1.5 bg-slate-200/50 rounded-2xl w-full md:w-fit mb-8'>
          <button
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

        {isLoading ? (
          <div className='flex flex-col items-center justify-center py-20 text-slate-400'>
            <Loader2 className='w-10 h-10 animate-spin mb-4 text-[#FF6B35]' />
            <p className='font-bold uppercase tracking-widest text-xs'>
              Memuat data...
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 md:gap-6'>
            {activeTab === 'aktif' ? (
              activeOrders.length > 0 ? (
                activeOrders.map((order) => (
                  <OrderCard
                    key={order.order_id}
                    {...order}
                    status='aktif'
                    total_amount={order.total_harga}
                  />
                ))
              ) : (
                /* Empty State lebih proper */
                <div className='text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200'>
                  <ShoppingBag
                    className='mx-auto text-slate-200 mb-4'
                    size={48}
                  />
                  <p className='text-slate-400 font-bold'>
                    Belum ada pesanan aktif.
                  </p>
                </div>
              )
            ) : (
              historyOrders.map((order) => (
                <OrderCard
                  key={order.order_id}
                  {...order}
                  status='selesai'
                  total_amount={order.total_harga}
                />
              ))
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderStatusPage;
