import apiClient from './client';
import type { ChatStartResponse, ChatMessageRequest, ChatMessageResponse } from '../types';

export const chatApi = {
  /**
   * 开始新的对话会话
   */
  async startChat(): Promise<ChatStartResponse> {
    const response = await apiClient.post<ChatStartResponse>('/api/chat/start');
    return response.data;
  },

  /**
   * 发送消息到 AI Coach
   */
  async sendMessage(sessionId: string, message: string): Promise<ChatMessageResponse> {
    const request: ChatMessageRequest = {
      session_id: sessionId,
      message: message,
    };
    const response = await apiClient.post<ChatMessageResponse>('/api/chat/message', request);
    return response.data;
  },
};
