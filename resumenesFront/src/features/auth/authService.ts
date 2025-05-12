// src/features/auth/authService.ts
import { api } from './../../utils/api';

type LoginResponse = {
  token: string;
  userId: number;
  email: string;
  writer: boolean;
};

export const login = async (email: string, password: string) => {
  const data = await api<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });

  return {
    token: data.token,
    user: {
      userId: data.userId,
      email: data.email,
      writer: data.writer,
    },
  };
};

export const register = async (payload: {
  email: string;
  password: string;
  writer: boolean;
  estilo: string;
}) => {
  const data = await api<LoginResponse>('/auth/register', {
    method: 'POST',
    body: payload,
  });

  return {
    token: data.token,
    user: {
      userId: data.userId,
      email: data.email,
      writer: data.writer,
    },
  };
};
