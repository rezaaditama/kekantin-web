import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMenuByShop } from '../services/menuService';
import { getTokoById } from '../services/tokoService';

const DaftarMenu = () => {
  const { shop_id } = useParams(); // Ambil ID dari URL
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shopDetail, setShopDetail] = useState({
    name: 'Memuat...',
    location: '',
    image: '',
  });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const [menuData, shopData] = await Promise.all([
          getMenuByShop(shop_id),
          getTokoById(shop_id),
        ]);
        setMenus(menuData);
        if (shopData) {
          setShopDetail({
            name: shopData.shop_name,
            location: shopData.shop_location,
            image: `https://be-mobile-ecanteen.vercel.app/uploads/${shopData.shop_src}.jpg`,
          });
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (shop_id) fetchMenu();
  }, [shop_id]);

  return (
    <div className='bg-slate-50 min-h-screen'>
      <Navbar />
      <Hero
        title={shopDetail.name}
        location={shopDetail.location}
        bgImage={shopDetail.image}
      />
      <div className='max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-10'>
        <h2 className='text-xl md:text-2xl font-black text-slate-800 mb-6 md:mb-8 text-center md:text-left'>
          Daftar Menu Tersedia
        </h2>

        {isLoading ? (
          <div className='flex justify-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500'></div>
          </div>
        ) : menus.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8'>
            {/* Mapping data */}
            {menus.map((food, index) => (
              <FoodCard
                key={food.product_id || index}
                food={{
                  ...food,
                  name: food.product_name,
                  price: food.product_price,
                  desc: food.product_desc || 'Cita rasa otentik untuk Anda',
                  image: `https://be-mobile-ecanteen.vercel.app/uploads/${food.product_path}.jpg`,
                }}
              />
            ))}
          </div>
        ) : (
          <div className='text-center py-20 text-slate-500 font-medium'>
            Belum ada menu tersedia di toko ini.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DaftarMenu;
