import api from './api/axios';

// Struktur ideal di dalam chatService.js kamu
export const getOrCreateChatRoom = async (userId, shopId) => {
  try {
    const response = await api.post('/chat/room', {
      user_id: userId,
      shop_id: shopId
    });
    return response.data;
  } catch (error) {
    console.error('Error di getOrCreateChatRoom Service:', error);
    throw error;
  }
};

export const getUserChatList = async (userId) => {
  try {
    const response = await api.get(`/list/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatMessages = async (roomId) => {
  try {
    const response = await api.get(`/messages/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error in getChatMessages:', error);
    throw error;
  }
};

export const sendMessage = async (roomId, senderId, messageText) => {
  try {
    const response = await api.post(`/message`, {
      room_id: roomId,
      sender_id: senderId,
      message: messageText,
    });
    return response.data;
  } catch (error) {
    console.error('Error in sendMessage:', error);
    throw error;
  }
};

export const markMessagesAsRead = async (roomId, viewerId) => {
  try {
    const response = await api.post(`/read-messages`, {
      room_id: roomId,
      viewer_id: viewerId,
    });
    return response.data;
  } catch (error) {
    console.error('Error in markMessagesAsRead:', error);
    throw error;
  }
};