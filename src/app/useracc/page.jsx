// pages/account.js
"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function AccountPage() {
  const [user, setUser] = useState({
    firstName: 'Anna',
    lastName: 'Karlsson',
    gender: 'Female',
    email: 'anna.karlsson@gmail.com',
    phoneNumber: '',
    nationality: '',
    university: '',
    college: ''
  });

  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Sakan - Account</title>
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Sakan</h1>
          <nav className="flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-indigo-600">Home</a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">Map</a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">About us</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src="/placeholder-avatar.jpg" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-0 left-0 right-0 bg-indigo-600 text-white py-1 text-sm font-medium">
                  Upload new Picture
                </button>
              </div>
              <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('basic')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'basic' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Basic Info
                  </button>
                  <button
                    onClick={() => setActiveTab('additional')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'additional' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Additional Details & Documents
                  </button>
                </nav>
              </div>

              {/* Tab content */}
              <div className="p-6">
                {activeTab === 'basic' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          value={user.firstName}
                          onChange={(e) => setUser({...user, firstName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          value={user.lastName}
                          onChange={(e) => setUser({...user, lastName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          value={user.gender}
                          onChange={(e) => setUser({...user, gender: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser({...user, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={user.phoneNumber}
                          onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                        <input
                          type="text"
                          value={user.nationality}
                          onChange={(e) => setUser({...user, nationality: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                        <input
                          type="text"
                          value={user.university}
                          onChange={(e) => setUser({...user, university: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                        <input
                          type="text"
                          value={user.college}
                          onChange={(e) => setUser({...user, college: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Password/ID Card</label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="file"
                              className="py-2 px-3 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="file"
                              className="py-2 px-3 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="file"
                              className="py-2 px-3 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Upload Documents
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}