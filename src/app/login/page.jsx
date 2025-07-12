"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await fetch(
        "https://sakan.runasp.net/api/Account/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        router.push("/");
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Mock API call - replace with real authentication
  const mockAPICall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          token: "mock-token",
          user: { email },
        });
      }, 1500);
    });
  };

  return (
    <section className="flex flex-row justify-between items-center m-auto text-center h-screen w-full">
      {/* Left Column */}
      <div className="bg-background flex justify-center items-center m-auto text-center w-1/2 h-screen">
        <Image src="/assets/icons/logoCol.svg" alt="Company Logo" width={150} height={150} />
      </div>

      {/* Right Column */}
      <div className="flex justify-center text-start items-center h-screen w-1/2 m-auto flex-col">
        <div className="items-center w-[90%] text-start">
          <h1 className="text-2xl items-start font-bold sm:text-3xl">Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="mb-0 mt-8 w-[90%] space-y-4">
          {/* Email Input */}
          <div>
            <label className="!text-text" htmlFor="email">
              Enter Email
            </label>
            <div className="relative">
              <input
                className={`w-full rounded-xl border-solid border-2 focus:outline-none focus:ring-2 p-4 pe-12 text-sm shadow-sm ${
                  errors.email ? "border-red-500" : "border-text"
                }`}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                {/* Email Icon */}
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="text-text" htmlFor="password">
              Enter Password
            </label>
            <div className="relative">
              <input
                className={`w-full rounded-xl border-solid border-2 focus:outline-none focus:ring-2 p-4 pe-12 text-sm shadow-sm ${
                  errors.password ? "border-red-500" : "border-text"
                }`}
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <span
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* Password Visibility Toggle Icon */}
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {showPassword ? (
                    <>
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        strokeWidth={2}
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </>
                  ) : (
                    <path
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          <div className="flex flex-col items-start justify-between">
            <p className="md:text-sm text-[10px] flex gap-2 text-gray-600">
              Forgot Password?
              <a href="/forget-password" className="underline text-linkButton">
                Click here
              </a>
            </p>
            <button
              className={`inline-block mt-2 rounded-xl w-full px-5 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-button hover:bg-buttonHover"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
