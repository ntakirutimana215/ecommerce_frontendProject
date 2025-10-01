import api from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullname: string;
  email: string;
  password: string;
  confirmpassword: string;
  role?: string;
}

export interface OtpData {
  email: string;
  otp: string;
}

export interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
  redirectTo: string;
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/users/login', data);
    return response.data;
  },

  async verifyOtp(data: OtpData): Promise<AuthResponse> {
    const response = await api.post('/users/verify-otp', data);
    return response.data;
  },

  async register(data: RegisterData): Promise<{ message: string; redirectTo: string }> {
    const response = await api.post('/users/register', data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/users/me');
    return response.data.user;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  
};
