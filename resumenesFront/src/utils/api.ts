// api.ts
//En deployment y pruebas locales en docker-compose
const API_URL = '/api'; // ahora es relativa


//Para probar en local host (sin usar docker-compose)
//const API_URL = 'http://localhost:8080';


const getToken = () => localStorage.getItem('token');

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
  method?: Method;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

const buildUrl = (url: string, params?: Record<string, any>) => {
  if (!params) return `${API_URL}${url}`;
  const query = new URLSearchParams(params).toString();
  return `${API_URL}${url}?${query}`;
};

export async function api<T>(
  url: string,
  { method = 'GET', body, headers = {}, params }: FetchOptions = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(buildUrl(url, params), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error ${res.status}: ${error}`);
  }

  return res.json();
}

export async function uploadFormData<T>(
  url: string,
  formData: FormData,
  method: 'POST' | 'PUT' = 'POST'
): Promise<T> {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    // No añadir Content-Type aquí
  };

  const res = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  return res.status === 204 ? ({} as T) : await res.json();
}

