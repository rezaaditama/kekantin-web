import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <button className='flex items-center gap-2 text-gray-400 hover:text-[#0D2137] transition-colors'>
      <ArrowLeft size={16} /> Kembali ke Keranjang
    </button>
  );
};

export default BackButton;
