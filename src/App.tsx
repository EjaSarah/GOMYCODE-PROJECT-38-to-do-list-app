import "./App.css";
import React, { useState, useEffect } from "react";
import TaskForm, { Task } from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./TaskStyles.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks from local storage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = (task: Task) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
      setEditingTask(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const deleteTask = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const completeTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm onSubmit={addOrUpdateTask} initialData={editingTask} />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={editTask}
        onComplete={completeTask}
      />
    </div>
  );
};

export default App;
