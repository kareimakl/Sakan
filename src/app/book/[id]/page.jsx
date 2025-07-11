import Image from "next/image";
import { fetchFromApi } from "../../../../lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Data from "./components/data";
export default async function PropertyDetail({ params }) {
  const property = await fetchFromApi(`Apartment/${params.id}`);
  const propertyAll = await fetchFromApi(`Apartment`);

  if (!property) return <div className="p-8">Property not found</div>;

  return (
    <main>
      <Header />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery */}
          <div className="space-y-2">
            <Image
              src={property.imagePaths?.[0] || "/no-image.jpg"}
              alt="Main Image"
              width={800}
              height={400}
              className="rounded-lg w-full h-[300px] object-cover"
            />
            {/* إذا عندك أكثر من صورة، أضفها هنا */}
          </div>

          {/* Title & Info */}
          <div>
            <div className=" flex justify-between items-center">
              <h1 className="text-2xl font-bold mb-1">{property.titledto}</h1>
              <div className="text-center text-background py-3 rounded text-lg font-bold">
                {property.pricePerMonthdto} EGP/month
              </div>
            </div>

            <p className="text-gray-500">{property.locationdto}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Tag>3 bedrooms </Tag>
              <Tag>240 m2</Tag>
              <Tag>2 Bathroom</Tag>
              <Tag>Furnished</Tag>
              <Tag>Cleaning Included</Tag>
              <Tag>Bed Linen/Towels</Tag>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-semibold text-lg mb-2">Description</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {property.descriptiondto || "لا يوجد وصف."}
            </p>
          </div>

          {/* Facilities */}
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-semibold text-lg mb-2">Facilities</h2>
            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
              <Tag>Shared Living Room</Tag>
              <Tag>Balcony</Tag>
              <Tag>WiFi</Tag>
              <Tag>Heating</Tag>
              <Tag>Washing Machine</Tag>
              <Tag>Air Conditioner</Tag>
            </div>
          </div>

          {/* Rules */}
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-semibold text-lg mb-2">Landlord rules</h2>
            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
              <Tag>No smoking allowed</Tag>
              <Tag>Pets are not allowed</Tag>
              <Tag>Overnight guests are allowed</Tag>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <aside className="space-y-6">
          {/* Location Map */}
          <div className="bg-gray-100 p-4 rounded">
            <Data  propertyId={property.id}/>
          </div>

          {/* Info List */}
          <ul className="bg-gray-100 p-4 rounded space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#255685] rounded-full" />
              Professional Team
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#255685] rounded-full" />
              Book a Call
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#255685] rounded-full" />
              Verified Room
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#255685] rounded-full" />
              Fast and Secure Booking
            </li>
          </ul>

          <div className="text-center bg-background text-white py-3 rounded text-lg font-bold">
            Book Now
          </div>
        </aside>
      </div>
      <div className="p-6 container m-auto mt-16 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(propertyAll) &&
            propertyAll.slice(0, 3).map((property) => (
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
      </div>
      <Footer />
    </main>
  );
}

function Tag({ children }) {
  return (
    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
      {children}
    </span>
  );
}
