"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Form from "./_components/form";
import { jwtDecode } from "jwt-decode";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ تحقق من وجود التوكن
        if (!token) {
          console.warn("Token is missing from localStorage");
          setNotFound(true); // أو setError("لم يتم العثور على مستخدم")
          return;
        }

        const decoded = jwtDecode(token); // استخدم jwtDecode وليس jwt_decode
        const email =
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ];

        const res = await fetch("https://sakan.runasp.net/api/Students");
        const students = await res.json();

        const matchedStudent = students.find(
          (s) => s.email === "elsayedahmed.official1@gmail.com"
        );

        if (!matchedStudent) {
          setNotFound(true);
          return;
        }

        setUser(matchedStudent);
      } catch (err) {
        console.log("حدث خطأ أثناء جلب البيانات", err);
        setError("حدث خطأ أثناء جلب البيانات");
      }
    };

    fetchUser();
  }, []);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p> مفيش مستخدم بالبيانات دي</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Sakan - Account</title>
      </Head>

      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={
                    user.imagePaths && user.imagePaths.length > 0
                      ? user.imagePaths[0]
                      : "/placeholder-avatar.jpg"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab("basic")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === "basic"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Basic Info
                  </button>
                  <button
                    onClick={() => setActiveTab("additional")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === "additional"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Additional Details & Documents
                  </button>
                </nav>
              </div>

              {/* Tab content */}
              <div className="p-6">
                {activeTab === "basic" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={user.firstname}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={user.lastname}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <input
                          type="text"
                          value={user.gender}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={user.phonenumber}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nationality
                        </label>
                        <input
                          type="text"
                          value={"مصري"} // افتراضياً
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Form />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
