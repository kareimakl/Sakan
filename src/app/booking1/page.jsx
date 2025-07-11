// pages/booking/[id].js
"use client"
import { useState } from 'react';
import Head from 'next/head';
import { FiCreditCard, FiCheck, FiChevronRight } from 'react-icons/fi';

export default function BookingPage() {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    remember: false
  });
  const [selectedCheckIn, setSelectedCheckIn] = useState('01 Feb, 2024');

  const bookingDetails = {
    property: 'Room 1 in 302 North Palm Drive',
    location: 'Beverly Hills, CA 90210',
    checkInOptions: ['01 Feb, 2024', '25 Mar, 2024'],
    priceDetails: [
      { label: 'Monthly', amount: '800$' },
      { label: 'Bills (Gas, Media, Cleaning)', amount: '25$' },
      { label: 'Fee', amount: '75$' },
      { label: 'Total', amount: '900$', isTotal: true }
    ]
  };

  const handleCardChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Booking Process | Sakan</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Payment Process */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h1 className="text-2xl font-bold mb-6">1. Payment</h1>
              
              {/* Payment Methods */}
              <div className="space-y-3 mb-8">
                <div 
                  onClick={() => setPaymentMethod('visa')}
                  className={`p-4 border rounded-lg cursor-pointer flex items-center ${paymentMethod === 'visa' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'visa' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-400'}`}>
                    {paymentMethod === 'visa' && <FiCheck className="text-white text-xs" />}
                  </div>
                  <span className="font-medium">VISA</span>
                </div>

                <div 
                  onClick={() => setPaymentMethod('applePay')}
                  className={`p-4 border rounded-lg cursor-pointer flex items-center ${paymentMethod === 'applePay' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'applePay' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-400'}`}>
                    {paymentMethod === 'applePay' && <FiCheck className="text-white text-xs" />}
                  </div>
                  <span className="font-medium">Apple Pay</span>
                </div>

                <div 
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 border rounded-lg cursor-pointer flex items-center ${paymentMethod === 'paypal' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'paypal' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-400'}`}>
                    {paymentMethod === 'paypal' && <FiCheck className="text-white text-xs" />}
                  </div>
                  <span className="font-medium">PayPal</span>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'visa' && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-4 flex items-center">
                    <FiCreditCard className="mr-2" />
                    Credit Card
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">Mastercard, Visa, American Amex</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Security number</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          placeholder="XXX"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Remember Payment */}
              <div className="flex items-center mb-8">
                <input
                  type="checkbox"
                  name="remember"
                  checked={cardDetails.remember}
                  onChange={handleCardChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Remember my payment details</label>
              </div>

              {/* Cancellation Policy */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-4">2. Cancellation Policy</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 mb-3">
                    By selecting the button below, I agree to the Erasmus Life Housing rules, Booking and Refund rules.
                  </p>
                  <p className="text-gray-700">
                    I also agree to the updated Terms of Service, Payments Terms of Service, and I acknowledge the Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Confirm Button */}
              <button className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium flex items-center justify-center">
                Confirm and Book
                <FiChevronRight className="ml-2" />
              </button>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-2">{bookingDetails.property}</h2>
              <p className="text-gray-600 mb-6">{bookingDetails.location}</p>
              
              {/* Check-in Options */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Check In:</h3>
                <div className="space-y-2">
                  {bookingDetails.checkInOptions.map((date, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedCheckIn(date)}
                      className={`p-3 border rounded-lg cursor-pointer flex items-center ${selectedCheckIn === date ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${selectedCheckIn === date ? 'border-indigo-500 bg-indigo-500' : 'border-gray-400'}`}>
                        {selectedCheckIn === date && <FiCheck className="text-white text-xs" />}
                      </div>
                      <span>{date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div>
                <h3 className="font-medium mb-3">Price Details</h3>
                <div className="space-y-3">
                  {bookingDetails.priceDetails.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between ${item.isTotal ? 'border-t border-gray-200 pt-3 font-bold' : ''}`}
                    >
                      <span>{item.label}</span>
                      <span>{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}