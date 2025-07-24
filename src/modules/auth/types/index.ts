export interface User {
  id: string; 
  username: string;
  email: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  errorMessage: string | null;
  data: {
  token: string;
  };
}

