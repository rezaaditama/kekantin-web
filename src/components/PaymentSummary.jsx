import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import { useState } from 'react';

const PaymentSummary = ({ items = [], pickupTime }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const totalTagihan = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (items.length === 0) return alert('Keranjang kosong!');
    if (!pickupTime) return alert('Pilih waktu pengambilan!');

    setIsLoading(true);

    // Data payload
    const orderPayload = {
      order_id: `ORDER-${Date.now()}`, // Generate ID unik
      user_id: 1, // Ganti dengan ID user dari context/auth Anda
      pickup_time: pickupTime,
      total_harga: totalTagihan,
      payment_method: 'qris', // Trigger logic Midtrans di backend
      items: items.map((item) => ({
        product_id: item.product_id,
        qty: item.quantity,
        note: item.note,
        subtotal: item.price * item.quantity,
      })),
    };

    // Hit endpoint
    try {
      // Panggil fungsi dari service
      const data = await createOrder(orderPayload);

      if (data.snap_token) {
        window.snap.pay(data.snap_token, {
          onSuccess: function (result) {
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));
            navigate('/order-status');
          },
          onPending: function (result) {
            navigate('/order-status');
            setIsLoading(false);
          },
          onError: function (result) {
            alert('Pembayaran Gagal!');
            setIsLoading(false);
          },
        });
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert(`Gagal memproses pesanan: ${error.message || error}`);
      setIsLoading(false);
    }
  };
  return (
    <div className='bg-white p-8 rounded-[32px] shadow-lg border border-slate-100 sticky top-6'>
      <h2 className='text-xl font-black text-slate-800 mb-6'>
        Ringkasan Pembayaran
      </h2>

      <div className='space-y-2 text-sm'>
        <div className='flex justify-between text-slate-500 font-medium'>
          <span>Total Item</span>
          <span>{items.length} Menu</span>
        </div>
      </div>

      <div className='mt-4 border-t border-white-200 pt-4'>
        <p className='text-xs text-white-3=200'>TOTAL TAGIHAN</p>
        <p className='text-2xl text-orange-400 font-bold'>
          Rp. {totalTagihan.toLocaleString('id-ID')}
        </p>
      </div>

      <button
        onClick={handlePayment}
        disabled={isLoading} // Disable tombol saat loading
        className={`w-full mt-8 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
          isLoading
            ? 'bg-slate-300 cursor-not-allowed text-slate-500'
            : 'bg-orange-500 text-white shadow-xl shadow-orange-100 hover:bg-orange-600 active:scale-95'
        }`}
      >
        {isLoading ? (
          <>
            <div className='w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin'></div>
            Memproses...
          </>
        ) : (
          'Pilih Pembayaran →'
        )}
      </button>

      <p className='text-[10px] text-slate-400 mt-4 text-center leading-relaxed'>
        Jangan tutup halaman ini saat proses pembayaran berlangsung.
      </p>
    </div>
  );
};

export default PaymentSummary;
