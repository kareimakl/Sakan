// pages/dashboard/edit-room/[id].js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiUpload, FiPlus, FiMinus, FiTrash2, FiEdit } from 'react-icons/fi';

export default function EditRoomPage() {
  const router = useRouter();
  const { id } = router.query;

  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([
    '/room1.jpg',
    '/room2.jpg',
    '/room3.jpg'
  ]);
  const [roomDetails, setRoomDetails] = useState({
    title: 'Cozy Studio in Downtown',
    beds: '1',
    size: '25',
    apartmentType: 'Studio',
    description: 'A beautiful studio apartment with modern amenities and great natural light.',
    price: '850',
    amenities: ['Single bed', 'Desk', 'Mirror', 'Heating'],
    suitableFor: ['Students', 'Professionals']
  });

  const amenities = [
    'Single bed', 'Multi bed', 'Wardrobe', 'Twin bed', 'Balcony',
    'Unfurnished', 'Double bed', 'Window', 'Desk', 'Lock', 'Mirror', 'Heating'
  ];

  const suitableOptions = [
    'Males', 'Professionals', 'Students', 'Pets', 'Females',
    'Smokers', 'Overnight guests', 'Couples'
  ];

  // Simulate loading room data
  useEffect(() => {
    if (id) {
      // In a real app, you would fetch the room data here
      console.log(`Loading room data for ID: ${id}`);
    }
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setPhotos([...photos, ...files]);
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

  const removePhoto = (index, isExisting) => {
    if (isExisting) {
      setExistingPhotos(prev => prev.filter((_, i) => i !== index));
    } else {
      setPhotos(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Edit Room | Sakan</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Room</h1>
            <button className="text-red-600 hover:text-red-800 flex items-center">
              <FiTrash2 className="mr-1" />
              Delete Listing
            </button>
          </div>

          {/* Property Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
            <input
              type="text"
              name="title"
              value={roomDetails.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Photos</label>
            
            {/* Existing Photos */}
            {existingPhotos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {existingPhotos.map((photo, index) => (
                  <div key={`existing-${index}`} className="relative group">
                    <img 
                      src={photo} 
                      alt={`Room ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index, true)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload New Photos */}
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
                <p className="text-sm text-gray-500 mt-3">{photos.length} new photo(s) selected</p>
              )}
            </div>

            {/* Newly Uploaded Photos Preview */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {photos.map((photo, index) => (
                  <div key={`new-${index}`} className="relative group">
                    <img 
                      src={URL.createObjectURL(photo)} 
                      alt={`New upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index, false)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium flex-1">
              Cancel
            </button>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium flex-1 flex items-center justify-center">
              <FiEdit className="mr-2" />
              Update Listing
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}