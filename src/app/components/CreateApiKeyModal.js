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
          <div className="mb-4">
            <label htmlFor="keyName" className="block text-sm font-medium text-gray-700">Key Name</label>
            <input
              type="text"
              id="keyName"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="keyLimit" className="block text-sm font-medium text-gray-700">Key Limit</label>
            <input
              type="number"
              id="keyLimit"
              value={newKeyLimit}
              onChange={(e) => setNewKeyLimit(parseInt(e.target.value, 10))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
              min="1"
            />
          </div>
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