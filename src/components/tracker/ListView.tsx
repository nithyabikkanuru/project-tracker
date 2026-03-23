import { useMemo } from 'react';
import { useTaskStore } from '@/store/taskStore';
import { ALL_STATUSES, STATUS_LABELS } from '@/types/task';
import { PriorityBadge } from './PriorityBadge';
import { UserAvatar } from './UserAvatar';
import { formatDueDate } from '@/lib/dateUtils';

export function ListView() {
  const tasks = useTaskStore((s) => s.tasks);
  const filters = useTaskStore((s) => s.filters);
  const moveTask = useTaskStore((s) => s.moveTask);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.assignee && task.assignee.id !== filters.assignee) return false;
      if (filters.dateFrom && task.dueDate < filters.dateFrom) return false;
      if (filters.dateTo && task.dueDate > filters.dateTo) return false;
      return true;
    });
  }, [tasks, filters]);

  if (filteredTasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">
        No tasks match your filters
      </div>
    );
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card h-[calc(100vh-180px)] flex flex-col">
      <div className="grid grid-cols-[1fr_100px_120px_80px_130px] px-4 py-2 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase">
        <span>Task</span>
        <span>Priority</span>
        <span>Due Date</span>
        <span>Assignee</span>
        <span>Status</span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredTasks.map((task) => {
          const { label, isOverdue } = formatDueDate(task.dueDate);
          return (
            <div key={task.id} className="grid grid-cols-[1fr_100px_120px_80px_130px] items-center px-4 py-2.5 border-b border-border/50 hover:bg-muted/20 text-sm">
              <span className="font-medium text-foreground truncate pr-2">{task.title}</span>
              <span><PriorityBadge priority={task.priority} /></span>
              <span className={`text-xs ${isOverdue ? 'text-destructive' : 'text-muted-foreground'}`}>{label}</span>
              <span><UserAvatar user={task.assignee} /></span>
              <select
                value={task.status}
                onChange={(e) => moveTask(task.id, e.target.value as any)}
                className="text-xs border border-input rounded-md px-2 py-1 bg-card text-foreground"
              >
                {ALL_STATUSES.map((status) => (
                  <option key={status} value={status}>{STATUS_LABELS[status]}</option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2 text-xs text-muted-foreground border-t border-border bg-muted/20">
        {filteredTasks.length} tasks
      </div>
    </div>
  );
}
