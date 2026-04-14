import { MapPin } from 'lucide-react';

const PickupInfo = ({ shop_location }) => {
  return (
    <div className='bg-white p-8 rounded-[32px] shadow-sm border border-blue-50'>
      <div className='flex items-center gap-3 mb-6'>
        <MapPin className='text-[#3A86FF]' size={20} />
        <h3 className='font-bold text-[#0D2137]'>Lokasi Pengambilan</h3>
      </div>
      <div className='p-4 bg-gray-50 rounded-xl border border-gray-100'>
        <p className='text-sm font-bold text-[#0D2137]'>{shop_location}</p>
        <p className='text-xs text-gray-400 mt-1'>
          Estimasi siap dalam 15-20 menit
        </p>
      </div>
    </div>
  );
};

export default PickupInfo;
