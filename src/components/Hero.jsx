const Hero = ({ title, location, bgImage }) => (
  <div className='relative h-64 w-full'>
    {/* Gambar */}
    <img
      src={
        bgImage ||
        'https://i.pinimg.com/736x/43/f4/10/43f410c49fa4e6b6bbfcddae1cb47274.jpg'
      }
      alt='Hero'
      className='absolute inset-0 w-full h-full object-cover'
    />

    {/* Overlay gelap */}
    <div className='absolute inset-0 bg-black/50'></div>

    {/* Teks di tengah */}
    <div className='relative z-10 flex items-center justify-center h-full text-white text-center'>
      <div>
        <h1 className='text-4xl font-bold'>{title}</h1>
        {location && (
          <p className='text-lg font-medium opacity-90 flex items-center justify-center gap-2'>
            <span className='bg-orange-500 px-3 mt-4 py-1 rounded-full text-sm font-bold'>
              {location ||
                'Cita rasa otentik rumahan untuk mahasiswa masa kini.'}
            </span>
          </p>
        )}
      </div>
    </div>
  </div>
);

export default Hero;
