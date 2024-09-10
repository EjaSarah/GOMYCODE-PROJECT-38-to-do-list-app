import React, { useState } from "react";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialData?: Task;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Both fields are required!");
      return;
    }
    const task = {
      id: initialData?.id || new Date().toISOString(),
      name,
      description,
      completed: initialData?.completed || false,
    };
    onSubmit(task);
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button type="submit">{initialData ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
