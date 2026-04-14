import api from './api/axios';

export const getMenuByShop = async (shop_id) => {
  try {
    const response = await api.get(`/menu/${shop_id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Gagal mengambil data menu';
  }
};
