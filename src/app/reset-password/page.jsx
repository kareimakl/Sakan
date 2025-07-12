"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ResetPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const storedCode =
    typeof window !== "undefined" ? localStorage.getItem("code-verify") : null;
  const storedEmail =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  useEffect(() => {
    if (!storedEmail || !storedCode) {
      // setError("Verification code or email is missing. Please try again.");
    }
  }, [storedEmail, storedCode]);
  console.log("Stored Email:", storedEmail);
  console.log("Stored Code:", storedCode);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storedEmail || !storedCode) {
      setError("Verification code or email is missing.");
      return;
    }
    if (!newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        "https://sakan.runasp.net/api/account/resetpassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: storedEmail,
            verificationCode: storedCode,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const contentType = response.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json(); // Parse as JSON
      } else {
        data = await response.text(); // Parse as plain text
      }
      console.log("API response data:", data);
      // console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      localStorage.removeItem("code-verify");
      localStorage.removeItem("email");
      setSuccessMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-row justify-between items-center m-auto text-center h-screen w-full">
      <div className="bg-background flex justify-center items-center m-auto text-center w-1/2 h-screen">
        <Image
          src="/assets/icons/logoCol.svg"
          alt="logo"
          width={150}
          height={150}
        />
      </div>
      <div className="flex justify-center text-start items-center h-screen w-1/2 m-auto flex-col">
        <div className="items-center w-[90%] text-start">
          <h1 className="text-2xl items-start font-bold sm:text-3xl">
            Reset Password
          </h1>
        </div>
        <form className="mb-0 mt-8 w-[90%] space-y-4" onSubmit={handleSubmit}>
          {/* New Password Input */}
          <div>
            <label className="text-text" htmlFor="newPassword">
              New Password
            </label>
            <input
              className="w-full rounded-xl border-solid border-text border-2 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-backgroundButton p-4 text-sm shadow-sm"
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="text-text" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full rounded-xl border-solid border-text border-2 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-backgroundButton p-4 text-sm shadow-sm"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}

          {/* Submit Button */}
          <button
            className={`inline-block mt-2 rounded-xl w-full px-5 py-3 text-sm font-bold text-white transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-button hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
