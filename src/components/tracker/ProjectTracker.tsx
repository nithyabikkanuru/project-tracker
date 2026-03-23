import { useTaskStore } from '@/store/taskStore';
import { KanbanView } from './KanbanView';
import { ListView } from './ListView';
import { TimelineView } from './TimelineView';
import { FilterBar } from './FilterBar';
import { useCollaboration } from "@/hooks/useCollaboration";

const VIEWS = ['kanban', 'list', 'timeline'] as const;

const VIEW_LABELS = {
  kanban: '▦ Board',
  list: '☰ List',
  timeline: '⟶ Timeline',
};

export function ProjectTracker() {
  const view = useTaskStore((s) => s.view);
  const setView = useTaskStore((s) => s.setView);

  // simulated users
  const viewers = useCollaboration();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-center h-14 gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              P
            </div>
            <h1 className="text-base font-semibold text-foreground">Project Tracker</h1>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4">

        {/*  collaboration indicator */}
        <div className="text-xs text-muted-foreground mb-2">
          {viewers.length} people viewing this board
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
            {VIEWS.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors
                  ${v === view ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {VIEW_LABELS[v]}
              </button>
            ))}
          </div>

          <FilterBar />
        </div>

        {view === 'kanban' && <KanbanView />}
        {view === 'list' && <ListView />}
        {view === 'timeline' && <TimelineView />}
      </div>
    </div>
  );
}