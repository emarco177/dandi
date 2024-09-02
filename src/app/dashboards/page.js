"use client";

import { useState, useEffect } from "react";
import { supabase } from '../lib/supabaseClient';
import Notification from '../components/Notification';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyLimit, setNewKeyLimit] = useState(1000);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
    
    if (error) {
      console.error('Error fetching API keys:', error);
      showNotification('Failed to fetch API keys', 'error');
    } else {
      setApiKeys(data);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const createApiKey = async (e) => {
    e.preventDefault();
    const newKeyValue = `dandi-${Date.now()}${Math.random().toString(36).substring(2, 15)}`;
    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        { name: newKeyName, value: newKeyValue, usage: 0 }
      ])
      .select()

    if (error) {
      console.error('Error creating API key:', error);
      showNotification('Failed to create API key', 'error');
    } else {
      setApiKeys([...apiKeys, data[0]]);
      setNewKeyName("");
      setNewKeyLimit(1000);
      setIsCreateModalOpen(false);
      showNotification('API key created successfully');
    }
  };

  const updateApiKey = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('api_keys')
      .update({ name: editingKey.name })
      .eq('id', editingKey.id)
      .select()

    if (error) {
      console.error('Error updating API key:', error);
      showNotification('Failed to update API key', 'error');
    } else {
      const updatedKeys = apiKeys.map(key => 
        key.id === editingKey.id ? data[0] : key
      );
      setApiKeys(updatedKeys);
      setEditingKey(null);
      showNotification('API key updated successfully');
    }
  };

  const deleteApiKey = async (id) => {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting API key:', error);
      showNotification('Failed to delete API key', 'error');
    } else {
      const updatedKeys = apiKeys.filter(key => key.id !== id);
      setApiKeys(updatedKeys);
      showNotification('API key deleted successfully', 'error');
    }
  };

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Copied API Key to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
            <h2 className="text-3xl font-bold mb-4">Researcher</h2>
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
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-2">NAME</th>
                  <th className="pb-2">USAGE</th>
                  <th className="pb-2">KEY</th>
                  <th className="pb-2">OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id} className="border-b">
                    <td className="py-3">{key.name}</td>
                    <td className="py-3">{key.usage}</td>
                    <td className="py-3">
                      {visibleKeys[key.id] ? key.value : `${key.value.slice(0, 8)}${'*'.repeat(key.value.length - 8)}`}
                    </td>
                    <td className="py-3">
                      <button 
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="mr-2 text-gray-600 hover:text-gray-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => copyToClipboard(key.value)}
                        className="mr-2 text-gray-600 hover:text-gray-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setEditingKey(key)}
                        className="mr-2 text-gray-600 hover:text-gray-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteApiKey(key.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Create API Key Modal */}
          {isCreateModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Create a new API key</h3>
                <p className="text-sm text-gray-600 mb-4">Enter a name and limit for the new API key.</p>
                <form onSubmit={createApiKey}>
                  <div className="mb-4">
                    <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Key Name — A unique name to identify this key
                    </label>
                    <input
                      type="text"
                      id="keyName"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Key Name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="keyLimit" className="block text-sm font-medium text-gray-700 mb-1">
                      Limit monthly usage*
                    </label>
                    <input
                      type="number"
                      id="keyLimit"
                      value={newKeyLimit}
                      onChange={(e) => setNewKeyLimit(parseInt(e.target.value))}
                      className="w-full p-2 border rounded"
                      min="1"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
                  </p>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
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
          )}

          {/* Edit Key Modal */}
          {editingKey && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Edit API Key</h3>
                <form onSubmit={updateApiKey}>
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
                      onClick={() => setEditingKey(null)}
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
          )}
        </div>
      </div>
    </div>
  );
}