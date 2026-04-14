import { Search } from 'lucide-react';
import food from '../../assets/food.png';

const Hero = () => {
  return (
    <section className='mb-8 rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 md:p-8 relative overflow-hidden'>
      <div className='absolute -top-16 -right-16 w-56 h-56 bg-orange-400 opacity-40 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-44 h-44 bg-yellow-300 opacity-30 rounded-full blur-3xl'></div>

      <img
        src={food}
        alt='Food'
        className='
          absolute right-0 top-0 h-full object-contain z-0
          drop-shadow-[-20px_20px_20px_rgba(0,0,0,0.25)]
          [mask-image:linear-gradient(to_right,transparent_0%,black_20%)]
        '
      />

      <div className='flex items-center relative z-10'>
        <div className='max-w-lg'>
          <h1 className='text-3xl md:text-4xl font-bold mb-3 leading-tight'>
            Apa yang ingin kamu <br />
            makan hari ini?
          </h1>

          <p className='mb-5 text-orange-100 text-sm md:text-base'>
            Temukan hidangan terbaik di setiap sudut kampus hanya dengan satu
            sentuhan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
