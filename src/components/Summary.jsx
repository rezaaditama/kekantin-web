import { useNavigate } from 'react-router-dom';

const Summary = ({ items = [] }) => {
  const navigate = useNavigate();
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className='bg-white p-6 md:p-8 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100'>
      <h2 className='text-xl font-black text-slate-800 mb-6'>
        Ringkasan Pesanan
      </h2>

      <div className='space-y-3'>
        <div className='flex justify-between text-slate-500 font-medium'>
          <span>Total Item</span>
          <span className='text-slate-800 font-bold'>{items.length}</span>
        </div>
        <div className='flex justify-between text-slate-500 font-medium'>
          <span>Subtotal</span>
          <span className='text-slate-800 font-bold'>
            Rp {subtotal.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <div className='my-6 border-t-2 border-dashed border-slate-100'></div>

      <div className='flex justify-between items-center mb-8'>
        <span className='font-bold text-slate-500'>Total Bayar</span>
        <span className='text-2xl font-black text-[#FF6B35]'>
          Rp {subtotal.toLocaleString('id-ID')}
        </span>
      </div>

      <div className='space-y-3'>
        <button
          onClick={() => navigate('/checkout')}
          disabled={items.length === 0}
          className='w-full bg-[#FF6B35] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-orange-200 hover:bg-[#e85a2a] transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none'
        >
          Checkout Sekarang
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className='w-full bg-slate-50 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all text-sm'
        >
          + Tambah Menu Lain
        </button>
      </div>
    </div>
  );
};

export default Summary;
