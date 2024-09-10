import React from "react";
import { Task } from "./TaskForm";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onEdit,
  onComplete,
}) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <button onClick={() => onComplete(task.id)}>
        {task.completed ? "Unmark" : "Complete"}
      </button>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
