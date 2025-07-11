// pages/listings/[id].js
import { useState } from 'react';
import Head from 'next/head';
import { FiChevronDown, FiChevronUp, FiMapPin, FiHome, FiWifi, FiDroplet, FiWind, FiSun } from 'react-icons/fi';

export default function ListingPage() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullFacilities, setShowFullFacilities] = useState(false);
  
  // Sample listing data
  const listing = {
    title: '302 North Palm Drive',
    location: 'Beverly Hills, CA 90210',
    features: [
      '5 bedrooms',
      '240 m²',
      '2 Bathroom',
      'Furnished',
      'Cleaning included',
      'Balcony',
      'Bed Linen/Towels'
    ],
    description: {
      short: 'Lorem ipsum dolor sit amet consectetur. Sit dui fermentum vitae in dui gravida lectus molestie.',
      full: 'Lorem ipsum dolor sit amet consectetur. Sit dui fermentum vitae in dui gravida lectus molestie. Dui a netus interdum enim. Vitae id ornare amet curabitur cursus arcu ante sed. Orci ipsum libero sed in eget vitae. Nulla fringilla integer viverra ac nean massa. Metus consequat purus enim tortor malesuada morbi. Eget mattis risus mauris egestas. Ac nean quis amet habitant tortor facilisis viverra erat viverra velit. Velit mattis magna cursus purus vitae mauris senectus maed.'
    },
    facilities: [
      'Shared Living Room',
      'Balcony',
      'WiFi',
      'Heating',
      'Washing Machine',
      'Air Conditioner',
      'TV',
      'Kitchen',
      'Dryer',
      'Parking'
    ],
    rules: [
      'No smoking allowed',
      'Pets are not allowed',
      'Overnight guests are allowed'
    ],
    rooms: [
      { name: 'Room 1', size: '24 Square Feet', beds: '4 Bed' },
      { name: 'Room 2', size: '20 Square Feet', beds: '3 Bed' },
      { name: 'Room 3', size: 'Furnished', beds: '2 Bathrooms' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{listing.title} | Sakan</title>
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Sakan</h1>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-900 hover:text-indigo-600">Home</a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">Map</a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">About us</a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">Log In</a>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              List Your Property
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Property Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <FiMapPin className="mr-2" />
            <span>{listing.location}</span>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {listing.features.map((feature, index) => (
              <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                {feature.includes('bedroom') && <FiHome className="mr-1" />}
                {feature.includes('Bathroom') && <FiDroplet className="mr-1" />}
                {feature.includes('WiFi') && <FiWifi className="mr-1" />}
                {feature.includes('Heating') && <FiSun className="mr-1" />}
                {feature.includes('Air Conditioner') && <FiWind className="mr-1" />}
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Photo Gallery Placeholder */}
          <div className="h-96 bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500">
            Property photos will be displayed here
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Property Details */}
          <div className="w-full lg:w-2/3">
            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 mb-4">
                {showFullDescription ? listing.description.full : listing.description.short}
              </p>
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                {showFullDescription ? 'Show less' : 'Show more'}
                {showFullDescription ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
              </button>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Facilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {listing.facilities.slice(0, showFullFacilities ? listing.facilities.length : 6).map((facility, index) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-2 text-indigo-500">✓</span>
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
              {listing.facilities.length > 6 && (
                <button 
                  onClick={() => setShowFullFacilities(!showFullFacilities)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  {showFullFacilities ? 'Show less' : 'Show more'}
                  {showFullFacilities ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                </button>
              )}
            </div>

            {/* Landlord Rules */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Landlord rules</h2>
              <ul className="space-y-2">
                {listing.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-gray-500">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rooms */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Rooms</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beds/Baths</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listing.rooms.map((room, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{room.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.beds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Book this property</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4+ guests</option>
                  </select>
                </div>
                <button className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                  Check Availability
                </button>
                <div className="text-center text-sm text-gray-500">
                  You won't be charged yet
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}