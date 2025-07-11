"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const propertyId = searchParams.get("propertyId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (propertyId) {
      fetch(`https://sakan.runasp.net/api/Apartment/${propertyId}`)
        .then((res) => res.json())
        .then((data) => setProperty(data))
        .catch((err) => console.error(err));
    }
  }, [propertyId]);

  if (!property) {
    return <div className="p-8">.....</div>;
  }
  return (
    <div>
      <Header />
      <div className="grid w-full m-auto justify-center items-center grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Left - Payment */}
        <div className="modal2 p-6 bg-white rounded shadow w-[50%] m-auto">
          <form className="form space-y-6">
            {/* خيارات الدفع */}
            <div className="payment--options flex justify-around">
              <button
                name="paypal"
                type="button"
                className="flex w-full justify-center items-center m-auto"
              >
                {/* 🔁 شعار PayPal SVG */}
                <img
                  src="/assets/icons/visa-logo.svg"
                  alt="PayPal"
                  className="h-5 object-cover"
                />
              </button>
              <button
                name="apple-pay"
                type="button"
                className="flex w-full justify-center items-center m-auto"
              >
                <img
                  src="/assets/icons/ApplePay.svg"
                  alt="Apple Pay"
                  className="h-5 object-cover"
                />
              </button>
              <button
                name="google-pay"
                className="flex w-full justify-center items-center m-auto"
                type="button"
              >
                <img
                  src="/assets/icons/PayPal.svg"
                  alt="Google Pay"
                  className="h-5 object-cover"
                />
              </button>
            </div>

            {/* فاصل */}
            <div className="separator flex items-center space-x-2 text-gray-500 text-sm">
              <hr className="flex-grow border-t" />
              <p>or pay using credit card</p>
              <hr className="flex-grow border-t" />
            </div>

            {/* نموذج البطاقة */}
            <div className="credit-card-info--form space-y-4">
              <div className="input_container">
                <label htmlFor="cardHolder" className="input_label block mb-1">
                  Card holder full name
                </label>
                <input
                  id="cardHolder"
                  className="input_field w-full p-2 border rounded"
                  type="text"
                  name="cardHolder"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="input_container">
                <label htmlFor="cardNumber" className="input_label block mb-1">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  className="input_field w-full p-2 border rounded"
                  type="text"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  required
                />
              </div>

              <div className="input_container">
                <label className="input_label block mb-1">
                  Expiry Date / CVV
                </label>
                <div className="split flex space-x-2">
                  <input
                    className="input_field w-1/2 p-2 border rounded"
                    type="text"
                    name="expiry"
                    placeholder="01/23"
                    required
                  />
                  <input
                    className="input_field w-1/2 p-2 border rounded"
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>

            <button className="w-full bg-[#255685] text-white py-2 rounded font-semibold">
              Confirm and Book
            </button>
          </form>
        </div>

        {/* Right - Summary */}
        <div className="bg-gray-100 p-6 rounded-lg space-y-4">
          <Image
            src={property.imagePaths?.[0] || "/room.jpg"}
            alt="Room"
            width={600}
            height={200}
            className="rounded h-[300px] object-cover"
          />
          <h2 className="text-xl font-semibold">{property.titledto}</h2>
          <p>{property.locationdto}</p>
          <p>Check In: {checkIn}</p>
          <p>Check Out: {checkOut}</p>

          <div className="border-t pt-4 space-y-1 text-sm">
            <p>
              Monthly:{" "}
              <span className="float-right">{property.pricePerMonthdto}$</span>
            </p>
            <p>
              Bills: <span className="float-right">25$</span>
            </p>
            <p>
              Fee: <span className="float-right">75$</span>
            </p>
            <p className="font-bold border-t pt-2">
              Total:{" "}
              <span className="float-right">
                {property.pricePerMonthdto + 25 + 75}$
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
