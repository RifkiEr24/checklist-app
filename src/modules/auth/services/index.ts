import apiClient from '@/lib/axios';
import { AuthResponse, LoginPayload, RegisterPayload } from '../types';

export const login = (payload: LoginPayload): Promise<AuthResponse> => {
  return apiClient.post('/login', payload);
};

export const register = (payload: RegisterPayload): Promise<AuthResponse> => {
  return apiClient.post('/register', payload);
};

