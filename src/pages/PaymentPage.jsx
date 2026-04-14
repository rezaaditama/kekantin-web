import React, { useState } from 'react';
import {
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentMethod from '../layouts/PaymentMethod';
import PickupInfo from '../layouts/PickupInfo';
import ConfirmPayment from '../layouts/ConfirmPayment';
import BackButton from '../components/BackButton';

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayWithMidtrans = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    navigate('/order-status');
  };

  return (
    <div className='min-h-screen bg-[#F4F9FF] font-sans flex flex-col'>
      <Navbar variant='clean' />
      <main className='flex-grow py-8 px-6'>
        <div className='max-w-5xl mx-auto'>
          <div className='flex items-center gap-4 mb-8 text-sm font-medium'>
            <BackButton />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 items-start'>
            <div className='lg:col-span-3 space-y-6'>
              <PaymentMethod />
              <PickupInfo shop_location={'Kantin Universitas Ibn Khaldun'} />
            </div>

            <ConfirmPayment
              onClick={handlePayWithMidtrans}
              loading={loading}
              // order_qty={order.qty}
              // total_harga={total_harga}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
