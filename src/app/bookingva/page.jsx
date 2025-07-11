// pages/booking/[id].js

"use client";
import { useState } from "react";
import Head from "next/head";
import {
  FiCreditCard,
  FiHelpCircle,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState("payment");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    remember: false,
  });
  const [showAssistant, setShowAssistant] = useState(false);

  const bookingDetails = {
    property: "Room 1 in 302 North Palm Drive",
    location: "Beverly Hills, CA 90210",
    checkIn: "01 Feb, 2024",
    priceDetails: [
      { label: "Monthly", amount: "$800" },
      { label: "Bills (Gas, Media, Cleaning)", amount: "$120" },
      { label: "Fee", amount: "$50" },
      { label: "Total", amount: "$970", isTotal: true },
    ],
  };

  const handleCardChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Booking Process | Sakan</title>
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Booking Steps */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              {/* Booking Steps Header */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`flex-1 py-4 px-6 text-center font-medium ${
                      activeTab === "payment"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Payment
                  </button>
                  <button
                    onClick={() => setActiveTab("confirmation")}
                    className={`flex-1 py-4 px-6 text-center font-medium ${
                      activeTab === "confirmation"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Confirmation
                  </button>
                </nav>
              </div>

              {/* Payment Tab */}
              {activeTab === "payment" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                  <div className="space-y-4 mb-8">
                    <div
                      onClick={() => setPaymentMethod("creditCard")}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        paymentMethod === "creditCard"
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            paymentMethod === "creditCard"
                              ? "border-indigo-500 bg-indigo-500"
                              : "border-gray-400"
                          }`}
                        >
                          {paymentMethod === "creditCard" && (
                            <FiCheck className="text-white text-xs" />
                          )}
                        </div>
                        <span className="font-medium">Credit Card</span>
                        <div className="ml-auto flex space-x-2">
                          <img src="/visa.png" alt="Visa" className="h-6" />
                          <img
                            src="/mastercard.png"
                            alt="Mastercard"
                            className="h-6"
                          />
                          <img
                            src="/amex.png"
                            alt="American Express"
                            className="h-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("applePay")}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        paymentMethod === "applePay"
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            paymentMethod === "applePay"
                              ? "border-indigo-500 bg-indigo-500"
                              : "border-gray-400"
                          }`}
                        >
                          {paymentMethod === "applePay" && (
                            <FiCheck className="text-white text-xs" />
                          )}
                        </div>
                        <span className="font-medium">Apple Pay</span>
                        <img
                          src="/apple-pay.png"
                          alt="Apple Pay"
                          className="h-6 ml-auto"
                        />
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        paymentMethod === "paypal"
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            paymentMethod === "paypal"
                              ? "border-indigo-500 bg-indigo-500"
                              : "border-gray-400"
                          }`}
                        >
                          {paymentMethod === "paypal" && (
                            <FiCheck className="text-white text-xs" />
                          )}
                        </div>
                        <span className="font-medium">PayPal</span>
                        <img
                          src="/paypal.png"
                          alt="PayPal"
                          className="h-6 ml-auto"
                        />
                      </div>
                    </div>
                  </div>

                  {paymentMethod === "creditCard" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card number
                        </label>
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Security code
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            placeholder="CVV"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="remember"
                          checked={cardDetails.remember}
                          onChange={handleCardChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Remember my payment details
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <button
                      onClick={() => setActiveTab("confirmation")}
                      className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
                    >
                      Continue to Confirmation
                    </button>
                  </div>
                </div>
              )}

              {/* Confirmation Tab */}
              {activeTab === "confirmation" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">
                    Cancellation Policy
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700 mb-4">
                      By selecting the button below, I agree to the Erasmus Life
                      Housing rules, Booking and Refund rules.
                    </p>
                    <p className="text-gray-700">
                      I also agree to the updated Terms of Service, Payments
                      Terms of Service, and I acknowledge the Privacy Policy.
                    </p>
                  </div>
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                    Confirm and Book
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">
                {bookingDetails.property}
              </h2>
              <p className="text-gray-600 mb-6">{bookingDetails.location}</p>

              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="font-medium mb-2">Check In</h3>
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  </div>
                  <span>{bookingDetails.checkIn}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Details</h3>
                <div className="space-y-2">
                  {bookingDetails.priceDetails.map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between ${
                        item.isTotal
                          ? "border-t border-gray-200 pt-2 font-bold"
                          : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      <span>{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Write your message
                </label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Any special requests or notes..."
                ></textarea>
              </div>
            </div>

            {/* Virtual Assistant */}
            <div
              className={`fixed bottom-4 right-4 transition-all duration-300 ${
                showAssistant ? "w-80 h-96" : "w-16 h-16"
              }`}
            >
              {showAssistant ? (
                <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-medium">Virtual Assistant</h3>
                    <button
                      onClick={() => setShowAssistant(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="text-center text-gray-500 py-8">
                      <p className="mb-2">How can I help you today?</p>
                      <p className="text-sm">What can this assistant do?</p>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <input
                      type="text"
                      placeholder="Type your question..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAssistant(true)}
                  className="w-16 h-16 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700"
                >
                  <FiHelpCircle size={24} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
