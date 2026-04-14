import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import Summary from '../components/Summary';
import Footer from '../components/Footer';
import { getCart } from '../utils/cartHelper';
import { useEffect, useState } from 'react';

const Keranjang = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  // refresh data
  const refreshCart = () => {
    setCartItems(getCart());
  };
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar variant='clean' />

      <div className='max-w-7xl mx-auto p-4 md:p-10'>
        <div className='mb-8 text-center md:text-left'>
          <h1 className='text-2xl md:text-3xl font-black text-slate-800'>
            Keranjang Pesanan
          </h1>
          <p className='text-slate-500 text-sm md:text-base'>
            Lengkapi detail pesanan Anda sebelum menuju kasir.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10'>
          {/* LEFT */}
          <div className='lg:col-span-2 space-y-4'>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <CartItem
                  key={`${item.product_id}-${index}`}
                  id={item.product_id}
                  name={item.name}
                  desc={item.note}
                  price={item.price}
                  qty={item.quantity}
                  image={item.image}
                  onUpdate={refreshCart}
                />
              ))
            ) : (
              <div className='bg-white p-12 rounded-[32px] text-center shadow-sm border-2 border-dashed border-slate-200'>
                <p className='text-slate-400 font-bold mb-4'>
                  Keranjang masih kosong. Yuk belanja dulu!
                </p>
                <button
                  onClick={() => (window.location.href = '/dashboard')}
                  className='text-orange-500 font-black hover:underline'
                >
                  Yuk cari makanan enak dulu!
                </button>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className='lg:sticky lg:top-24 h-fit'>
            <Summary items={cartItems} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Keranjang;
