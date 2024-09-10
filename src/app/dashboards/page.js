"use client";

import { useState, useEffect } from "react";
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } from '../lib/apiKeyOperations';
import Notification from '../components/Notification';
import Sidebar from '../components/Sidebar';
import ApiKeysTable from '../components/ApiKeysTable';
import CreateApiKeyModal from '../components/CreateApiKeyModal';
import EditApiKeyModal from '../components/EditApiKeyModal';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchApiKeysData();
  }, []);

  const fetchApiKeysData = async () => {
    try {
      const data = await fetchApiKeys();
      setApiKeys(data);
    } catch (error) {
      showNotification('Failed to fetch API keys', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleCreateApiKey = async (name, limit) => {
    try {
      const newKey = await createApiKey(name, limit);
      setApiKeys([...apiKeys, newKey]);
      setIsCreateModalOpen(false);
      showNotification('API key created successfully');
    } catch (error) {
      showNotification('Failed to create API key', 'error');
    }
  };

  const handleUpdateApiKey = async (updatedKey) => {
    try {
      const updated = await updateApiKey(updatedKey.id, updatedKey.name);
      const updatedKeys = apiKeys.map(key => 
        key.id === updated.id ? updated : key
      );
      setApiKeys(updatedKeys);
      setEditingKey(null);
      showNotification('API key updated successfully');
    } catch (error) {
      showNotification('Failed to update API key', 'error');
    }
  };

  const handleDeleteApiKey = async (id) => {
    try {
      await deleteApiKey(id);
      const updatedKeys = apiKeys.filter(key => key.id !== id);
      setApiKeys(updatedKeys);
      showNotification('API key deleted successfully','error');
    } catch (error) {
      showNotification('Failed to delete API key', 'error');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Copied API Key to clipboard');
    } catch (err) {
      showNotification('Failed to copy API key. Please try again.', 'error');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 max-w-6xl mx-auto">
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
          
          <h1 className="text-3xl font-bold mb-6">Overview</h1>
          
          {/* Current Plan */}
          <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">CURRENT PLAN</span>
              <button className="bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded">
                Manage Plan
              </button>
            </div>
            <h2 className="text-3xl font-bold mb-4">Dandi API</h2>
            <div>
              <span className="text-sm font-medium">API Limit</span>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full" style={{width: '2.4%'}}></div>
              </div>
              <span className="text-sm mt-1 inline-block">24 / 1,000 Requests</span>
            </div>
          </div>

          {/* API Keys */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">API Keys</h2>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                + Create New Key
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
            </p>
            <ApiKeysTable 
              apiKeys={apiKeys}
              onEdit={setEditingKey}
              onDelete={handleDeleteApiKey}
              onCopy={copyToClipboard}
              showNotification={showNotification}
            />
          </div>

          <CreateApiKeyModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={handleCreateApiKey}
          />

          <EditApiKeyModal
            apiKey={editingKey}
            isOpen={!!editingKey}
            onClose={() => setEditingKey(null)}
            onUpdate={handleUpdateApiKey}
          />
        </div>
      </div>
    </div>
  );
}