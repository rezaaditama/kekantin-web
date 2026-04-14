import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ id, name, desc, price, qty, image, onUpdate }) => {
  const updateQty = (newQty) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(
      (i) => i.product_id === id && i.note === desc
    );
    if (itemIndex > -1) {
      cart[itemIndex].quantity = newQty;
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      onUpdate();
    }
  };

  const removeItem = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const filtered = cart.filter(
      (i) => !(i.product_id === id && i.note === desc)
    );
    localStorage.setItem('cart', JSON.stringify(filtered));
    window.dispatchEvent(new Event('cartUpdated'));
    onUpdate();
  };

  return (
    <div className='bg-white p-3 md:p-5 rounded-3xl shadow-sm border border-slate-100 flex gap-4 items-center'>
      {/* Gambar: Ukuran fleksibel */}
      <img
        src={image}
        alt={name}
        className='w-20 h-20 md:w-28 md:h-28 rounded-2xl object-cover shadow-sm'
      />

      {/* Info & Control */}
      <div className='flex-1 flex flex-col justify-between h-full'>
        <div>
          <h2 className='font-black text-slate-800 text-sm md:text-lg line-clamp-1'>
            {name}
          </h2>
          <p className='text-[10px] md:text-sm text-slate-400 font-medium italic mb-2 line-clamp-1'>
            "{desc || 'Tanpa catatan'}"
          </p>
        </div>

        <div className='flex items-center justify-between mt-auto'>
          {/* Quantity Controls */}
          <div className='flex items-center gap-2 md:gap-4 bg-slate-50 p-1 md:p-1.5 rounded-full border border-slate-100'>
            <button
              onClick={() => qty > 1 && updateQty(qty - 1)}
              className='w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-slate-600 hover:text-orange-500 transition-colors'
            >
              <Minus size={14} />
            </button>
            <span className='font-black text-xs md:text-base text-slate-800 min-w-[20px] text-center'>
              {qty}
            </span>
            <button
              onClick={() => updateQty(qty + 1)}
              className='w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-slate-600 hover:text-orange-500 transition-colors'
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price & Delete (Desktop View Side by Side) */}
          <div className='text-right'>
            <p className='text-orange-500 font-black text-sm md:text-lg'>
              Rp {(price * qty).toLocaleString('id-ID')}
            </p>
            <button
              onClick={removeItem}
              className='text-red-400 hover:text-red-600 transition-colors p-1'
              title='Hapus Item'
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
