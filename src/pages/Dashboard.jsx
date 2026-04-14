import DashboardLayout from '../layouts/DashboardLayout';
import Navbar from '../components/Navbar';
import Hero from '../components/dashboard/Hero';
import MenuCard from '../components/dashboard/MenuCard';
import Footer from '../components/Footer';
import { getAllToko } from '../services/tokoService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Get data
  useEffect(() => {
    const fetchToko = async () => {
      try {
        const data = await getAllToko();
        setShops(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToko();
  }, []);

  return (
    <DashboardLayout navbar={<Navbar />} footer={<Footer />}>
      <Hero />

      {/* Loading data */}
      {isLoading ? (
        <div className='flex justify-center py-20'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500'></div>
        </div>
      ) : (
        // Mapping data
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8'>
          {shops.map((shop) => (
            <div
              key={shop.shop_id}
              onClick={() => navigate(`/orders/${shop.shop_id}`)}
              className='cursor-pointer'
            >
              <MenuCard
                shop_name={shop.shop_name}
                shop_location={shop.shop_location}
                shop_src={`https://be-mobile-ecanteen.vercel.app/uploads/${shop.shop_src}.jpg`}
              />
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
