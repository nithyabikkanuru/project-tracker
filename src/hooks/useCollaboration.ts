import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/taskStore";

export function useCollaboration() {
  const tasks = useTaskStore((s) => s.tasks);

  const [viewers, setViewers] = useState([
    { id: "c1", color: "#ff6b6b", taskId: "" },
    { id: "c2", color: "#4dabf7", taskId: "" },
    { id: "c3", color: "#51cf66", taskId: "" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) =>
        prev.map((u) => {
          const randomTask =
            tasks[Math.floor(Math.random() * tasks.length)];
          return { ...u, taskId: randomTask?.id };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [tasks]);

  return viewers;
}