
import { get, post } from "./api-service"

// QUERY_KEYS
const LOGIN_USER = "LOGIN_USER"
const REGISTER_USER = "REGISTER_USER"
const VERIFY_EMAIL = "VERIFY_EMAIL"
const GET_PROFILE = "GET_PROFILE"
const UPDATE_PROFILE = "UPDATE_PROFILE"
const DELETE_ACCOUNT = "DELETE_ACCOUNT"

const ROUTE_API = "/auth"

// INTERFACES
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  avatar?: string
  cover?: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    username: string
    bio?: string
    avatar?: string
    cover?: string
    createdAt: string
    birthdate?: string
    categories?: Array<{ id: string; name: string }>
    languages?: Array<{ id: string; name: string }>
    coins?: number
  }
}

export interface RegisterResponse {
  message: string
}

export interface VerifyEmailRequest {
  email: string
  code: string
}

export interface VerifyEmailResponse {
  message: string
}

export interface ProfileResponse {
  id: string
  name: string
  email: string
  username: string
  bio?: string
  avatar?: string
  cover?: string
  createdAt: string
  birthdate?: string
  categories?: Array<{ id: string; name: string }>
  languages?: Array<{ id: string; name: string }>
  coins?: number
}

// FUNCTIONS
export const AuthService = {
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  },

  async login(data: LoginRequest): Promise<LoginResponse | null> {
    try {
      // Para login, não precisamos de autenticação
      const res = await post<LoginResponse>(`${ROUTE_API}/login`, data as unknown as Record<string, unknown>, { skipAuth: true })
      console.log(res.data)
      return res?.data as LoginResponse
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro no login')
    }
  },

  async register(data: RegisterRequest): Promise<RegisterResponse | null> {
    try {
      // Para registro, não precisamos de autenticação
      const res = await post<RegisterResponse>(`${ROUTE_API}/register`, data as unknown as Record<string, unknown>, { skipAuth: true })
      console.log(res.data)
      return res?.data as RegisterResponse
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro no registro')
    }
  },

  async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse | null> {
    try {
      // Para verificação de email, não precisamos de autenticação
      const res = await post<VerifyEmailResponse>(`${ROUTE_API}/verify-email`, data as unknown as Record<string, unknown>, { skipAuth: true })
      console.log(res.data)
      return res?.data as VerifyEmailResponse
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro na verificação de email')
    }
  },

  async getProfile(): Promise<ProfileResponse | null> {
    try {
      // O token será pego automaticamente pelo api-service
      const res = await get<ProfileResponse>(`${ROUTE_API}/me`)
      console.log(res.data)
      return res?.data as ProfileResponse
    } catch (error) {
      console.log(error)
      return null
    }
  },

  async updateProfile(data: Partial<ProfileResponse>): Promise<ProfileResponse | null> {
    try {
      // O token será pego automaticamente pelo api-service
      const res = await post<ProfileResponse>(`${ROUTE_API}/me`, data as unknown as Record<string, unknown>)
      console.log(res.data)
      return res?.data as ProfileResponse
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao atualizar perfil')
    }
  },

  async deleteAccount(): Promise<{ message: string; success: boolean } | null> {
    try {
      // O token será pego automaticamente pelo api-service
      const res = await post<{ message: string; success: boolean }>(`${ROUTE_API}/me/delete`, {})
      console.log(res.data)
      return res?.data as { message: string; success: boolean }
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro ao deletar conta')
    }
  },

  QUERY_KEY: {
    LOGIN_USER,
    REGISTER_USER,
    VERIFY_EMAIL,
    GET_PROFILE,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
  }
}