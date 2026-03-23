import { TaskPriority } from '@/types/task';

const LABELS: Record<TaskPriority, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const COLORS: Record<TaskPriority, string> = {
  critical: 'priority-critical',
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span className={`${COLORS[priority]} text-primary-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase`}>
      {LABELS[priority]}
    </span>
  );
}
