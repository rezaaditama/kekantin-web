import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  ChevronLeft,
  Loader2,
  MessageCircle,
  Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getUserChatList } from '../services/chatService';

const ListChatPage = () => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [imageErrors, setImageErrors] = useState({}); // Menyimpan state gambar yang error

  // Ambil user data dari localStorage session
  const getSessionUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Gagal membaca session user:", error);
        return null;
      }
    }
    return null;
  };

  const currentUser = getSessionUser();
  const userId = currentUser ? Number(currentUser.user_id || currentUser.id) : null;
  const userRole = currentUser ? currentUser.role : null;

  // Load daftar chat room dari server
  const loadChatList = async () => {
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      setErrorText('');
      const data = await getUserChatList(userId);
      setChatList(data);
    } catch (error) {
      console.error(error);
      setErrorText('Gagal memuat daftar pesan obrolan.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChatList();
  }, [userId]);

  const formatChatTime = (timeString) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  // Handler jika gambar gagal dimuat dari server
  const handleImageError = (roomId) => {
    setImageErrors((prev) => ({ ...prev, [roomId]: true }));
  };

  return (
    <div className='min-h-screen bg-[#F4F9FF] flex flex-col justify-between'>
      <Navbar variant='clean' />

      <main className='max-w-3xl mx-auto w-full py-8 px-4 md:px-6 flex-grow space-y-6'>

        {/* Tombol Kembali & Judul */}
        <div className='flex items-center gap-3'>
          <button
            onClick={() => navigate(-1)}
            className='p-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-2xl border border-slate-200 shadow-xs transition-all active:scale-95'
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className='text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2'>
              <MessageSquare size={24} className="text-emerald-600" />
              <span>Kotak Masuk Chat</span>
            </h1>
            <p className='text-xs text-slate-500 font-medium'>
              {userRole === 'penjual'
                ? 'Kelola obrolan dengan pembeli lapak kantin Anda.'
                : 'Hubungi penjual lapak kantin untuk konfirmasi pesanan Anda.'}
            </p>
          </div>
        </div>

        {/* Notifikasi Error */}
        {errorText && (
          <div className='p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-bold text-center'>
            {errorText}
          </div>
        )}

        {/* Area List Chat */}
        {isLoading ? (
          <div className='flex flex-col items-center justify-center py-20 text-slate-400'>
            <Loader2 className='w-12 h-12 animate-spin mb-4 text-emerald-600' />
            <p className='font-black uppercase tracking-widest text-xs text-slate-500'>Memuat Pesan Obrolan...</p>
          </div>
        ) : chatList.length > 0 ? (
          <div className='bg-white rounded-3xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden'>
            {chatList.map((chat) => {
              const hasValidImage = chat.shop_src && !imageErrors[chat.room_id];

              return (
                <div
                  key={chat.room_id}
                  onClick={() => navigate(`/chat/room/${chat.room_id}`)}
                  className='p-4 hover:bg-slate-50/80 cursor-pointer transition-all flex items-center justify-between gap-4 group'
                >
                  {/* Info Toko & Pesan Terakhir */}
                  <div className='flex items-center gap-4 flex-grow min-w-0'>
                    {/* Avatar Toko / Fallback Default */}
                    <div className='w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:scale-105 transition-all'>
                      {hasValidImage ? (
                        <img
                          src={`http://localhost:3000/uploads/${chat.shop_src}`}
                          alt={chat.shop_name}
                          className="w-full h-full object-cover rounded-2xl"
                          onError={() => handleImageError(chat.room_id)}
                        />
                      ) : (
                        <MessageCircle size={22} />
                      )}
                    </div>

                    {/* Teks Konten */}
                    <div className='min-w-0 flex-grow space-y-0.5'>
                      <h3 className='text-sm font-black text-slate-800 tracking-tight truncate group-hover:text-emerald-600 transition-colors'>
                        {chat.shop_name}
                      </h3>
                      <p className={`text-xs truncate ${chat.unreadCount > 0 ? 'text-slate-900 font-extrabold' : 'text-slate-500 font-medium'}`}>
                        {chat.sender_id === userId ? <span className="text-slate-400 font-normal">Anda: </span> : ''}
                        {chat.lastMessage || <span className="text-slate-400 italic font-normal">Belum ada pesan terkirim</span>}
                      </p>
                    </div>
                  </div>

                  {/* Indikator Waktu & Unread Badge */}
                  <div className='flex flex-col items-end justify-between flex-shrink-0 h-10 gap-1.5 text-right'>
                    <span className='text-[10px] text-slate-400 font-bold flex items-center gap-1'>
                      <Clock size={10} />
                      {formatChatTime(chat.time)}
                    </span>

                    {chat.unreadCount > 0 && (
                      <span className='min-w-5 h-5 px-1.5 bg-emerald-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs animate-pulse'>
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className='text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200 p-6'>
            <div className='w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100'>
              <MessageSquare size={28} />
            </div>
            <h3 className='text-slate-700 font-black uppercase tracking-wider text-xs'>Kotak Masuk Kosong</h3>
            <p className='text-slate-400 text-xs mt-1 max-w-xs mx-auto leading-relaxed'>
              {userRole === 'penjual'
                ? 'Anda belum memiliki riwayat obrolan apapun dengan pembeli.'
                : 'Anda belum memiliki riwayat obrolan apapun dengan merchant kantin.'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ListChatPage;