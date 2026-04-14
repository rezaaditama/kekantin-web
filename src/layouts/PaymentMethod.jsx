import { CreditCard, ShieldCheck } from 'lucide-react';

const PaymentMethod = () => {
  return (
    <div className='bg-white p-8 rounded-[32px] shadow-sm border border-blue-50'>
      <h1 className='text-3xl font-extrabold text-[#0D2137] mb-2'>
        Metode Pembayaran
      </h1>
      <p className='text-gray-400 mb-8 text-sm'>
        Transaksi aman dan cepat melalui gateway terpercaya.
      </p>

      <div className='p-6 bg-[#F4F9FF] rounded-2xl border-2 border-[#FF6B35] relative'>
        <div className='flex items-center gap-4'>
          <div className='bg-[#FF6B35] p-3 rounded-xl text-white shadow-md shadow-orange-100'>
            <CreditCard size={24} />
          </div>
          <div>
            <h4 className='font-bold text-[#0D2137]'>
              Midtrans Secure Payment
            </h4>
            <p className='text-xs text-gray-500 mt-0.5'>
              Mendukung QRIS, GoPay, ShopeePay & Virtual Account
            </p>
          </div>
          <div className='ml-auto'>
            <div className='bg-[#FF6B35] rounded-full p-1 text-white'>
              <ShieldCheck size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8 flex items-center justify-center gap-8 opacity-40 grayscale pointer-events-none'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg'
          alt='QRIS'
          className='h-6'
        />
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/9/9d/Midtrans.png'
          alt='Midtrans'
          className='h-20 '
        />
      </div>
    </div>
  );
};

export default PaymentMethod;
