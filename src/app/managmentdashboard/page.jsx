// pages/dashboard/property-management.js
"use client"
import { useState } from 'react';
import Head from 'next/head';
import { FiHome, FiCalendar, FiDollarSign, FiSettings, FiLogOut, FiChevronLeft, FiMoreVertical, FiEdit, FiToggleLeft, FiToggleRight, FiEye, FiEyeOff } from 'react-icons/fi';

export default function PropertyManagement() {
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Casa da Megria',
      rooms: [
        { id: 1596, name: 'Room 1', status: 'online', date: '01-01-2024', price: '300€' },
        { id: 1595, name: 'Room 2', status: 'offline', date: '20-09-2023', price: '300€' },
        { id: 1594, name: 'Room 3', status: 'online', date: '01-11-2023', price: '300€' }
      ]
    },
    {
      id: 2,
      name: 'Casa Monteiro II',
      rooms: [
        { id: 1593, name: 'Room 1', status: 'booked', date: '01-11-2023', price: '500€' },
        { id: 1593, name: 'Room 2', status: 'online', date: '01-11-2023', price: '500€' },
        { id: 3546, name: 'Room 3', status: 'offline', date: '01-11-2023', price: '500€' },
        { id: 3546, name: 'Room 4', status: 'online', date: '20-09-2023', price: '500€' }
      ]
    },
    {
      id: 3,
      name: 'Parque Eduardo VII',
      rooms: [
        { id: 4636, name: 'Room 1', status: 'booked', date: '20-09-2023', price: '750€' },
        { id: 6585, name: 'Room 2', status: 'online', date: '01-11-2023', price: '750€' },
        { id: 2355, name: 'Room 3', status: 'online', date: '01-11-2023', price: '750€' }
      ]
    }
  ]);

  const toggleRoomStatus = (propertyId, roomId) => {
    setProperties(prev => prev.map(property => {
      if (property.id === propertyId) {
        return {
          ...property,
          rooms: property.rooms.map(room => {
            if (room.id === roomId) {
              return {
                ...room,
                status: room.status === 'online' ? 'offline' : 'online'
              };
            }
            return room;
          })
        };
      }
      return property;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Property Management | Sakan</title>
      </Head>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold">Sakan</h1>
          </div>
          <nav className="p-4">
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Dashboard</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('properties')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${activeTab === 'properties' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiHome className="mr-3" />
                    Property Management
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${activeTab === 'bookings' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiCalendar className="mr-3" />
                    Booking Requests
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Settings</h2>
              <ul className="space-y-2">
                <li>
                  <button className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <FiSettings className="mr-3" />
                    Settings
                  </button>
                </li>
                <li>
                  <button className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <FiLogOut className="mr-3" />
                    Logout
                  </button>
                </li>
                <li>
                  <button className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <FiChevronLeft className="mr-3" />
                    Previous
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'properties' ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Property Management</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Add New Property
                </button>
              </div>

              {/* Properties List */}
              <div className="space-y-8">
                {properties.map(property => (
                  <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="font-semibold text-lg">{property.name}</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Published</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listing ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {property.rooms.map(room => (
                            <tr key={room.id}>
                              <td className="px-6 py-4 whitespace-nowrap font-medium">{room.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  room.status === 'online' ? 'bg-green-100 text-green-800' :
                                  room.status === 'booked' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {room.status === 'online' ? (
                                    <FiEye className="mr-1" />
                                  ) : room.status === 'booked' ? (
                                    <FiCalendar className="mr-1" />
                                  ) : (
                                    <FiEyeOff className="mr-1" />
                                  )}
                                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">{room.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <FiDollarSign className="mr-1 text-gray-500" />
                                  {room.price}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{room.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-4">
                                  <button 
                                    onClick={() => toggleRoomStatus(property.id, room.id)}
                                    className="text-gray-500 hover:text-indigo-600"
                                  >
                                    {room.status === 'online' || room.status === 'booked' ? (
                                      <FiToggleRight className="text-green-500 text-xl" />
                                    ) : (
                                      <FiToggleLeft className="text-gray-400 text-xl" />
                                    )}
                                  </button>
                                  <button className="text-gray-500 hover:text-indigo-600">
                                    <FiEdit />
                                  </button>
                                  <button className="text-gray-500 hover:text-red-600">
                                    <FiMoreVertical />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6">Booking Requests</h2>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No booking requests available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}