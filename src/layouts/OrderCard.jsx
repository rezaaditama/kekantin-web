import {
  Hash,
  Wallet,
  Clock,
  CheckCircle2,
  Utensils,
  XCircle,
} from 'lucide-react';

const OrderCard = ({
  order_id,
  total_amount,
  pickup_time,
  items = [],
  status = 'aktif',
  status_pembayaran = 'pending',
}) => {
  const isActive = status === 'aktif';
  const isPending = status_pembayaran === 'pending';
  const IMAGE_BASE_URL = 'https://be-mobile-ecanteen.vercel.app/uploads/';

  const renderStatusBadge = () => {
    // Jika Tab Riwayat (Selesai)
    if (!isActive) {
      return (
        <div className='flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100'>
          <CheckCircle2 size={12} />
          <span className='text-[10px] font-black uppercase tracking-widest'>
            Selesai
          </span>
        </div>
      );
    }

    // Jika Tab Aktif & Settlement
    if (status_pembayaran === 'settlement') {
      return (
        <span className='bg-orange-100 text-[#FF6B35] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-orange-200'>
          Sedang Diproses
        </span>
      );
    }

    // Jika Tab Aktif & Pending (Dibatalkan)
    if (isPending) {
      return (
        <div className='flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100'>
          <XCircle size={12} />
          <span className='text-[10px] font-black uppercase tracking-widest'>
            Dibatalkan
          </span>
        </div>
      );
    }

    return (
      <span className='bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest'>
        {status_pembayaran}
      </span>
    );
  };

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${
        isActive
          ? isPending
            ? 'border-red-100 opacity-80'
            : 'border-blue-50'
          : 'border-slate-100'
      }`}
    >
      {/* HEADER */}
      <div className='flex justify-between items-center border-b border-slate-50 pb-3'>
        <div className='flex items-center text-xs text-slate-400'>
          <Hash size={12} className='mr-1' />
          <span className='tracking-wider uppercase font-bold'>{order_id}</span>
        </div>
        <div>{renderStatusBadge()}</div>
      </div>

      {/* BODY */}
      <div className='space-y-4 my-4'>
        {items.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <div className='relative flex-shrink-0'>
              <img
                src={
                  item.product_path
                    ? `${IMAGE_BASE_URL}${item.product_path}.jpg`
                    : '/placeholder.jpg'
                }
                alt={item.product_name}
                className={`w-16 h-16 rounded-xl object-cover shadow-sm ${
                  isActive && isPending ? 'grayscale' : 'grayscale-0'
                }`}
              />
              <div className='absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white'>
                {item.qty}x
              </div>
            </div>
            <div className='flex-grow'>
              <h3 className='text-md font-bold text-slate-800 leading-tight'>
                {item.product_name}
              </h3>
              <p className='text-xs text-slate-400 flex items-center gap-1 mt-1'>
                <Utensils size={10} /> {item.shop_name}
              </p>
              {item.note && (
                <p className='text-[10px] italic text-orange-500 mt-1'>
                  Note: {item.note}
                </p>
              )}
            </div>
            <div className='text-right'>
              <p className='text-sm font-bold text-slate-700'>
                Rp. {(item.product_price * item.qty).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className='flex flex-wrap justify-between items-center pt-3 border-t border-slate-50 gap-3'>
        <div className='flex gap-2'>
          <div className='inline-flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl'>
            <Wallet
              size={14}
              className={`mr-2 ${
                status_pembayaran === 'settlement'
                  ? 'text-blue-600'
                  : 'text-slate-500'
              }`}
            />
            <span className='text-sm font-extrabold text-slate-900'>
              Total: Rp. {total_amount?.toLocaleString('id-ID')}
            </span>
          </div>

          {isActive && !isPending && pickup_time && (
            <div className='inline-flex items-center bg-orange-50 border border-orange-100 px-3 py-2 rounded-xl text-[#FF6B35]'>
              <Clock size={14} className='mr-2' />
              <span className='text-sm font-bold'>Ambil: {pickup_time}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
