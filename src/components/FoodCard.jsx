import { useState } from 'react';
import { addToCart } from '../utils/cartHelper';
import { X, ShoppingCart, Plus } from 'lucide-react';

const FoodCard = ({ food }) => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [note, setNote] = useState('');

  const handleAddToCart = () => {
    // Logika simpan ke keranjang
    addToCart(food, note);

    // close modal and reset note
    setShowNoteModal(false);
    setNote('');
    alert(`${food.name} berhasil ditambah ke keranjang!`);
  };

  return (
    <>
      <div className='bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-md border border-slate-100 overflow-hidden transition-all group flex flex-col'>
        {/* GAMBAR */}
        <div className='relative overflow-hidden'>
          <img
            src={food.image}
            alt={food.name}
            className='h-32 md:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500'
          />
        </div>

        {/* KONTEN CARD */}
        <div className='p-3 md:p-5 flex flex-col flex-grow'>
          <div className='flex flex-col md:flex-row justify-between items-start gap-1 mb-2'>
            <h3 className='font-black text-slate-800 text-sm md:text-lg leading-tight line-clamp-1'>
              {food.name}
            </h3>
            <span className='text-[#FF6B35] font-black text-sm md:text-lg whitespace-nowrap'>
              Rp {food.price.toLocaleString('id-ID')}
            </span>
          </div>

          <p className='hidden md:block text-sm text-slate-500 line-clamp-2 mb-5 flex-grow'>
            {food.desc}
          </p>

          <button
            onClick={() => setShowNoteModal(true)}
            className='w-full bg-[#FF6B35] text-white py-2 md:py-3 rounded-lg md:rounded-xl font-bold flex items-center justify-center gap-1 md:gap-2 hover:bg-[#e85a2a] transition-all active:scale-95 text-xs md:text-base'
          >
            <Plus size={14} md:size={18} strokeWidth={3} />
            Keranjang
          </button>
        </div>
      </div>

      {/* POP-UP CATATAN (MODAL) */}
      {showNoteModal && (
        <div className='fixed inset-0 z-[999] flex items-end md:items-center justify-center p-0 md:p-4'>
          {/* Backdrop Blur */}
          <div
            className='absolute inset-0 bg-slate-900/40 backdrop-blur-sm'
            onClick={() => setShowNoteModal(false)}
          ></div>

          {/* Box Modal */}
          <div className='relative bg-white w-full max-w-sm rounded-t-[32px] md:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300'>
            <div className='p-6 md:p-8'>
              <div className='flex justify-between items-center mb-6'>
                <h4 className='ffont-black text-xl md:text-2xl text-slate-800'>
                  Catatan
                </h4>
                <button
                  onClick={() => setShowNoteModal(false)}
                  className='p-2 bg-slate-100 rounded-full text-slate-500'
                >
                  <X size={20} />
                </button>
              </div>

              <div className='space-y-6'>
                <div className='relative'>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder='Contoh: Pedas banget, atau jangan pakai alat makan...'
                    className='w-full border-2 border-slate-100 rounded-2xl p-4 text-sm focus:border-orange-400 focus:outline-none bg-white'
                    rows='4'
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  className='w-full bg-[#FF6B35] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#e85a2a] transition-all flex items-center justify-center gap-3'
                >
                  <ShoppingCart size={20} />
                  Tambahkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodCard;
