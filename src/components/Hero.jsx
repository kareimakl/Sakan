import Image from "next/image";

export default function Home() {
  return (
    <div className=" mt-4 flex-col container m-auto  flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-8  w-full flex flex-col md:flex-row items-center">
        {/* Left Section */}
        <div className="flex-1 mb-8 md:mb-0 md:mr-10">
          <h1 className="text-3xl font-semibold text-[#255685]">
            Find Your Future
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Dream Accommodation
          </h2>
          <p className="text-gray-500 mt-12">
            Want to find an accommodation? We are ready to help you find one
            that suits your lifestyle and needs.
          </p>

          <div className="flex gap-6 mt-12  w-[100%] m-auto justify-evenly  text-center">
            <div>
              <div className="text-xl font-bold text-gray-800">550+</div>
              <div className="text-gray-500 text-sm">Rooms</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">255+</div>
              <div className="text-gray-500 text-sm">Reservation/ Semester</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">2000+</div>
              <div className="text-gray-500 text-sm">Students</div>
            </div>
          </div>

          <button className="mt-12 bg-[#F5683D] w-[300px] m-auto flex justify-center hover:bg-orange-500 text-white font-medium py-2 px-6 rounded-full">
            Find Your perfect Home
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="flex-1">
          <Image
            src="/assets/images/isabella-abreu-0lJDg5PhO0Q-unsplash.svg"
            alt="Building"
            width={500}
            height={400}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className=" relative top-12 border border-gray-300  transform  bg-white shadow-lg rounded-xl p-4 flex gap-4 items-center w-[90%] max-w-3xl">
        <select className="border border-gray-300 rounded-lg p-2 w-1/3">
          <option>Location</option>
        </select>
        <input
          type="text"
          placeholder="Budget"
          className="border border-gray-300 rounded-lg p-2 w-1/3"
        />
        <button className="bg-[#F3F4F6] text-[#000] text-center px-4 py-2 rounded-lg w-[100px]">
          Search
        </button>
      </div>
    </div>
  );
}
