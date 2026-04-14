import { ChevronRight } from 'lucide-react';

const ConfirmPayment = ({ order_qty, onClick, loading, total_harga }) => {
  return (
    <div className='lg:col-span-2 sticky top-24'>
      <div className='bg-[#D1E9FF] p-8 lg:p-10 rounded-[40px] shadow-xl shadow-blue-100'>
        <h3 className='text-xl font-bold text-[#0D2137] mb-8'>
          Ringkasan Pesanan
        </h3>

        <div className='space-y-4'>
          <div className='flex justify-between text-sm'>
            <span className='text-[#4A6D8C] font-medium'>{order_qty}</span>
            <span className='font-bold text-[#0D2137]'>{total_harga}</span>
          </div>

          <div className='border-t border-blue-200 mt-6 pt-6'>
            <p className='text-[10px] font-black text-[#FF6B35] uppercase tracking-widest'>
              Total Bayar
            </p>
            <p className='text-5xl font-black mt-1 text-[#0D2137]'>
              {total_harga}
            </p>
          </div>
        </div>

        <button
          onClick={onClick}
          disabled={loading}
          className='w-full mt-10 bg-[#FF6B35] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#e85a24] transition-all shadow-xl shadow-orange-200 active:scale-95 disabled:bg-gray-400'
        >
          {loading ? (
            <div className='w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin'></div>
          ) : (
            <>
              Bayar Sekarang <ChevronRight size={22} />
            </>
          )}
        </button>

        <p className='text-[10px] text-[#4A6D8C] mt-6 text-center font-bold leading-relaxed opacity-70 uppercase tracking-tighter'>
          Verifikasi Otomatis & Instan
        </p>
      </div>
    </div>
  );
};

export default ConfirmPayment;
