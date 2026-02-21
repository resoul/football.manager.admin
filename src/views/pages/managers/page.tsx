import { useEffect, useMemo, useState } from 'react';
import { adminUsersList, type AdminUserRow } from '@/lib/admin-api';

const PAGE_SIZE = 20;

export function ManagersListPage() {
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
        setError(err instanceof Error ? err.message : 'Failed to load managers');
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [page]);

  const managers = useMemo(
    () => rows.filter((row) => row.manager),
    [rows],
  );
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="container-fluid space-y-5 lg:space-y-9">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-foreground">Managers</h1>
          <span className="text-sm text-muted-foreground">List of manager profiles from admin users feed.</span>
        </div>
      </div>

      {loading ? <div className="text-sm text-muted-foreground">Loading...</div> : null}
      {error ? <div className="text-sm text-red-500">{error}</div> : null}

      {!loading && !error ? (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-3">Manager</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Careers</th>
              </tr>
            </thead>
            <tbody>
              {managers.length === 0 ? (
                <tr>
                  <td className="px-4 py-3 text-muted-foreground" colSpan={5}>
                    No managers found
                  </td>
                </tr>
              ) : (
                managers.map((row) => (
                  <tr key={row.user.id} className="border-t border-border/60">
                    <td className="px-4 py-3">{row.manager?.name || '—'}</td>
                    <td className="px-4 py-3">{row.user.email}</td>
                    <td className="px-4 py-3 capitalize">{row.manager?.status || '—'}</td>
                    <td className="px-4 py-3">{row.manager?.country?.name || '—'}</td>
                    <td className="px-4 py-3">{row.careers.length}</td>
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
