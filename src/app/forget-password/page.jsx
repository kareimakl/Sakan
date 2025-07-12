"use client"; // Required for using React hooks and client-side functionality

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For redirecting after successful submission

function ForgotPassword() {
  const router = useRouter(); // Initialize the router

  // State for form inputs
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // For displaying error messages
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [successMessage, setSuccessMessage] = useState(""); // For success messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setError("Email is required.");
      return;
    }
  
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
  
    try {
      const response = await fetch(
        "https://sakan.runasp.net/api/Account/ForgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
  
      const contentType = response.headers.get("content-type");
      let data;
  
      if (contentType && contentType.includes("application/json")) {
        data = await response.json(); // إذا كان الرد JSON
      } else {
        data = await response.text(); // إذا كان الرد نصاً عادياً
      }
  
      console.log("API Response:", data);
  
      if (!response.ok) {
        throw new Error(typeof data === "string" ? data : data.message || "Something went wrong.");
      }
  
      setSuccessMessage("Verification code sent to your email. Redirecting to verification page...");
      localStorage.setItem("email", email)
      setTimeout(() => router.push("/verify-code"), 3000);
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="flex flex-row justify-between items-center m-auto text-center h-screen w-full">
      <div className="bg-background flex justify-center items-center m-auto text-center w-1/2 h-screen">
        <Image src="./assets/icons/logoCol.svg" alt="logo" width={150} height={150} />
      </div>
      <div className="flex justify-center text-start items-center h-screen w-1/2 m-auto flex-col">
        <div className="items-center w-[90%] text-start">
          <h1 className="text-2xl items-start font-bold sm:text-3xl">
            Forgot Password
          </h1>
        </div>
        <form className="mb-0 mt-8 w-[90%] space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="!text-text" htmlFor="email">
              Enter Email
            </label>
            <div className="relative">
              <input
                className="w-full rounded-xl border-solid border-text border-2 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-backgroundButton p-4 pe-12 text-sm shadow-sm"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}

          {/* Submit Button */}
          <div className="flex flex-col items-start justify-between">
            <button
              className={`inline-block mt-2 rounded-xl w-full px-5 py-3 text-sm font-bold text-white transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-button hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Get Verification Code"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
