import Navbar from '../components/Navbar';
import PickupTime from '../components/PickupTime';
import OrderItem from '../components/OrderItem';
import PaymentSummary from '../components/PaymentSummary';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { getCart } from '../utils/cartHelper';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [pickupTime, setPickupTime] = useState('');

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  useEffect(() => {
    setCartItems(getCart());
  }, []);
  return (
    <div className='bg-slate-50 min-h-screen'>
      <Navbar variant='clean' />

      <div className='max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-10'>
        <div className='mb-8 text-center md:text-left'>
          <h1 className='text-2xl md:text-3xl font-black text-slate-800'>
            Checkout
          </h1>
          <p className='text-slate-500 text-sm md:text-base'>
            Verifikasi pilihan Anda dan pilih waktu pengambilan.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10'>
          {/* LEFT: Konfigurasi & Detail */}
          <div className='lg:col-span-2 space-y-6'>
            <PickupTime onTimeChange={setPickupTime} />

            <div className='bg-white p-5 md:p-8 rounded-[32px] shadow-sm border border-slate-100'>
              <h2 className='font-black text-lg md:text-xl text-slate-800 mb-6 flex items-center gap-2'>
                <span className='w-1.5 h-6 bg-orange-500 rounded-full'></span>
                Rincian Pesanan
              </h2>

              <div className='space-y-4'>
                {cartItems.map((item, index) => (
                  <OrderItem
                    key={`${item.product_id}-${index}`}
                    name={item.name}
                    desc={item.note}
                    price={item.price}
                    qty={item.quantity}
                    image={item.image}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Ringkasan Pembayaran */}
          <div className='lg:sticky lg:top-24 h-fit'>
            <PaymentSummary items={cartItems} pickupTime={pickupTime} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
