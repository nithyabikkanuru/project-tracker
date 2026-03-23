import { useTaskStore } from '@/store/taskStore';
import { ALL_STATUSES, ALL_PRIORITIES, STATUS_LABELS } from '@/types/task';
import { USERS } from '@/data/seed';

const PRIORITY_LABELS = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

function updateURL(filters: any) {
  const params = new URLSearchParams();

  if (filters.status) params.set('status', filters.status);
  if (filters.priority) params.set('priority', filters.priority);
  if (filters.assignee) params.set('assignee', filters.assignee);
  if (filters.dateFrom) params.set('from', filters.dateFrom);
  if (filters.dateTo) params.set('to', filters.dateTo);

  const query = params.toString();
  const newURL = query ? `?${query}` : '/';

  window.history.replaceState({}, '', newURL);
}

export function FilterBar() {
  const filters = useTaskStore((s) => s.filters);
  const setFilters = useTaskStore((s) => s.setFilters);
  const clearFilters = useTaskStore((s) => s.clearFilters);

  const hasFilters =
    filters.status !== '' ||
    filters.priority !== '' ||
    filters.assignee !== '' ||
    filters.dateFrom !== '' ||
    filters.dateTo !== '';

  return (
    <div className="flex items-center gap-3 flex-wrap">
      
      {/* STATUS */}
      <select
        value={filters.status}
        onChange={(e) => {
          const newFilters = { ...filters, status: e.target.value };
          setFilters(newFilters);
          updateURL(newFilters);
        }}
        className="text-xs border border-input rounded-md px-2 py-1.5 bg-card text-foreground"
      >
        <option value="">Status ▾</option>
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>

      {/* PRIORITY */}
      <select
        value={filters.priority}
        onChange={(e) => {
          const newFilters = { ...filters, priority: e.target.value };
          setFilters(newFilters);
          updateURL(newFilters);
        }}
        className="text-xs border border-input rounded-md px-2 py-1.5 bg-card text-foreground"
      >
        <option value="">Priority ▾</option>
        {ALL_PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {PRIORITY_LABELS[p as keyof typeof PRIORITY_LABELS]}
          </option>
        ))}
      </select>

      {/* ASSIGNEE */}
      <select
        value={filters.assignee}
        onChange={(e) => {
          const newFilters = { ...filters, assignee: e.target.value };
          setFilters(newFilters);
          updateURL(newFilters);
        }}
        className="text-xs border border-input rounded-md px-2 py-1.5 bg-card text-foreground"
      >
        <option value="">Assignee ▾</option>
        {USERS.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      {/* DATE FILTER */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>From</span>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => {
            const newFilters = { ...filters, dateFrom: e.target.value };
            setFilters(newFilters);
            updateURL(newFilters);
          }}
          className="border border-input rounded-md px-2 py-1.5 bg-card text-foreground text-xs"
        />

        <span>To</span>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => {
            const newFilters = { ...filters, dateTo: e.target.value };
            setFilters(newFilters);
            updateURL(newFilters);
          }}
          className="border border-input rounded-md px-2 py-1.5 bg-card text-foreground text-xs"
        />
      </div>

      {/* CLEAR BUTTON */}
      {hasFilters && (
        <button
          onClick={() => {
            clearFilters();
            window.history.replaceState({}, '', '/');
          }}
          className="text-xs font-medium text-destructive hover:text-destructive/80"
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
}