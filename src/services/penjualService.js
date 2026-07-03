import api from './api/axios';

// Mengambil data ringkasan beranda penjual (Menggunakan /penjual/dashboard/)
export const getBerandaPenjual = async (userId) => {
  try {
    const response = await api.get(`/penjual/dashboard/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Gagal memuat data beranda penjual';
  }
};

// Mengambil daftar lengkap pesanan aktif milik toko (Menggunakan /penjual/pesanan-aktif/)
export const getPesananAktif = async (userId) => {
  try {
    const response = await api.get(`/penjual/pesanan-aktif/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Gagal memuat daftar pesanan aktif';
  }
};

// Mengubah status pesanan menjadi Selesai (Menggunakan /penjual/selesaikan-pesanan)
export const updateStatusSelesai = async (orderId) => {
  try {
    const response = await api.post('/penjual/selesaikan-pesanan', { order_id: orderId });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Gagal memperbarui status pesanan';
  }
};

// Mengambil riwayat penjualan yang sudah selesai (Menggunakan /penjual/riwayat/)
export const getRiwayatPenjualan = async (userId) => {
  try {
    const response = await api.get(`/penjual/riwayat/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Gagal memuat riwayat penjualan';
  }
};

// Memperbarui profil akun penjual dan nama toko sekaligus (Menggunakan /penjual/update-profile)
export const updateProfilePenjual = async (profileData) => {
  try {
    const response = await api.post('/penjual/update-profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Gagal memperbarui profil penjual';
  }
};