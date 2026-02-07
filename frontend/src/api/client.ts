import axios, { AxiosInstance, AxiosError } from 'axios';

// 创建 axios 实例
const apiClient: AxiosInstance = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 添加固定的测试用户 ID
    config.headers['X-User-ID'] = 'test-user-001';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // 统一错误处理
    if (error.response) {
      // 服务器返回错误状态码
      const status = error.response.status;
      const data = error.response.data as { detail?: string };
      
      switch (status) {
        case 400:
          console.error('请求错误:', data.detail || '参数错误');
          break;
        case 404:
          console.error('资源不存在:', data.detail || '未找到');
          break;
        case 500:
          console.error('服务器错误:', data.detail || '服务器内部错误');
          break;
        default:
          console.error('请求失败:', data.detail || error.message);
      }
    } else if (error.request) {
      // 请求发送失败
      console.error('网络错误: 无法连接到服务器');
    } else {
      console.error('错误:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
