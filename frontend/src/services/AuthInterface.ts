export interface LoginRequest{
    email:string,
    password:string
}


export interface LoginResponse{
    token:string;
    role:"ADMIN" | "USER"
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}