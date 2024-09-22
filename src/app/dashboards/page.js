"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Notification from '../components/Notification';
import Sidebar from '../components/Sidebar';
import ApiKeysTable from '../components/ApiKeysTable';
import CreateApiKeyModal from '../components/CreateApiKeyModal';
import EditApiKeyModal from '../components/EditApiKeyModal';
import Link from 'next/link';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [notification, setNotification] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchApiKeysData();
    }
  }, [session]);

  const fetchApiKeysData = async () => {
    try {
      const response = await fetch('/api/api-keys', {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch API keys');
      const data = await response.json();
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
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        body: JSON.stringify({ name, limit })
      });
      if (!response.ok) throw new Error('Failed to create API key');
      const newKey = await response.json();
      setApiKeys([...apiKeys, newKey]);
      setIsCreateModalOpen(false);
      showNotification('API key created successfully');
    } catch (error) {
      showNotification('Failed to create API key', 'error');
    }
  };

  const handleUpdateApiKey = async (updatedKey) => {
    try {
      const response = await fetch(`/api/api-keys/${updatedKey.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        body: JSON.stringify({ name: updatedKey.name })
      });
      if (!response.ok) throw new Error('Failed to update API key');
      const updated = await response.json();
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
      const response = await fetch(`/api/api-keys/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.accessToken}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete API key');
      const updatedKeys = apiKeys.filter(key => key.id !== id);
      setApiKeys(updatedKeys);
      showNotification('API key deleted successfully');
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
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar className="w-full md:w-64 md:fixed md:h-screen" />
      <div className="w-full md:ml-64 p-4 md:p-8 flex-grow">
        <div className="max-w-6xl mx-auto space-y-6">
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
          
          <h1 className="text-2xl md:text-3xl font-bold">Overview</h1>
          
          {/* Current Plan */}
          <div className="p-4 md:p-6 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <span className="text-sm font-medium mb-2 sm:mb-0">CURRENT PLAN</span>
              <button className="bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded hover:bg-opacity-30 transition-colors">
                Manage Plan
              </button>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Dandi API</h2>
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl font-semibold mb-2 sm:mb-0">API Keys</h2>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full sm:w-auto"
              >
                + Create New Key
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
            </p>
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <ApiKeysTable 
                apiKeys={apiKeys}
                onEdit={setEditingKey}
                onDelete={handleDeleteApiKey}
                onCopy={copyToClipboard}
                showNotification={showNotification}
              />
            </div>
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