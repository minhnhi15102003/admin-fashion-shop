export interface SignUpFormData {
  email: string;
  userName: string;
  password: string;
  name: string;
  phone: string;
}

export interface SignInFormData {
  email: string;
  password: string;
  role?: string; 
}

export interface ProfileUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  name: string;
  role: string;
  userName: string;
  phone: string;
  hasAddress: boolean;
  resetCode: string | null;
  resetCodeExpiry: string | null;
}

export interface LoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: ProfileUser;
}

