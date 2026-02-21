import { useEffect, useState } from 'react';
import { adminUsersList, type AdminUserRow } from '@/lib/admin-api';

const PAGE_SIZE = 20;

export function UsersListPage() {
  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await adminUsersList(page, PAGE_SIZE);
        setRows(result.users ?? []);
        setTotal(result.total ?? 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="container-fluid space-y-5 lg:space-y-9">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-foreground">Users</h1>
          <span className="text-sm text-muted-foreground">All registered users.</span>
        </div>
      </div>

      {loading ? <div className="text-sm text-muted-foreground">Loading...</div> : null}
      {error ? <div className="text-sm text-red-500">{error}</div> : null}

      {!loading && !error ? (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Verified</th>
                <th className="px-4 py-3">Manager</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td className="px-4 py-3 text-muted-foreground" colSpan={5}>
                    No users found
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.user.id} className="border-t border-border/60">
                    <td className="px-4 py-3">{row.user.id}</td>
                    <td className="px-4 py-3">{row.user.email}</td>
                    <td className="px-4 py-3">{row.user.email_verified ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3">{row.manager?.name || '—'}</td>
                    <td className="px-4 py-3">{new Date(row.user.created_at * 1000).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <button
          className="rounded-md border border-border px-3 py-1.5 text-sm disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
        <button
          className="rounded-md border border-border px-3 py-1.5 text-sm disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
