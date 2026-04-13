import { useState, useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import Column from "./components/Column";
import "./styles/main.css";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : {
          todo: [
            { id: "task-1", title: "Design UI" },
            { id: "task-2", title: "Setup Project" }
          ],
          inProgress: [
            { id: "task-3", title: "Build Components" }
          ],
          done: []
        };
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const findColumn = (id) => {
    return Object.keys(tasks).find((col) =>
      tasks[col].some((t) => t.id === id)
    );
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const sourceCol = findColumn(active.id);
    const destCol = findColumn(over.id);

    if (!sourceCol || !destCol) return;

    const item = tasks[sourceCol].find((t) => t.id === active.id);

    setTasks({
      ...tasks,
      [sourceCol]: tasks[sourceCol].filter((t) => t.id !== active.id),
      [destCol]: [...tasks[destCol], item]
    });
  };

  const addTask = () => {
    const title = prompt("Enter task");
    if (!title) return;

    setTasks({
      ...tasks,
      todo: [
        ...tasks.todo,
        { id: Date.now().toString(), title }
      ]
    });
  };

  return (
    <>
      <div className="header">
        <h2>TeamFlow Dashboard</h2>

        <div className="actions">
          <button onClick={addTask}>+ Add Task</button>

          {/* 🌙 Premium Toggle */}
          <div
            className={`toggle-switch ${dark ? "active" : ""}`}
            onClick={() => setDark(!dark)}
          >
            <div className="toggle-circle">
              {dark ? "" : ""}
            </div>
          </div>
        </div>
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="board">
          <Column title="To Do" tasks={tasks.todo} />
          <Column title="In Progress" tasks={tasks.inProgress} />
          <Column title="Done" tasks={tasks.done} />
        </div>
      </DndContext>
    </>
  );
}

export default App;