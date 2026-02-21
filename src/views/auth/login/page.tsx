import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminAuth } from '@/providers/admin-auth-provider';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const result = await login(email.trim(), password);
    if (!result.success) {
      setError(result.error ?? 'Login failed');
      setSubmitting(false);
      return;
    }

    navigate('/dashboard', { replace: true });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
        <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.18em] text-emerald-300/80">FM Admin</p>
          <h1 className="mt-3 text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-white/60">Sign in to access the admin panel.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-white/70">
                Email
              </label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@club.com"
                required
                className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/25 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-white/70">
                Password
              </label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/25 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
              />
            </div>

            {error ? <p className="text-sm text-red-300">{error}</p> : null}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50"
              size="lg"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
