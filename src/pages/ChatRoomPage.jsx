import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Loader2, Store, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getChatMessages, sendMessage, markMessagesAsRead } from '../services/chatService';

const ChatRoomPage = () => {
  const { room_id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [shopName, setShopName] = useState('Memuat nama toko...'); // State baru untuk nama toko
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const getSessionUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Gagal memparsing data user:", error);
        return null;
      }
    }
    return null;
  };


  const getUserFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser.user_id ? Number(parsedUser.user_id) : null;
      } catch (error) {
        console.error("Gagal memparsing data user:", error);
        return null;
      }
    }
    return null;
  };

  const currentUser = getSessionUser();
  const userId = currentUser ? Number(currentUser.user_id || currentUser.id) : null;
  const userRole = currentUser ? currentUser.role : null; // Ambil properti role (misal: 'user', 'admin', atau 'penjual')
  const targetRoomId = room_id ? Number(room_id) : null;

  // Fetch data dari backend
  const fetchMessages = async (showLoading = false) => {
    if (!targetRoomId) return;
    try {
      if (showLoading) setIsLoading(true);
      const resData = await getChatMessages(targetRoomId);

      // Jika backend mengembalikan format objek baru
      if (resData && typeof resData === 'object' && !Array.isArray(resData)) {
        setMessages(Array.isArray(resData.messages) ? resData.messages : []);
        if (userRole === 'penjual') {
          setShopName(resData.buyer_name || 'Pelanggan');
        } else {
          setShopName(resData.shop_name || 'Toko Kuliner');
        }
      } else {
        // Fallback jika backend belum di-update (berupa array langsung)
        setMessages(Array.isArray(resData) ? resData : []);
        setShopName(userRole === 'penjual' ? 'Pelanggan' : 'Hubungi Penjual');
      }
    } catch (error) {
      console.error('Gagal memuat pesan:', error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      alert("Sesi berakhir, silakan login kembali.");
      navigate('/login');
      return;
    }

    if (!targetRoomId) {
      alert("Room ID tidak valid.");
      handleBackNavigation(); // Menggunakan fungsi fallback dinamis jika room tidak valid
      return;
    }

    fetchMessages(true);

    const readRoomMessages = async () => {
      try {
        await markMessagesAsRead(targetRoomId, userId);
      } catch (error) {
        console.error('Gagal menandai pesan dibaca:', error);
      }
    };
    readRoomMessages();

    const interval = setInterval(() => {
      fetchMessages(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [targetRoomId, userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending || !userId || !targetRoomId) return;

    try {
      setIsSending(true);
      await sendMessage(targetRoomId, userId, newMessage.trim());
      setNewMessage('');
      await fetchMessages(false);
    } catch (error) {
      alert('Gagal mengirim pesan, silakan coba lagi.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#F4F9FF] flex flex-col'>
      <Navbar variant='clean' />

      <main className='max-w-3xl mx-auto w-full py-6 md:py-8 px-4 flex-grow flex flex-col h-[calc(100vh-140px)]'>
        {/* CHAT HEADER */}
        <div className='bg-white rounded-t-[24px] border-b border-slate-100 p-4 flex items-center gap-3 shadow-xs'>
          <button
            onClick={handleBackNavigation}
            className='p-2 hover:bg-slate-50 rounded-xl transition-all'
          >
            <ArrowLeft size={20} className='text-slate-600' />
          </button>
          <div className='w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600'>
            {userRole === 'penjual' ? <User size={20} /> : <Store size={20} />}
          </div>
          <div>
            {/* DISINI PERUBAHANNYA: Menggunakan state shopName */}
            <h2 className='text-sm font-black text-slate-800处理 leading-tight capitalize'>
              {shopName}
            </h2>
            <p className='text-[11px] text-emerald-500 font-bold uppercase tracking-wider mt-0.5'>Online</p>
          </div>
        </div>

        {/* CHAT MESSAGES BODY */}
        <div className='flex-grow bg-white p-4 overflow-y-auto space-y-4 border-x border-slate-50 flex flex-col'>
          {isLoading ? (
            <div className='flex flex-col items-center justify-center my-auto text-slate-400'>
              <Loader2 className='w-8 h-8 animate-spin mb-2 text-[#FF6B35]' />
              <p className='text-xs font-bold uppercase tracking-wider'>Memuat Obrolan...</p>
            </div>
          ) : messages.length > 0 ? (
            messages.map((msg) => {
              const isMe = Number(msg.sender_id) === userId;
              return (
                <div
                  key={msg.message_id}
                  className={`flex flex-col max-w-[75%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div
                    className={`p-3.5 rounded-2xl text-sm font-medium shadow-xs break-words w-full ${isMe
                        ? 'bg-[#FF6B35] text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none'
                      }`}
                  >
                    {msg.message}
                  </div>
                  <span className='text-[10px] text-slate-400 mt-1 px-1'>
                    {new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    {isMe && (
                      <span className={`ml-1 font-bold ${msg.is_read ? 'text-blue-500' : 'text-slate-300'}`}>
                        {msg.is_read ? ' • Dibaca' : ' • Terkirim'}
                      </span>
                    )}
                  </span>
                </div>
              );
            })
          ) : (
            <div className='text-center my-auto py-10'>
              <div className='w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-orange-100'>
                <Send size={20} className='rotate-45 -translate-x-0.5 translate-y-0.5' />
              </div>
              <p className='text-slate-400 font-bold text-sm'>Belum ada percakapan.</p>
              <p className='text-slate-400 text-xs mt-1'>Kirim pesan pertama Anda ke {shopName} di bawah ini.</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* CHAT INPUT FOOTER */}
        <form
          onSubmit={handleSendMessage}
          className='bg-white p-3 rounded-b-[24px] border-t border-slate-100 flex items-center gap-2 shadow-xs'
        >
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Tulis pesan ke ${shopName}...`}
            className='flex-grow bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-all text-slate-800 font-medium'
          />
          <button
            type='submit'
            disabled={!newMessage.trim() || isSending}
            className='p-3 bg-[#FF6B35] hover:bg-[#e05626] disabled:opacity-40 text-white rounded-xl transition-all active:scale-95 flex items-center justify-center flex-shrink-0'
          >
            {isSending ? <Loader2 size={18} className='animate-spin' /> : <Send size={18} />}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ChatRoomPage;