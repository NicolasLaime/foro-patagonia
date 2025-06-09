import axios from "axios";
import backendUrl from "../api/BackendUrl";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./AuthInterface";

const API_URL = `${backendUrl}/auth`;

export const login = async(data:LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, data)
  return response.data
}

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(`${API_URL}/register`, data);
  return response.data;
};