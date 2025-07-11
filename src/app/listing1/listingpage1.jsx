// pages/listings/[id].js
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [selectedDates, setSelectedDates] = useState([]);
  const [activeTab, setActiveTab] = useState('details');

  // Sample listing data
  const listing = {
    id: id || '1',
    title: 'Room 1 in 302 North Plain Drive',
    price: '$800 (bills included)',
    features: [
      { icon: '🛏️', label: '1 Bedroom' },
      { icon: '📏', label: '150 m²' },
      { icon: '🚿', label: 'Private Bathroom' },
      { icon: '🪑', label: 'Furnished' },
      { icon: '🧹', label: 'Cleaning Included' },
      { icon: '🌿', label: 'Balcony' },
      { icon: '🛌', label: 'Bed Linen/Towels' }
    ],
    availability: {
      from: '26 February 2024',
      minStay: '3 Months',
      maxStay: 'No limit',
      updated: '1 week ago'
    },
    description: 'A spacious and bright room in a shared apartment located in the heart of the city. Perfect for students with all amenities included and close to public transportation.',
    amenities: ['WiFi', 'Washing Machine', 'Kitchen', 'TV', 'Heating', 'Air Conditioning'],
    photos: [
      '/placeholder-room1.jpg',
      '/placeholder-room2.jpg',
      '/placeholder-room3.jpg',
      '/placeholder-room4.jpg'
    ]
  };

  const handleDateSelect = (date) => {
    // Simple date selection logic
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter(d => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
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
          <div className="flex items-center space-x-6">
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Listing content */}
          <div className="w-full lg:w-2/3">
            {/* Photo gallery */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="h-96 bg-gray-200 relative">
                {/* Main image */}
                <img 
                  src={listing.photos[0]} 
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                {/* Thumbnails */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex space-x-2 overflow-x-auto">
                  {listing.photos.map((photo, index) => (
                    <button 
                      key={index}
                      className="w-16 h-16 flex-shrink-0 border-2 border-white rounded"
                    >
                      <img 
                        src={photo} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Listing header */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
              <p className="text-xl text-indigo-600 font-semibold mb-6">{listing.price}</p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-6">
                {listing.features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <span className="mr-2">{feature.icon}</span>
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Availability */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Available from</p>
                  <p className="font-medium">{listing.availability.from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Minimum stay</p>
                  <p className="font-medium">{listing.availability.minStay}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Maximum stay</p>
                  <p className="font-medium">{listing.availability.maxStay}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Calendar updated</p>
                  <p className="font-medium">{listing.availability.updated}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-3 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setActiveTab('amenities')}
                    className={`py-3 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'amenities' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Amenities
                  </button>
                  <button
                    onClick={() => setActiveTab('location')}
                    className={`py-3 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'location' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Location
                  </button>
                </nav>
              </div>

              {/* Tab content */}
              {activeTab === 'details' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">About this place</h2>
                  <p className="text-gray-700 mb-6">{listing.description}</p>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">What this place offers</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {listing.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <span className="mr-2">✓</span>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Where you'll be</h2>
                  <div className="h-64 bg-gray-200 rounded-lg mb-4">
                    {/* Map placeholder */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Map will be displayed here
                    </div>
                  </div>
                  <p className="text-gray-700">302 North Plain Drive, City Center</p>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Booking widget */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Booking Request</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Check In</label>
                <div className="border border-gray-300 rounded-md p-3 h-48 overflow-y-auto">
                  {/* Simplified date selection - in a real app you'd use a date picker */}
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(day => (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(`Feb ${day}, 2024`)}
                        className={`py-2 text-sm rounded ${selectedDates.includes(`Feb ${day}, 2024`) ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'hover:bg-gray-100'}`}
                      >
                        Feb {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Check Out</label>
                <div className="border border-gray-300 rounded-md p-3 h-48 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-2">
                    {[15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(day => (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(`Feb ${day}, 2024`)}
                        className={`py-2 text-sm rounded ${selectedDates.includes(`Feb ${day}, 2024`) ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'hover:bg-gray-100'}`}
                      >
                        Feb {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                Request to Book
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                You won't be charged yet
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}