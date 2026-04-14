import api from './api/axios';

export const getAllToko = async () => {
  try {
    const response = await api.get('/toko');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Gagal mengambil data toko';
  }
};

export const getTokoById = async (shop_id) => {
  try {
    const response = await api.get(`/toko/${shop_id}`);
    return Array.isArray(response.data) ? response.data[0] : response.data;
  } catch (error) {
    throw error;
  }
};
