import { useState, useEffect } from 'react';
import { ShoppingCart, LogOut, User, ChevronDown, Menu, X } from 'lucide-react';
import { getCart } from '../../utils/cartHelper';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ variant = 'default' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateBadge = () => {
    const cart = getCart();
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateBadge();
    window.addEventListener('cartUpdated', updateBadge);
    return () => window.removeEventListener('cartUpdated', updateBadge);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className='w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50'>
      <div className='flex justify-between items-center px-4 md:px-6 py-3 md:py-4 max-w-7xl mx-auto'>
        {/* LEFT: Logo & Desktop Links */}
        <div className='flex items-center gap-6 md:gap-8'>
          <span
            onClick={() => navigate('/dashboard')}
            className='text-lg md:text-2xl font-black text-[#FF6B35] tracking-tighter uppercase cursor-pointer transition-transform active:scale-95'
          >
            ke.kantin
          </span>

          {variant !== 'clean' && (
            <div className='hidden md:flex gap-8'>
              <button
                onClick={() => navigate('/dashboard')}
                className={`text-sm font-bold transition-all pb-1 border-b-2 ${
                  isActive('/dashboard')
                    ? 'text-[#FF6B35] border-[#FF6B35]'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => navigate('/order-status')}
                className={`text-sm font-bold transition-all pb-1 border-b-2 ${
                  isActive('/order-status')
                    ? 'text-[#FF6B35] border-[#FF6B35]'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                Pesanan
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: Cart & Profile/Toggle */}
        <div className='flex items-center gap-1 md:gap-5'>
          {variant !== 'clean' && (
            <>
              <div
                onClick={() => navigate('/keranjang')}
                className='relative cursor-pointer p-2 hover:bg-orange-50 rounded-full transition-colors active:scale-90'
              >
                <ShoppingCart className='w-5 h-5 md:w-6 md:h-6 text-gray-700' />
                {cartCount > 0 && (
                  <span className='absolute top-1 right-1 bg-[#FF6B35] text-white text-[9px] md:text-[10px] font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border-2 border-white'>
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Mobile Toggle Button */}
              <button
                className='md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg active:bg-gray-100 transition-colors'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Profile Desktop Only */}
              <div className='hidden md:block relative'>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className='flex items-center gap-2 p-1 border border-gray-100 rounded-full hover:bg-gray-50 transition-all shadow-sm'
                >
                  <div className='w-8 h-8 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center'>
                    <User size={18} />
                  </div>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className='absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150'>
                    <button
                      onClick={() => {
                        navigate('/profil');
                        setIsProfileOpen(false);
                      }}
                      className='w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 text-left'
                    >
                      <User size={16} /> Profil
                    </button>
                    <button
                      onClick={handleLogout}
                      className='w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-red-500 hover:bg-red-50 border-t border-gray-50 text-left'
                    >
                      <LogOut size={16} /> Keluar
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* MOBILE MENU DRAWER - Optimized Spacing */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-200'>
          <div className='grid grid-cols-1 divide-y divide-gray-50'>
            <button
              onClick={() => {
                navigate('/dashboard');
                setIsMobileMenuOpen(false);
              }}
              className='flex items-center px-6 py-3.5 text-sm font-bold text-gray-600 active:bg-orange-50 active:text-[#FF6B35] transition-colors'
            >
              Beranda
            </button>
            <button
              onClick={() => {
                navigate('/order-status');
                setIsMobileMenuOpen(false);
              }}
              className='flex items-center px-6 py-3.5 text-sm font-bold text-gray-600 active:bg-orange-50 active:text-[#FF6B35] transition-colors'
            >
              Pesanan Saya
            </button>
            <button
              onClick={() => {
                navigate('/profil');
                setIsMobileMenuOpen(false);
              }}
              className='flex items-center px-6 py-3.5 text-sm font-bold text-gray-600 active:bg-orange-50 active:text-[#FF6B35] transition-colors'
            >
              Profil
            </button>
            <button
              onClick={handleLogout}
              className='flex items-center px-6 py-3.5 text-sm font-black text-red-500 active:bg-red-50 transition-colors'
            >
              <LogOut size={16} className='mr-2' /> Keluar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
