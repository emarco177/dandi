import { useState } from 'react';

export default function CreateApiKeyModal({ isOpen, onClose, onCreate }) {
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyLimit, setNewKeyLimit] = useState(1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newKeyName, newKeyLimit);
    setNewKeyName("");
    setNewKeyLimit(1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Create a new API key</h3>
        <p className="text-sm text-gray-600 mb-4">Enter a name and limit for the new API key.</p>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}