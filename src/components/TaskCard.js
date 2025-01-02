import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { taskName, startDate, endDate, priority, status } = task;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 mb-4 flex justify-between items-center">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-[#5c4e4e]">{taskName}</h3>
        <p className="text-sm text-[#988686]">
          Start Date: {startDate} | End Date: {endDate}
        </p>
        <p className="text-sm text-[#988686]">Priority: {priority}</p>
        <p className="text-sm text-[#5c4e4e]">Status: {status}</p>
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-3">
        <FaEdit
          onClick={() => onEdit(task)}
          className="text-blue-500 cursor-pointer"
        />
        <FaTrashAlt
          onClick={() => onDelete(task)}
          className="text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TaskCard;
