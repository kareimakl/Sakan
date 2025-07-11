// components/Footer.jsx
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#245685] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Logo & Intro */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-full">
              {/* Icon of home */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9.75L12 4l9 5.75M9 22V12h6v10"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Sakan</h2>
          </div>
          <p>
            Find Your Dream <br />
            Accommodation
          </p>
          <div className="flex gap-4 text-lg text-gray-200">
            <FaTiktok />
            <FaInstagram />
            <FaFacebookF />
            <FaLinkedinIn />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col  text-start !items-start justify-start gap-2">
          <h3 className="font-bold mb-2 uppercase text-[13px]">Navigation</h3>
          <a href="#">About Us</a>
          <a href="#">FAQ</a>
          <a href="#">Erasmus Lifa Lisboa</a>
          <a href="#">Apply For Internship</a>
        </div>

        {/* Tenants */}
        <div className="flex flex-col !items-start gap-2">
          <h3 className="font-bold mb-2 uppercase text-[13px]">Tenants</h3>
          <a href="#">Video Chat</a>
          <a href="#">Housing Guide</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-2 !items-start">
          <h3 className="font-bold mb-2 uppercase text-[13px]">Resources</h3>
          <p>
            Travessa da Cara, 14, 1200–089
            <br />
            Lisbon - Portugal
          </p>
          <p>+351 932 483 834</p>
          <p>hello@erasmuslifehousing.com</p>
        </div>
      </div>
    </footer>
  );
}
