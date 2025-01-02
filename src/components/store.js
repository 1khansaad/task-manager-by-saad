import { createSlice, configureStore } from "@reduxjs/toolkit";

// Fetch tasks from local storage
const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks
    ? JSON.parse(storedTasks)
    : { pending: [], inProgress: [], done: [] }; // Default structure
};

// Save tasks to local storage
const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadTasksFromLocalStorage(), // Initialize tasks categorized by status
    showForm: false,
    editingTask: null,
  },
  reducers: {
    addTask: (state, action) => {
      const { status, ...task } = action.payload;
      state.tasks[status].push(task); // Add task to the correct status
      saveTasksToLocalStorage(state.tasks); // Save to local storage
    },
    updateTask: (state, action) => {
      const { id, status, ...task } = action.payload;
      const taskIndex = state.tasks[status].findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[status][taskIndex] = {
          ...state.tasks[status][taskIndex],
          ...task,
        };
        saveTasksToLocalStorage(state.tasks); // Save updated tasks to local storage
      }
    },
    deleteTask: (state, action) => {
      const { id, status } = action.payload;
      state.tasks[status] = state.tasks[status].filter(
        (task) => task.id !== id
      );
      saveTasksToLocalStorage(state.tasks); // Save updated tasks to local storage
    },
    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    moveTaskToStatus: (state, action) => {
      const { id, fromStatus, toStatus } = action.payload;
      const taskIndex = state.tasks[fromStatus].findIndex(
        (task) => task.id === id
      );
      if (taskIndex !== -1) {
        const [task] = state.tasks[fromStatus].splice(taskIndex, 1);
        task.status = toStatus;
        state.tasks[toStatus].push(task);
        saveTasksToLocalStorage(state.tasks); // Save updated tasks to local storage
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  setShowForm,
  setEditingTask,
  moveTaskToStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;

export const store = configureStore({ reducer: tasksSlice.reducer });
