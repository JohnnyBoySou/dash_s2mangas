import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

interface RequestOptions {
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  token?: string;
  skipAuth?: boolean; // Para pular a autenticação automática em casos específicos
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  ok: boolean;
}

const baseHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || 'http://localhost:3000';

// Validação para garantir que a BASE_URL nunca seja undefined ou vazia
if (!BASE_URL || BASE_URL === 'undefined') {
  console.error('❌ NEXT_PUBLIC_API_BASE_URL não está configurada corretamente!');
  throw new Error('Configuração de API inválida. Verifique as variáveis de ambiente.');
}

// Função para pegar o token do localStorage
function getStoredToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

async function request<T = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { headers = {}, body, token, skipAuth = false } = options;

  const requestHeaders = {
    ...baseHeaders,
    ...headers,
  };

  // Se um token foi fornecido explicitamente, use-o
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  } 
  // Caso contrário, se não for para pular a autenticação, tente pegar o token do localStorage
  else if (!skipAuth) {
    const storedToken = getStoredToken();
    if (storedToken) {
      requestHeaders['Authorization'] = `Bearer ${storedToken}`;
    }
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body && method !== 'GET') {
    requestOptions.body = JSON.stringify(body);
  }

  const fullUrl = BASE_URL + url;

  try {
    const response = await fetch(fullUrl, requestOptions);
    
    // Verifica se a resposta tem conteúdo para fazer parse do JSON
    let data = null;
    const contentType = response.headers.get('content-type');
    const hasJsonContent = contentType && contentType.includes('application/json');
    
    // Só tenta fazer parse do JSON se houver conteúdo e for JSON
    if (hasJsonContent && response.status !== 204) {
      const text = await response.text();
      if (text) {
        data = JSON.parse(text);
      }
    }
    
    return {
      data,
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    console.error(`❌ Erro na requisição HTTP para ${fullUrl}:`, error);
    throw error;
  }
}

export function get<T = unknown>(url: string, options: Omit<RequestOptions, 'body'> = {}): Promise<ApiResponse<T>> {
  return request<T>(url, 'GET', options);
}

export function post<T = unknown>(url: string, body?: Record<string, unknown>, options: Omit<RequestOptions, 'body'> = {}): Promise<ApiResponse<T>> {
  return request<T>(url, 'POST', { ...options, body });
}

export function put<T = unknown>(url: string, body?: Record<string, unknown>, options: Omit<RequestOptions, 'body'> = {}): Promise<ApiResponse<T>> {
  return request<T>(url, 'PUT', { ...options, body });
}

export function patch<T = unknown>(url: string, body?: Record<string, unknown>, options: Omit<RequestOptions, 'body'> = {}): Promise<ApiResponse<T>> {
  return request<T>(url, 'PATCH', { ...options, body });
}

export function del<T = unknown>(url: string, body?: Record<string, unknown>, options: Omit<RequestOptions, 'body'> = {}): Promise<ApiResponse<T>> {
  return request<T>(url, 'DELETE', { ...options, body });
}
