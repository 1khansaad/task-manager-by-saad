import React, { useState, useEffect } from "react";

const TaskForm = ({ task, onSave, onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("pending");
  const [errors, setErrors] = useState({});

  // Use useEffect to prefill data when editing
  useEffect(() => {
    if (task) {
      setTaskName(task.taskName);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const validateForm = () => {
    const errors = {};
    if (!taskName) errors.taskName = "Task name is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Prevent form submission if there are errors
    }

    const newTask = { taskName, startDate, endDate, priority, status };

    if (task) {
      onSave({ ...newTask, id: task.id });
    } else {
      onSave(newTask);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold text-[#5c4e4e] mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[#5c4e4e]"
              htmlFor="taskName"
            >
              Task Name
            </label>
            <input
              id="taskName"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {errors.taskName && (
              <p className="text-red-500 text-xs">{errors.taskName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[#5c4e4e]"
              htmlFor="startDate"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs">{errors.startDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[#5c4e4e]"
              htmlFor="endDate"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {errors.endDate && (
              <p className="text-red-500 text-xs">{errors.endDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[#5c4e4e]"
              htmlFor="priority"
            >
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[#5c4e4e]"
              htmlFor="status"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-[#988686] text-white px-4 py-2 rounded-lg"
            >
              {task ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
