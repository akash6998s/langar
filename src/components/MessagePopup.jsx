import React from "react";

const MessagePopup = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg p-5 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{type === "error" ? "Error" : "Success"}</h3>
          <button
            onClick={onClose}
            className="text-red-500 hover:underline"
          >
            Close
          </button>
        </div>
        <div className={`text-center ${type === "error" ? "text-red-600" : "text-green-600"}`}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessagePopup;
