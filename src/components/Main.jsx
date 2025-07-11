"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { properties } from "../data/properties";
import Link from "next/link";

const PER_PAGE = 9;

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("http://sakan.runasp.net/api/Apartment");
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  const totalPages = Math.ceil(properties.length / PER_PAGE);
  const paginatedData = properties.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading)
    return (
      <div className="p-6 container m-auto mt-16 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-400"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-400">
                <svg
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
                </svg>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
              <div className="flex items-center mt-4">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-10 h-10 me-3 text-gray-200 dark:text-gray-400"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
                </svg>
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-2"></div>
                  <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="p-6 container m-auto mt-16 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white relative rounded-lg shadow-md overflow-hidden"
          >
            {/* ✅ Link مع span لتغطية الكرت بالكامل */}
            <Link href={`/properties/${property?.id}`}>
              <span className="absolute w-full h-full m-auto z-10"></span>
            </Link>

            {/* ✅ الصورة */}
            <Image
              src={property?.imagePaths?.[0] || "/no-image.jpg"}
              alt="Property"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />

            {/* ✅ المحتوى */}
            <div className="p-4 w-[90%] flex flex-col justify-center m-auto text-center relative z-20">
              <h2 className="text-lg font-semibold">
                {property?.titledto || "No title"}
              </h2>

              <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                <img
                  src="/assets/icons/Vector (3) copy.svg"
                  alt=""
                  className="w-4 h-4"
                />
                {property?.locationdto || "No location"}
              </p>

              <div className="border w-full border-[#DCDCDC] my-4"></div>

              <div className="grid grid-cols-2 gap-6 mt-4 text-sm text-gray-600">
                <p className="flex gap-2">
                  <img
                    src="/assets/icons/ep_menu.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  {property?.size || "N/A"}
                </p>
                <p className="flex gap-2">
                  <img
                    src="/assets/icons/CHAIR.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  {property?.furnished ? "🛋 Furnished" : "Unfurnished"}
                </p>
                <p className="flex gap-2">
                  <img
                    src="/assets/icons/Vector (1).svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  {property?.bedrooms || "N/A"} Bedrooms
                </p>
                <p className="flex gap-2">
                  <img
                    src="/assets/icons/Vector.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  {property?.bathrooms || "N/A"} Bathrooms
                </p>
                <p className="flex gap-2">
                  <img
                    src="/assets/icons/bi_person-fill.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  {property?.agent || "N/A"}
                </p>
                <p className="flex gap-2">
                  <img
                    src="/assets/icons/bx_time-five.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  {property?.daysAgo || "N/A"} days ago
                </p>
              </div>
            </div>

            {/* ✅ السعر */}
            <div className="bg-[#255685] text-white text-center py-3 font-semibold">
              {property?.pricePerMonthdto
                ? `${property.pricePerMonthdto} EGP/month`
                : "No price"}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-blue-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
