import apiClient from './client';
import type { JoyCard, JoyCardListResponse } from '../types';

export const cardsApi = {
  /**
   * 获取卡片列表（分页）
   */
  async getCards(skip: number = 0, limit: number = 20): Promise<JoyCardListResponse> {
    const response = await apiClient.get<JoyCardListResponse>('/api/cards', {
      params: { skip, limit },
    });
    return response.data;
  },

  /**
   * 获取单个卡片详情
   */
  async getCard(cardId: string): Promise<JoyCard> {
    const response = await apiClient.get<JoyCard>(`/api/cards/${cardId}`);
    return response.data;
  },

  /**
   * 删除卡片
   */
  async deleteCard(cardId: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/api/cards/${cardId}`);
    return response.data;
  },
};
