import api from './api/axios';

export const getMenuByShop = async (shop_id) => {
  try {
    const response = await api.get(`/menu/${shop_id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Gagal mengambil data menu';
  }
};

export const updateMenuData = async (menuData) => {
  try {
    // Menyesuaikan payload dengan controller backend (product_id, product_name, product_price)
    const response = await api.post('/menu/update', {
      product_id: menuData.product_id,
      product_name: menuData.product_name,
      product_price: menuData.product_price
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Gagal memperbarui data menu';
  }
};