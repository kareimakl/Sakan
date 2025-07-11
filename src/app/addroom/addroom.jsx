// pages/dashboard/add-room.js
import { useState } from 'react';
import Head from 'next/head';
import { FiUpload, FiPlus, FiMinus } from 'react-icons/fi';

export default function AddRoomPage() {
  const [photos, setPhotos] = useState([]);
  const [roomDetails, setRoomDetails] = useState({
    title: '',
    beds: '',
    size: '',
    apartmentType: '',
    description: '',
    price: '',
    amenities: [],
    suitableFor: []
  });

  const amenities = [
    'Single bed', 'Multi bed', 'Wardrobe', 'Twin bed', 'Balcony',
    'Unfurnished', 'Double bed', 'Window', 'Desk', 'Lock', 'Mirror', 'Heating'
  ];

  const suitableOptions = [
    'Males', 'Professionals', 'Students', 'Pets', 'Females',
    'Smokers', 'Overnight guests', 'Couples'
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setPhotos(files);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails(prev => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity) => {
    setRoomDetails(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const toggleSuitableFor = (option) => {
    setRoomDetails(prev => ({
      ...prev,
      suitableFor: prev.suitableFor.includes(option)
        ? prev.suitableFor.filter(s => s !== option)
        : [...prev.suitableFor, option]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Add Room | Sakan</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Add Room</h1>

          {/* Property Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
            <input
              type="text"
              name="title"
              value={roomDetails.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Cozy Studio in Downtown"
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Room Photos</label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
            >
              <FiUpload className="mx-auto text-gray-400 text-2xl mb-3" />
              <p className="text-gray-600 mb-2">Drag and drop photos here or</p>
              <label className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer">
                Browse Files
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {photos.length > 0 && (
                <p className="text-sm text-gray-500 mt-3">{photos.length} photo(s) selected</p>
              )}
            </div>
          </div>

          {/* Room Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of beds</label>
              <input
                type="number"
                name="beds"
                value={roomDetails.beds}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size (m²)</label>
              <input
                type="number"
                name="size"
                value={roomDetails.size}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apartment Type</label>
              <select
                name="apartmentType"
                value={roomDetails.apartmentType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select type</option>
                <option value="Studio">Studio</option>
                <option value="Shared">Shared</option>
                <option value="Private">Private</option>
                <option value="Entire">Entire Apartment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price per month ($)</label>
              <input
                type="number"
                name="price"
                value={roomDetails.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={roomDetails.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a description..."
            ></textarea>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {amenities.map(amenity => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`flex items-center px-3 py-2 rounded-full text-sm ${roomDetails.amenities.includes(amenity) ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {roomDetails.amenities.includes(amenity) ? (
                    <FiMinus className="mr-1 text-xs" />
                  ) : (
                    <FiPlus className="mr-1 text-xs" />
                  )}
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Suitable For */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Suitable For</h2>
            <div className="flex flex-wrap gap-3">
              {suitableOptions.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleSuitableFor(option)}
                  className={`flex items-center px-3 py-2 rounded-full text-sm ${roomDetails.suitableFor.includes(option) ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {roomDetails.suitableFor.includes(option) ? (
                    <FiMinus className="mr-1 text-xs" />
                  ) : (
                    <FiPlus className="mr-1 text-xs" />
                  )}
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
            Save Room Listing
          </button>
        </div>
      </main>
    </div>
  );
}