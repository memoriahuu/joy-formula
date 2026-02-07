import apiClient from './client';
import type { JoyInsight, GenerateInsightsResponse } from '../types';

export const insightsApi = {
  /**
   * 生成快乐定律（需要至少 5 张卡片）
   */
  async generateInsights(): Promise<GenerateInsightsResponse> {
    const response = await apiClient.post<GenerateInsightsResponse>('/api/insights/generate');
    return response.data;
  },

  /**
   * 获取所有定律列表
   */
  async getInsights(): Promise<JoyInsight[]> {
    const response = await apiClient.get<JoyInsight[]>('/api/insights');
    return response.data;
  },

  /**
   * 确认定律
   */
  async confirmInsight(insightId: string): Promise<{ message: string }> {
    const response = await apiClient.put(`/api/insights/${insightId}/confirm`);
    return response.data;
  },

  /**
   * 否决定律
   */
  async rejectInsight(insightId: string): Promise<{ message: string }> {
    const response = await apiClient.put(`/api/insights/${insightId}/reject`);
    return response.data;
  },
};
