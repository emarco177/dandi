import { useState, useEffect } from 'react';

export default function EditApiKeyModal({ apiKey, isOpen, onClose, onUpdate }) {
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    setEditingKey(apiKey);
  }, [apiKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editingKey);
  };

  if (!isOpen || !editingKey) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Edit API Key</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editingKey.name}
            onChange={(e) => setEditingKey({...editingKey, name: e.target.value})}
            className="w-full p-2 border rounded mb-4"
            required
          />
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}