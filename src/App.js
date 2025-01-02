import React, { useState } from "react";
import Navbar from "./components/NavBar"; // Adjust path as needed
import TaskForm from "./components/TaskForm"; // Adjust path as needed
import KanbanBoard from "./components/KanbanBoard"; // Adjust path as needed
import Footer from "./components/Footer"; // Adjust path as needed

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);
  const handleSaveTask = (task) => {
    // Handle the saved task here
    console.log("Task saved:", task);
  };
  // hello

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Navbar />
          {isFormOpen && (
            <TaskForm onClose={handleCloseForm} onSave={handleSaveTask} />
          )}
          <KanbanBoard />
        </main>
        <Footer />
      </div>

      <Footer />
    </div>
  );
};

export default App;
