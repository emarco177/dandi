'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const { data: session } = useSession();

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <div className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden flex flex-col`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dandi AI</h1>
        </div>
        <nav className="mt-6 flex-grow">
          <Link href="/dashboards" className={`flex items-center px-6 py-3 ${isActive('/dashboards') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Overview
          </Link>
          {/* <Link href="/research-assistant" className={`flex items-center px-6 py-3 ${isActive('/research-assistant') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            Research Assistant
          </Link> */}
          {/* <Link href="/research-reports" className={`flex items-center px-6 py-3 ${isActive('/research-reports') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Research Reports
          </Link> */}
          <Link href="/playground" className={`flex items-center px-6 py-3 ${isActive('/playground') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            API Playground
          </Link>
          <Link href="/invoices" className={`flex items-center px-6 py-3 ${isActive('/invoices') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Invoices
          </Link>
          <Link href="/documentation" className={`flex items-center px-6 py-3 ${isActive('/documentation') ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            Documentation
          </Link>
        </nav>
        {session?.user && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-4">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-gray-600 text-xl">
                    {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-sm">{session.user.name}</p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 left-4 z-50 p-2 rounded-full bg-purple-500 text-white transition-all duration-300 ${isOpen ? 'left-64' : 'left-4'}`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </>
  );
};

export default Sidebar;
