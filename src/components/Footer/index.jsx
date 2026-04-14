const Footer = () => {
  return (
    <footer className='bg-white border-t-2 border-slate-100 px-6 py-12 md:p-16 mt-10'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Branding Section */}
        <div className='text-center md:text-left'>
          <h1 className='font-black text-2xl md:text-3xl text-slate-800 tracking-tighter uppercase mb-4'>
            ke.kantin
          </h1>
          <p className='text-sm text-slate-400 font-medium leading-relaxed max-w-sm mx-auto md:mx-0'>
            Solusi makan siang cerdas untuk civitas akademika **UIKA Bogor**.
            Pesan sekarang, ambil tanpa antre.
          </p>
          <div className='mt-6'>
            <p className='text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]'>
              © 2026 UIKA Dev Team • All Rights Reserved
            </p>
          </div>
        </div>

        {/* Location Section */}
        <div className='flex flex-col items-center md:items-end justify-center'>
          <div className='bg-slate-50 p-6 rounded-[2rem] border border-slate-100 w-full md:w-auto'>
            <p className='text-[10px] font-black text-[#FF6B35] uppercase tracking-[0.2em] mb-3 text-center md:text-right'>
              Titik Pengambilan
            </p>
            <p className='text-xs text-slate-500 font-bold leading-relaxed text-center md:text-right'>
              Jl. Sholeh Iskandar, RT.01/RW.10, <br />
              Tanah Sereal, Kota Bogor, Jawa Barat
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
