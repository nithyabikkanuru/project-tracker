import { Task, TaskStatus, TaskPriority, User } from '@/types/task';

export const USERS: User[] = [
  { id: 'u1', name: 'Mara Chen', initials: 'MC', color: 'hsl(340 65% 47%)' },
  { id: 'u2', name: 'Javier Ruiz', initials: 'JR', color: 'hsl(200 70% 45%)' },
  { id: 'u3', name: 'Anika Patel', initials: 'AP', color: 'hsl(150 55% 40%)' },
  { id: 'u4', name: 'Tobias Klein', initials: 'TK', color: 'hsl(30 75% 50%)' },
  { id: 'u5', name: 'Lina Vasquez', initials: 'LV', color: 'hsl(280 60% 50%)' },
];

const VERBS = [
  'Implement', 'Build', 'Design', 'Fix', 'Configure',
  'Setup', 'Deploy', 'Monitor', 'Migrate', 'Update',
  'Create', 'Debug', 'Refactor', 'Validate', 'Review',
  'Research', 'Optimize', 'Test', 'Integrate', 'Document',
];

const NOUNS = [
  'email templates', 'file upload service', 'error handling', 'database queries',
  'search feature', 'load balancer', 'analytics dashboard', 'CI/CD pipeline',
  'notification system', 'authentication flow', 'webhook handler', 'payment gateway',
  'onboarding wizard', 'user permissions', 'database indexes', 'logging service',
  'API endpoints', 'caching layer', 'rate limiter', 'backup system',
  'SSO integration', 'data pipeline', 'admin panel', 'export module',
  'dashboard widgets', 'role management', 'audit trail', 'health checks',
  'session handler', 'queue processor', 'image optimizer', 'PDF generator',
  'chat system', 'billing module', 'report engine', 'scheduler',
];

export function createTasks(): Task[] {
  const statuses: TaskStatus[] = ['todo', 'in-progress', 'in-review', 'done'];
  const priorities: TaskPriority[] = ['critical', 'high', 'medium', 'low'];
  const today = new Date();
  const tasks: Task[] = [];

  for (let i = 0; i < 500; i++) {
    const verb = VERBS[i % VERBS.length];
    const noun = NOUNS[i % NOUNS.length];
    const startDate = new Date(today);
startDate.setDate(startDate.getDate() + (i % 10));

const dueDate = new Date(startDate);
dueDate.setDate(startDate.getDate() + (i % 5) + 1);
tasks.push({
  id: `task-${i + 1}`,
  title: `${verb} ${noun} #${i + 1}`,
  status: statuses[i % 4],
  priority: priorities[i % 4],
  assignee: USERS[i % USERS.length],
  startDate: startDate.toISOString().split('T')[0],
  dueDate: dueDate.toISOString().split('T')[0],
});
  }

  return tasks;
}
