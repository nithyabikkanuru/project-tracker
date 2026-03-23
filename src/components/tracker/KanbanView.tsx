import { useMemo, useState } from 'react';
import { Task, TaskStatus, ALL_STATUSES, STATUS_LABELS } from '@/types/task';
import { useTaskStore } from '@/store/taskStore';
import { TaskCard } from './TaskCard';

const STATUS_DOT_COLORS: Record<TaskStatus, string> = {
  'todo': 'bg-yellow-400',
  'in-progress': 'bg-blue-500',
  'in-review': 'bg-purple-500',
  'done': 'bg-green-500',
};

export function KanbanView() {
  const tasks = useTaskStore((s) => s.tasks);
  const filters = useTaskStore((s) => s.filters);
  const moveTask = useTaskStore((s) => s.moveTask);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

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

  function handleDragStart(e: React.DragEvent, task: Task) {
    e.dataTransfer.setData('taskId', task.id);
  }

  function handleDragOver(e: React.DragEvent, status: TaskStatus) {
    e.preventDefault();
    setDragOverColumn(status);
  }

  function handleDrop(e: React.DragEvent, status: TaskStatus) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) moveTask(taskId, status);
    setDragOverColumn(null);
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-180px)]">
      {ALL_STATUSES.map((status) => {
        const columnTasks = filteredTasks.filter((t) => t.status === status);
        const isOver = dragOverColumn === status;

        return (
          <div
            key={status}
            onDragOver={(e) => handleDragOver(e, status)}
            onDrop={(e) => handleDrop(e, status)}
            onDragLeave={() => setDragOverColumn(null)}
            className={`flex flex-col min-w-[270px] w-[270px] shrink-0 rounded-xl ${isOver ? 'bg-primary/5' : 'bg-muted/40'}`}
          >
            <div className="flex items-center justify-between px-3 py-3">
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT_COLORS[status]}`} />
                <h3 className="text-sm font-semibold text-foreground">{STATUS_LABELS[status]}</h3>
              </div>
              <span className="text-xs text-muted-foreground bg-background rounded-full px-2 py-0.5">
                {columnTasks.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2 scrollbar-thin">
              {columnTasks.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-8">No tasks</p>
              )}
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} onDragStart={handleDragStart} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
