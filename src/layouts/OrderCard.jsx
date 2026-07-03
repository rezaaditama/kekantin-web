import {
  Hash,
  Wallet,
  Clock,
  CheckCircle2,
  Utensils,
  XCircle,
  MessageSquare,
} from 'lucide-react';

const OrderCard = ({
  order_id,
  parent_shop_id,
  total_amount,
  pickup_time,
  items = [],
  status = 'aktif',
  status_pembayaran = 'pending',
  onChatClick,
  isConnectingChat = false,
}) => {
  const isActive = status === 'aktif';
  const isPending = status_pembayaran === 'pending';
  const isSettlement = status_pembayaran === 'settlement';
  const IMAGE_BASE_URL = 'https://be-mobile-ecanteen.vercel.app/uploads/';

  const renderStatusBadge = () => {
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

    if (isSettlement) {
      return (
        <span className='bg-orange-100 text-[#FF6B35] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-orange-200'>
          Sedang Diproses
        </span>
      );
    }

    if (isPending) {
      return (
        <div className='flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100'>
          <XCircle size={12} />
          <span className='text-[10px] font-black uppercase tracking-widest'>
            Menunggu Pembayaran
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
      className={`bg-white rounded-3xl p-5 border transition-all ${
        isActive
          ? isPending
            ? 'border-orange-100 shadow-xs'
            : 'border-blue-50/60 shadow-sm'
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

      {/* BODY (ITEMS LIST) */}
      <div className='space-y-4 my-4 divide-y divide-slate-50'>
        {items && items.map((item, index) => {
          // Cari shop_id di item dulu, kalau tidak ada pakai dari parent order
          const targetShopId = item.shop_id || item.id_toko || item.id_shop || parent_shop_id;
          const targetShopName = item.shop_name || item.nama_toko || 'Toko Kuliner';
          const targetProductName = item.product_name || item.nama_produk || 'Menu Kuliner';
          const targetProductPrice = item.product_price || item.harga || 0;

          return (
            <div key={index} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${index > 0 ? 'pt-4' : ''}`}>
              <div className='flex items-center gap-4 flex-grow'>
                <div className='relative flex-shrink-0'>
                  <img
                    src={
                      item.product_path || item.image
                        ? (item.product_path ? `${IMAGE_BASE_URL}${item.product_path}.jpg` : item.image)
                        : '/placeholder.jpg'
                    }
                    alt={targetProductName}
                    className='w-16 h-16 rounded-xl object-cover shadow-sm'
                  />
                  <div className='absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white'>
                    {item.qty || 1}x
                  </div>
                </div>
                <div className='flex-grow'>
                  <h3 className='text-sm font-bold text-slate-800 leading-tight'>
                    {targetProductName}
                  </h3>
                  <p className='text-xs text-slate-400 flex items-center gap-1 mt-1'>
                    <Utensils size={10} /> {targetShopName}
                  </p>
                  {item.note && (
                    <p className='text-[10px] italic text-orange-500 mt-1'>
                      Note: {item.note}
                    </p>
                  )}
                </div>
              </div>

              {/* SISI KANAN: HARGA & TOMBOL CHAT */}
              <div className='flex items-center justify-between sm:justify-end gap-4 border-t border-dashed border-slate-50 pt-2 sm:pt-0 sm:border-none'>
                <p className='text-sm font-bold text-slate-700 sm:text-right'>
                  Rp. {(targetProductPrice * (item.qty || 1)).toLocaleString('id-ID')}
                </p>

                {/* Tombol aktif jika status pesanan aktif dan shop id valid */}
                {isActive && targetShopId && onChatClick && (
                  <button
                    type='button'
                    onClick={() => onChatClick(targetShopId)}
                    disabled={isConnectingChat}
                    title={`Chat dengan ${targetShopName}`}
                    className='flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200/60 px-3 py-1.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50 shadow-xs'
                  >
                    <MessageSquare size={12} />
                    <span>Chat</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className='flex flex-wrap justify-between items-center pt-3 border-t border-slate-50 gap-3'>
        <div className='flex gap-2 w-full sm:w-auto justify-between sm:justify-start'>
          <div className='inline-flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl'>
            <Wallet
              size={14}
              className={`mr-2 ${isSettlement ? 'text-blue-600' : 'text-slate-500'}`}
            />
            <span className='text-xs md:text-sm font-extrabold text-slate-900'>
              Total: Rp. {total_amount?.toLocaleString('id-ID')}
            </span>
          </div>

          {isActive && pickup_time && (
            <div className='inline-flex items-center bg-orange-50 border border-orange-100 px-3 py-2 rounded-xl text-[#FF6B35]'>
              <Clock size={14} className='mr-2' />
              <span className='text-xs md:text-sm font-bold'>Ambil: {pickup_time}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;