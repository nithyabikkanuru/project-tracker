import { Task } from '@/types/task';
import { formatDueDate } from '@/lib/dateUtils';
import { PriorityBadge } from './PriorityBadge';
import { UserAvatar } from './UserAvatar';
import { useCollaboration } from '@/hooks/useCollaboration';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

export function TaskCard({ task, onDragStart }: TaskCardProps) {

  const { label, isOverdue } = formatDueDate(task.dueDate);

  //  simulated users
  const viewers = useCollaboration();

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className="relative rounded-lg border border-border bg-card p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >

      {/* collaboration avatars */}
      <div className="absolute top-1 right-1 flex -space-x-1">
        {viewers
          .filter((v) => v.taskId === task.id)
          .map((v) => (
            <div
              key={v.id}
              className="w-4 h-4 rounded-full border border-white"
              style={{ background: v.color }}
            />
          ))}
      </div>

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-medium text-card-foreground line-clamp-2">
          {task.title}
        </h3>

        <PriorityBadge priority={task.priority} />
      </div>

      <div className="flex items-center justify-between mt-3">
        <UserAvatar user={task.assignee} />

        <span
          className={`text-xs font-medium ${
            isOverdue ? 'text-destructive' : 'text-muted-foreground'
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}