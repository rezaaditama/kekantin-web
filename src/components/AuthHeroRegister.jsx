const HeroRegist = () => {
  return (
    <div className="hidden md:block relative w-full h-full">

      {/* IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1651440204227-a9a5b9d19712?q=80&w=687"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-orange-600/80"></div>

      {/* TEXT */}
      <div className="absolute bottom-16 left-12 right-10 text-white max-w-md">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Kantin Kampus, Sekarang Lebih Digital
        </h1>

        <p className="opacity-90 leading-relaxed">
          Platform digital yang memudahkan mahasiswa menemukan makanan favorit
          dan membuka toko untuk menjangkau lebih banyak pelanggan.
        </p>
      </div>

    </div>
  );
};

export default HeroRegist;