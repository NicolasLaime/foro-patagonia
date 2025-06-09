export interface LoginRequest{
    email:string,
    password:string
}


export interface LoginResponse{
    token:string
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: string;
}

export interface RegisterResponse {
  message: string;
}