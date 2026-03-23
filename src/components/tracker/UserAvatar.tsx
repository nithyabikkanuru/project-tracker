import { User } from '@/types/task';

export function UserAvatar({ user }: { user: User }) {
  return (
    <div
      className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-primary-foreground"
      style={{ backgroundColor: user.color }}
      title={user.name}
    >
      {user.initials}
    </div>
  );
}
