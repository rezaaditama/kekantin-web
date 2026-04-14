import api from './api/axios';

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email,
      password,
      role: 'pembeli',
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Terjadi kesalahan saat login';
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.post('/update-user', userData);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Koneksi server gagal');
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registrasi gagal';
  }
};
