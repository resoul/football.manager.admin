import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  adminCheck,
  adminLogin,
  ADMIN_EMAIL_KEY,
  AdminApiError,
  ADMIN_TOKEN_KEY,
} from '@/lib/admin-api';

type LoginResult = {
  success: boolean;
  error?: string;
};

type AdminAuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string;
  email: string;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

function getStoredToken(): string {
  return localStorage.getItem(ADMIN_TOKEN_KEY)?.trim() ?? '';
}

function clearAuthStorage() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_EMAIL_KEY);
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState(localStorage.getItem(ADMIN_EMAIL_KEY) ?? '');

  const logout = useCallback(() => {
    clearAuthStorage();
    setIsAuthenticated(false);
    setRole('');
    setEmail('');
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      const token = getStoredToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const result = await adminCheck(token);
        setIsAuthenticated(true);
        setRole(result.role ?? '');
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrap();
  }, [logout]);

  const login = useCallback(async (nextEmail: string, password: string): Promise<LoginResult> => {
    try {
      const result = await adminLogin(nextEmail, password);
      localStorage.setItem(ADMIN_TOKEN_KEY, result.token);

      const resolvedEmail = result.user?.email ?? nextEmail;
      localStorage.setItem(ADMIN_EMAIL_KEY, resolvedEmail);

      setEmail(resolvedEmail);
      setRole(result.role ?? '');
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      if (error instanceof AdminApiError) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Network error. Check API availability.' };
    }
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        role,
        email,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextType {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
