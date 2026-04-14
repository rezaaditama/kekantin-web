import { useEffect, useState } from 'react';

const PickupTime = ({ onTimeChange }) => {
  // Ambil waktu WIB format 24 jam
  const getCurrentWIB = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // ini penting (biar 24 jam)
    });
  };

  const [time, setTime] = useState(getCurrentWIB());

  useEffect(() => {
    if (onTimeChange) onTimeChange(time);
  }, []);

  const handleChange = (e) => {
    const newTime = e.target.value;
    setTime(newTime);
    if (onTimeChange) onTimeChange(newTime);
  };

  return (
    <div className='bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-slate-100'>
      <h2 className='font-black text-lg md:text-xl text-slate-800 mb-4 flex items-center gap-2'>
        ⏰ Waktu Pengambilan
      </h2>

      <div className='p-4 md:p-6 rounded-2xl'>
        <p className='text-orange-700 text-xs md:text-sm font-bold mb-3 uppercase tracking-wider'>
          Pilih Jam Kedatangan (WIB)
        </p>
        <input
          type='time'
          value={time}
          onChange={handleChange}
          className='w-full bg-white border-orange-200 text-slate-800 p-4 rounded-xl outline-none border-2 focus:border-orange-500 font-black text-2xl transition-all shadow-inner'
        />
        <p className='text-xs text-orange-400 mt-3 italic'>
          * Pesanan Anda akan disiapkan sesuai waktu yang dipilih.
        </p>
      </div>
    </div>
  );
};

export default PickupTime;
