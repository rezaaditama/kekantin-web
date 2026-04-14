const OrderItem = ({ name, desc, price, image, qty }) => {
  return (
    <div className='bg-slate-50 p-3 md:p-4 rounded-[24px] flex gap-4 items-center border border-slate-100'>
      {/* Gambar lebih kecil di mobile */}
      <img
        src={image}
        className='w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shadow-sm'
        alt={name}
      />

      <div className='flex-1 min-w-0'>
        <h3 className='font-black text-slate-800 text-sm md:text-base truncate'>
          {name}
        </h3>
        <p className='text-[10px] md:text-xs text-slate-400 italic line-clamp-1'>
          {desc || 'Tanpa catatan'}
        </p>

        {/* Badge Qty & Price di bawah (khusus mobile agar rapi) */}
        <div className='flex items-center justify-between mt-2 md:mt-1'>
          <span className='text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md'>
            x{qty}
          </span>
          <p className='md:hidden text-slate-800 font-black text-sm'>
            Rp {(price * qty).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Harga hanya muncul di desktop di sisi kanan */}
      <p className='hidden md:block text-slate-800 font-black text-lg whitespace-nowrap'>
        Rp {(price * qty).toLocaleString('id-ID')}
      </p>
    </div>
  );
};

export default OrderItem;
