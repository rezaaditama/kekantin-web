import React, { useState } from 'react';
import {
  Store,
  Utensils,
  ShoppingCart,
  ClipboardCheck,
  Wallet,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Impor aset gambar (pastikan path benar)
import imgRegister from '../assets/guide/register.png';
import imgLogin from '../assets/guide/login.png';
import imgHome from '../assets/guide/home.png';
import imgMenu from '../assets/guide/menu.png';
import imgNotes from '../assets/guide/notes.png';
import imgCart from '../assets/guide/cart.png';
import imgCheckout from '../assets/guide/checkout.png';
import imgPayment from '../assets/guide/payment.png';
import imgStatus from '../assets/guide/status.png';

const ManualGuide = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const steps = [
    {
      title: 'Pilih Toko',
      desc: 'Cari dan pilih kantin favoritmu yang tersedia di lingkungan UIKA.',
      icon: <Store className='w-6 h-6 text-orange-500' />,
      color: 'bg-orange-50',
    },
    {
      title: 'Pilih Menu',
      desc: 'Jelajahi menu lezat dan pilih makanan atau minuman yang kamu inginkan.',
      icon: <Utensils className='w-6 h-6 text-orange-500' />,
      color: 'bg-orange-100',
    },
    {
      title: 'Tambah ke Keranjang',
      desc: 'Masukkan pilihanmu ke keranjang dan atur jumlah porsinya.',
      icon: <ShoppingCart className='w-6 h-6 text-orange-500' />,
      color: 'bg-orange-50',
    },
    {
      title: 'Checkout Pesanan',
      desc: 'Periksa kembali pesananmu dan lakukan konfirmasi checkout.',
      icon: <ClipboardCheck className='w-6 h-6 text-orange-500' />,
      color: 'bg-orange-100',
    },
    {
      title: 'Pembayaran',
      desc: 'Selesaikan pembayaran dengan metode pilihanmu (QRIS/Digital).',
      icon: <Wallet className='w-6 h-6 text-orange-500' />,
      color: 'bg-orange-50',
    },
    {
      title: 'Selesai',
      desc: 'Pesanan diproses! Kamu tinggal menunggu notifikasi untuk mengambilnya.',
      icon: <CheckCircle2 className='w-6 h-6 text-orange-500' />,
      color: 'bg-green-50',
    },
  ];

  const gallery = [
    { name: 'Halaman Registrasi Akun', img: imgRegister, step: 'Mulai' },
    { name: 'Masuk Ke Akun Anda', img: imgLogin, step: 'Login' },
    { name: 'Dashboard Tenant Kantin', img: imgHome, step: 'Tenant' },
    { name: 'Pilihan Menu Makanan', img: imgMenu, step: 'Menu' },
    { name: 'Tambah Catatan Pesanan', img: imgNotes, step: 'Request' },
    { name: 'Cek Detail Keranjang', img: imgCart, step: 'Cart' },
    { name: 'Atur Waktu Penjemputan', img: imgCheckout, step: 'Pickup' },
    { name: 'Metode Pembayaran QRIS', img: imgPayment, step: 'Pay' },
    { name: 'Pantau Status Pesanan', img: imgStatus, step: 'Tracking' },
  ];

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));

  return (
    <div className='min-h-screen bg-[#FFFBF7] flex flex-col font-sans'>
      {localStorage.getItem('user') ? <Navbar /> : <Navbar variant='clean' />}

      <main className='max-w-4xl mx-auto px-6 py-12 md:py-20 flex-grow'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase'>
            Gak Pake <span className='text-[#F26522]'>Antre.</span>
          </h1>
          <p className='text-slate-500 font-medium max-w-md mx-auto'>
            Ikuti 6 langkah mudah berikut untuk memesan makanan di ke.kantin
            digital.
          </p>
        </div>

        {/* Steps Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-5 hover:shadow-md transition-shadow'
            >
              <div className={`${step.color} p-4 rounded-2xl shrink-0`}>
                {step.icon}
              </div>
              <div>
                <span className='text-[10px] font-black bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-widest'>
                  Langkah {index + 1}
                </span>
                <h3 className='text-lg font-bold text-slate-800'>
                  {step.title}
                </h3>
                <p className='text-sm text-slate-500 leading-relaxed mt-1'>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Guide Carousel */}
        <div className='mt-32'>
          <div className='text-center mb-10'>
            <h2 className='text-2xl font-black text-slate-800 uppercase tracking-tight'>
              Tampilan Aplikasi
            </h2>
            <div className='w-16 h-1.5 bg-[#F26522] mx-auto mt-2 rounded-full'></div>
          </div>

          <div className='relative max-w-xl mx-auto'>
            {/* Box Luar (Frame) */}
            <div className='bg-white rounded-[3rem] p-6 shadow-2xl border border-slate-100'>
              {/* Judul di Atas Gambar */}
              <div className='text-center mb-6'>
                <span className='text-[10px] font-black text-[#F26522] uppercase tracking-[0.2em] bg-orange-50 px-3 py-1 rounded-full'>
                  {gallery[currentIndex].step} - Visual Guide
                </span>
                <h3 className='text-xl font-extrabold text-slate-800 mt-2 uppercase'>
                  {gallery[currentIndex].name}
                </h3>
              </div>

              {/* Area Gambar - Dikontrol Object Contain agar tidak terpotong */}
              <div className='rounded-[2rem] overflow-hidden bg-slate-50 border-4 border-slate-50 aspect-video flex items-center justify-center group'>
                <img
                  src={gallery[currentIndex].img}
                  alt={gallery[currentIndex].name}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                />
              </div>
            </div>

            {/* Tombol Navigasi - Lebih Clean */}
            <button
              onClick={prevSlide}
              className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-[#F26522] text-white p-4 rounded-full shadow-xl hover:bg-slate-900 transition-all active:scale-90 z-10'
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextSlide}
              className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-[#F26522] text-white p-4 rounded-full shadow-xl hover:bg-slate-900 transition-all active:scale-90 z-10'
            >
              <ChevronRight size={28} />
            </button>

            {/* Indikator Status (Dots) */}
            <div className='flex justify-center gap-3 mt-10'>
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-10 bg-[#F26522]'
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        {localStorage.getItem('user') ? (
          <div className=''></div>
        ) : (
          <div className='mt-24 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-[#F26522] rounded-full -translate-y-16 translate-x-16 opacity-20 blur-2xl'></div>
            <h2 className='text-3xl font-black mb-4 italic tracking-tighter uppercase'>
              Sudah Mengerti?
            </h2>
            <p className='opacity-70 mb-10 text-sm md:text-lg max-w-sm mx-auto'>
              Ayo rasakan kemudahan pesan makanan tanpa antre sekarang juga!
            </p>
            <button
              onClick={() => navigate('/beranda')}
              className='bg-[#F26522] text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 mx-auto hover:bg-white hover:text-[#F26522] transition-all active:scale-95 shadow-lg shadow-orange-900/20'
            >
              Mulai Belanja <ArrowRight size={24} />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ManualGuide;
