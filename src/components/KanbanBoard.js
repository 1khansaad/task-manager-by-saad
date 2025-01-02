import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm"; // Assuming TaskForm is imported

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    pending: [],
    inProgress: [],
    done: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(fetchedTasks);
    const filteredTasks = {
      pending: fetchedTasks.filter((task) => task.status === "pending"),
      inProgress: fetchedTasks.filter((task) => task.status === "inProgress"),
      done: fetchedTasks.filter((task) => task.status === "done"),
    };

    setTasks(filteredTasks);
  }, []);

  const handleSave = (task) => {
    let updatedTasks;
    if (task.id) {
      // Edit existing task
      updatedTasks = [...Object.values(tasks).flat()].map((t) =>
        t.id === task.id ? task : t
      );
    } else {
      // Add new task with a unique ID
      const newTask = { ...task, id: Date.now() };
      updatedTasks = [...Object.values(tasks).flat(), newTask];
    }

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTasks({
      pending: updatedTasks.filter((task) => task.status === "pending"),
      inProgress: updatedTasks.filter((task) => task.status === "inProgress"),
      done: updatedTasks.filter((task) => task.status === "done"),
    });

    setShowForm(false);
    setEditingTask(null); // Clear editing task
  };

  const handleDelete = (taskToDelete) => {
    const updatedTasks = Object.values(tasks)
      .flat()
      .filter((task) => task.id !== taskToDelete.id);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTasks({
      pending: updatedTasks.filter((task) => task.status === "pending"),
      inProgress: updatedTasks.filter((task) => task.status === "inProgress"),
      done: updatedTasks.filter((task) => task.status === "done"),
    });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#5c4e4e]">Kanban Board</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gray-800 text-[#ffffff] p-3 rounded-lg hover:bg-[#000000] transition duration-300 ease-in-out"
        >
          Add Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      <div className="flex space-x-4">
        <div className="flex-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-[#5c4e4e] mb-4">
            Pending ({tasks.pending.length})
          </h2>
          {tasks.pending.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit} // Added onEdit handler
            />
          ))}
        </div>

        <div className="flex-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-[#5c4e4e] mb-4">
            In Progress ({tasks.inProgress.length})
          </h2>
          {tasks.inProgress.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit} // Added onEdit handler
            />
          ))}
        </div>

        <div className="flex-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-[#5c4e4e] mb-4">
            Done ({tasks.done.length})
          </h2>
          {tasks.done.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit} // Added onEdit handler
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
