import { create } from 'zustand';
import { Task, TaskStatus, TaskPriority } from '@/types/task';
import { createTasks } from '@/data/seed';

interface Filters {
  status: TaskStatus | '';
  priority: TaskPriority | '';
  assignee: string;
  dateFrom: string;
  dateTo: string;
}

interface TaskStore {
  tasks: Task[];
  view: 'kanban' | 'list' | 'timeline';
  filters: Filters;
  setView: (view: 'kanban' | 'list' | 'timeline') => void;
  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: createTasks(),
  view: 'kanban',
  filters: { status: '', priority: '', assignee: '', dateFrom: '', dateTo: '' },
  setView: (view) => set({ view }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  clearFilters: () => set({ filters: { status: '', priority: '', assignee: '', dateFrom: '', dateTo: '' } }),
  moveTask: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    })),
}));
