import { useMemo } from "react";
import { useTaskStore } from "@/store/taskStore";
import { TaskPriority } from "@/types/task";
import { getDaysInMonth } from "@/lib/dateUtils";

const COLORS: Record<TaskPriority, string> = {
  critical: "red",
  high: "orange",
  medium: "blue",
  low: "green",
};

const DAY_W = 36;
const LABEL_W = 200;

export function TimelineView() {
  const tasks = useTaskStore((s) => s.tasks);
  const filters = useTaskStore((s) => s.filters);

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

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const todayDate = now.getDate();

  const monthLabel = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="border rounded-xl overflow-hidden h-[calc(100vh-180px)] flex flex-col">
      <div className="px-4 py-3 border-b">
        <h3 className="text-sm font-semibold">{monthLabel}</h3>
        <p className="text-xs text-gray-500">{filteredTasks.length} tasks</p>
      </div>

      <div className="flex-1 overflow-auto">
        <div style={{ minWidth: LABEL_W + daysInMonth * DAY_W }}>
          
          {/* Header */}
          <div className="flex sticky top-0 bg-white border-b">
            <div
              className="shrink-0 border-r px-3 py-2 text-xs font-semibold"
              style={{ width: LABEL_W }}
            >
              Task
            </div>

            <div className="flex">
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const isToday = day === todayDate;

                return (
                  <div
                    key={day}
                    className={`shrink-0 text-center py-2 text-xs border-r ${
                      isToday ? "bg-blue-100 font-bold" : "text-gray-500"
                    }`}
                    style={{ width: DAY_W }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task Rows */}
          {filteredTasks.map((task) => {
            const start = new Date((task.startDate ?? task.dueDate) + "T00:00:00");
            const due = new Date(task.dueDate + "T00:00:00");
            
            const monthStart = new Date(year, month, 1);
            const monthEnd = new Date(year, month + 1, 0);
            
            // hide tasks completely outside the current month
            if (due < monthStart || start > monthEnd) return null;
            
            const visibleStart = start < monthStart ? monthStart : start;
            const visibleEnd = due > monthEnd ? monthEnd : due;
            
            const left = (visibleStart.getDate() - 1) * DAY_W;
            const width =
              (visibleEnd.getDate() - visibleStart.getDate() + 1) * DAY_W;
            return (
              <div
                key={task.id}
                className="flex border-b hover:bg-gray-50"
                style={{ height: 36 }}
              >
                <div
                  className="shrink-0 border-r px-3 flex items-center text-xs truncate"
                  style={{ width: LABEL_W }}
                >
                  {task.title}
                </div>

                <div
                  className="relative flex-1"
                  style={{ minWidth: daysInMonth * DAY_W }}
                >
                  <div
                    className="absolute top-1.5 rounded-sm h-[calc(100%-12px)]"
                    style={{
                      left,
                      width,
                      backgroundColor: COLORS[task.priority],
                      opacity: 0.85,
                    }}
                    title={task.title}
                  />
                </div>
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="flex items-center justify-center py-16 text-sm text-gray-500">
              No tasks to show
            </div>
          )}
        </div>
      </div>
    </div>
  );
}