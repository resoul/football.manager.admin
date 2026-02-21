const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';
const ADMIN_AUTH_BASE = `${API_BASE}/admin/auth`;
const ADMIN_USERS_BASE = `${API_BASE}/admin/users`;

export const ADMIN_TOKEN_KEY = 'fm-admin-auth-token';
export const ADMIN_EMAIL_KEY = 'fm-admin-auth-email';

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
  }
}

export type AdminUser = {
  id: number;
  uuid?: string;
  email: string;
  email_verified: boolean;
  email_verified_at?: number;
  created_at: number;
  updated_at: number;
};

export type AdminCountry = {
  id: number;
  code: string;
  name: string;
};

export type AdminManager = {
  id: number;
  user_id: number;
  name: string;
  status: 'active' | 'inactive' | 'banned' | 'blocked';
  country_id?: number;
  avatar?: string;
  country?: AdminCountry;
  created_at: number;
  updated_at: number;
};

export type AdminCareer = {
  id: number;
  manager_id: number;
  name: string;
  created_at: number;
  updated_at: number;
};

export type AdminUserRow = {
  user: AdminUser;
  manager?: AdminManager;
  careers: AdminCareer[];
};

export type AdminUsersResponse = {
  users: AdminUserRow[];
  total: number;
  page: number;
  page_size: number;
};

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const data = payload as Record<string, unknown>;
  if (typeof data.message === 'string' && data.message.trim()) {
    return data.message;
  }
  if (typeof data.error === 'string' && data.error.trim()) {
    return data.error;
  }
  return fallback;
}

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : {};
}

function getStoredToken(): string {
  return localStorage.getItem(ADMIN_TOKEN_KEY)?.trim() ?? '';
}

export async function adminLogin(email: string, password: string): Promise<{
  token: string;
  role?: string;
  user?: { email?: string };
  message?: string;
}> {
  const response = await fetch(`${ADMIN_AUTH_BASE}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const payload = (await parseResponse(response)) as {
    token?: string;
    role?: string;
    user?: { email?: string };
    message?: string;
  };

  if (!response.ok || !payload.token) {
    throw new AdminApiError(getErrorMessage(payload, 'Login failed'), response.status);
  }

  return {
    token: payload.token,
    role: payload.role,
    user: payload.user,
    message: payload.message,
  };
}

export async function adminCheck(token: string): Promise<{ status?: string; role?: string }> {
  const response = await fetch(`${ADMIN_AUTH_BASE}/check`, {
    method: 'GET',
    credentials: 'include',
    headers: { Authorization: `Bearer ${token}` },
  });

  const payload = (await parseResponse(response)) as { status?: string; role?: string };
  if (!response.ok || payload.status !== 'ok') {
    throw new AdminApiError(getErrorMessage(payload, 'Unauthorized'), response.status);
  }

  return payload;
}

export async function adminUsersList(page: number, pageSize: number): Promise<AdminUsersResponse> {
  const token = getStoredToken();
  if (!token) {
    throw new AdminApiError('Unauthorized', 401);
  }

  const response = await fetch(`${ADMIN_USERS_BASE}?page=${page}&page_size=${pageSize}`, {
    method: 'GET',
    credentials: 'include',
    headers: { Authorization: `Bearer ${token}` },
  });

  const payload = (await parseResponse(response)) as AdminUsersResponse;
  if (!response.ok) {
    throw new AdminApiError(getErrorMessage(payload, 'Failed to load users'), response.status);
  }

  return payload;
}
