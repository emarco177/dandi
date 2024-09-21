'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification';
import Sidebar from '../components/Sidebar';

const Playground = () => {
  const [apiKey, setApiKey] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    try {
      const response = await fetch('/api/github-summarizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ githubUrl: githubUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponse(data);
        setNotification({ message: 'Successfully fetched response', type: 'success' });
      } else {
        setResponse(data);
        setNotification({ message: data.error || 'An error occurred', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'An error occurred', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-grow p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">API Playground</h1>
          <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                API Key
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                id="githubUrl"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </form>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
          {response && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Response</h2>
              <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playground;