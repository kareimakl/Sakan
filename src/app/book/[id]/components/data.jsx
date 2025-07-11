"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingRequest({ propertyId }) {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please select both dates");
      return;
    }

    router.push(
      `/payment?propertyId=${propertyId}&checkIn=${checkIn}&checkOut=${checkOut}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md space-y-4"
    >
      <h2 className="font-semibold text-xl">Booking Request</h2>

      <div>
        <label className="block mb-1">Check In:</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Check Out:</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#255685] text-white py-2 rounded font-semibold"
      >
        Check Booking
      </button>
    </form>
  );
}
