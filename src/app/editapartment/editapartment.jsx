// pages/dashboard/edit-apartment/[id].js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiUpload, FiTrash2, FiEdit, FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

export default function EditApartmentPage() {
  const router = useRouter();
  const { id } = router.query;

  // Sample apartment data
  const [apartment, setApartment] = useState({
    title: 'Modern Downtown Apartment',
    address: '123 Main St, Beverly Hills, CA 90210',
    size: '120',
    rooms: '3',
    bathrooms: [
      {
        id: 1,
        name: 'Bathroom 1',
        features: ['Toilet', 'Shower', 'Sink']
      },
      {
        id: 2,
        name: 'Bathroom 2',
        features: ['Toilet', 'Shower', 'Bath', 'Sink']
      }
    ],
    kitchen: {
      appliances: ['Microwave', 'Oven', 'Stove', 'Fridge', 'Freezer']
    },
    livingroom: {
      features: ['TV', 'Sofa', 'Wi-fi', 'Central heating', 'Air conditioning']
    },
    amenities: ['Elevator', 'Terrace', 'Dishwasher', 'Free parking', 'Garden'],
    photos: [
      '/apartment1.jpg',
      '/apartment2.jpg',
      '/apartment3.jpg'
    ]
  });

  const [newPhotos, setNewPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    bathrooms: true,
    kitchen: true,
    livingroom: true,
    amenities: true
  });

  // All possible features
  const allFeatures = {
    bathroom: ['Toilet', 'Shower', 'Bath', 'Sink', 'Bidet'],
    kitchen: ['Microwave', 'Oven', 'Toaster', 'Stove', 'Fridge', 'Freezer', 'Kettle', 'Dishwasher', 'Coffee Maker'],
    livingroom: ['TV', 'Sofa', 'Wi-fi', 'Washing machine', 'Unfurnished', 'Central heating', 
                'Accessibility needs', 'Terrace', 'Elevator', 'Air conditioning', 'Dishwasher', 
                'Free parking', 'Garden', 'Fireplace']
  };

  // Simulate loading apartment data
  useEffect(() => {
    if (id) {
      // In a real app, you would fetch the apartment data here
      console.log(`Loading apartment data for ID: ${id}`);
    }
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewPhotos([...newPhotos, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setNewPhotos([...newPhotos, ...files]);
  };

  const removePhoto = (index, isExisting) => {
    if (isExisting) {
      setApartment(prev => ({
        ...prev,
        photos: prev.photos.filter((_, i) => i !== index)
      }));
    } else {
      setNewPhotos(prev => prev.filter((_, i) => i !== index));
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFeature = (area, feature) => {
    if (area === 'bathroom') {
      // Handle bathroom features differently since they're organized by bathroom
      return;
    }

    setApartment(prev => {
      const currentFeatures = prev[area]?.features || prev[area]?.appliances || [];
      const newFeatures = currentFeatures.includes(feature)
        ? currentFeatures.filter(f => f !== feature)
        : [...currentFeatures, feature];
      
      return {
        ...prev,
        [area]: area === 'kitchen' 
          ? { appliances: newFeatures } 
          : { features: newFeatures }
      };
    });
  };

  const toggleBathroomFeature = (bathroomId, feature) => {
    setApartment(prev => ({
      ...prev,
      bathrooms: prev.bathrooms.map(bathroom => 
        bathroom.id === bathroomId
          ? {
              ...bathroom,
              features: bathroom.features.includes(feature)
                ? bathroom.features.filter(f => f !== feature)
                : [...bathroom.features, feature]
            }
          : bathroom
      )
    }));
  };

  const addBathroom = () => {
    const newId = apartment.bathrooms.length > 0 
      ? Math.max(...apartment.bathrooms.map(b => b.id)) + 1 
      : 1;
    
    setApartment(prev => ({
      ...prev,
      bathrooms: [
        ...prev.bathrooms,
        {
          id: newId,
          name: `Bathroom ${newId}`,
          features: ['Toilet', 'Sink']
        }
      ]
    }));
  };

  const removeBathroom = (id) => {
    setApartment(prev => ({
      ...prev,
      bathrooms: prev.bathrooms.filter(b => b.id !== id)
    }));
  };

  const filteredFeatures = (features) => {
    if (!searchTerm) return features;
    return features.filter(feature => 
      feature.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Edit Apartment | Sakan</title>
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Apartment</h1>
            <button className="text-red-600 hover:text-red-800 flex items-center">
              <FiTrash2 className="mr-1" />
              Delete Listing
            </button>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apartment Title</label>
              <input
                type="text"
                value={apartment.title}
                onChange={(e) => setApartment({...apartment, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={apartment.address}
                onChange={(e) => setApartment({...apartment, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size (m²)</label>
              <input
                type="number"
                value={apartment.size}
                onChange={(e) => setApartment({...apartment, size: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Rooms</label>
              <input
                type="number"
                value={apartment.rooms}
                onChange={(e) => setApartment({...apartment, rooms: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Apartment Photos</label>
            
            {/* Existing Photos */}
            {apartment.photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {apartment.photos.map((photo, index) => (
                  <div key={`existing-${index}`} className="relative group">
                    <img 
                      src={photo} 
                      alt={`Apartment ${index + 1}`}
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
              {newPhotos.length > 0 && (
                <p className="text-sm text-gray-500 mt-3">{newPhotos.length} new photo(s) selected</p>
              )}
            </div>

            {/* Newly Uploaded Photos Preview */}
            {newPhotos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {newPhotos.map((photo, index) => (
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

          {/* Feature Search */}
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search features..."
            />
          </div>

          {/* Bathrooms */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection('bathrooms')}
            >
              <h2 className="text-lg font-semibold">Bathrooms ({apartment.bathrooms.length})</h2>
              {expandedSections.bathrooms ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.bathrooms && (
              <div className="p-4">
                {apartment.bathrooms.map(bathroom => (
                  <div key={bathroom.id} className="mb-6 last:mb-0 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{bathroom.name}</h3>
                      <button 
                        onClick={() => removeBathroom(bathroom.id)}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center"
                      >
                        <FiTrash2 className="mr-1" size={14} />
                        Remove
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filteredFeatures(allFeatures.bathroom).map(feature => (
                        <button
                          key={`${bathroom.id}-${feature}`}
                          type="button"
                          onClick={() => toggleBathroomFeature(bathroom.id, feature)}
                          className={`px-3 py-1 rounded-full text-sm ${bathroom.features.includes(feature) ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={addBathroom}
                  className="mt-4 px-4 py-2 border border-dashed border-gray-300 text-gray-600 rounded-md hover:border-indigo-500 hover:text-indigo-600"
                >
                  + Add Bathroom
                </button>
              </div>
            )}
          </div>

          {/* Kitchen */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection('kitchen')}
            >
              <h2 className="text-lg font-semibold">Kitchen</h2>
              {expandedSections.kitchen ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.kitchen && (
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {filteredFeatures(allFeatures.kitchen).map(feature => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature('kitchen', feature)}
                      className={`px-3 py-1 rounded-full text-sm ${apartment.kitchen.appliances.includes(feature) ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Living Room */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection('livingroom')}
            >
              <h2 className="text-lg font-semibold">Living Room</h2>
              {expandedSections.livingroom ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.livingroom && (
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {filteredFeatures(allFeatures.livingroom).map(feature => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature('livingroom', feature)}
                      className={`px-3 py-1 rounded-full text-sm ${apartment.livingroom.features.includes(feature) ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection('amenities')}
            >
              <h2 className="text-lg font-semibold">Other Amenities</h2>
              {expandedSections.amenities ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.amenities && (
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {filteredFeatures(allFeatures.livingroom.filter(f => !apartment.livingroom.features.includes(f))).map(feature => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => {
                        if (apartment.amenities.includes(feature)) {
                          setApartment({
                            ...apartment,
                            amenities: apartment.amenities.filter(a => a !== feature)
                          });
                        } else {
                          setApartment({
                            ...apartment,
                            amenities: [...apartment.amenities, feature]
                          });
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${apartment.amenities.includes(feature) ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium flex-1"
            >
              Cancel
            </button>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium flex-1 flex items-center justify-center">
              <FiEdit className="mr-2" />
              Update Apartment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}