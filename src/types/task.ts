export type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'done';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export interface User {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: User;
  startDate?: string;
  dueDate: string;
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'in-review': 'In Review',
  'done': 'Done',
};

export const ALL_STATUSES: TaskStatus[] = ['todo', 'in-progress', 'in-review', 'done'];
export const ALL_PRIORITIES: TaskPriority[] = ['critical', 'high', 'medium', 'low'];
