import apiClient from './client';
import type { ExplorationRequest, ExplorationResponse } from '../types';

export const explorationApi = {
  /**
   * 根据能量值获取快乐推荐
   */
  async getRecommendations(energyLevel: number): Promise<ExplorationResponse> {
    const request: ExplorationRequest = {
      energy_level: energyLevel,
    };
    const response = await apiClient.post<ExplorationResponse>('/api/exploration/recommend', request);
    return response.data;
  },
};
