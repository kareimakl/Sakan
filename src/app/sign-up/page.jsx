"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SignUP() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("Owners"); // Removed setRole since it's static
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    const regex = /[^a-zA-Z0-9]/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim inputs to remove whitespace
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(trimmedPassword)) {
      setError(
        "Password must contain at least one non-alphanumeric character (e.g., !, @, #)."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://sakan.runasp.net/api/Account/Register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            password: trimmedPassword,
            confirm_Password: trimmedConfirmPassword,
            role, // Static role value
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

      console.log("Response:", data);
      setIsLoading(false);
      router.push("/")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex flex-row justify-between items-center m-auto text-center h-screen w-full">
      <div className="bg-background flex justify-center items-center m-auto text-center w-1/2 h-screen">
        <Image src="/assets/icons/logoCol.svg" alt="logo" width={150} height={150} />
      </div>
      <div className="flex justify-center text-start items-center h-screen w-1/2 m-auto flex-col">
        <div className="items-center w-[90%] text-start">
          <h1 className="text-2xl items-start font-bold sm:text-3xl">
            Sign UP
          </h1>
        </div>
        <form className="mb-0 mt-8 w-[90%] space-y-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label className="!text-text" htmlFor="name">
              Enter Name
            </label>
            <div className="relative">
              <input
                className="w-full rounded-xl border-solid border-text border-2 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-backgroundButton p-4 pe-12 text-sm shadow-sm"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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

          {/* Password Input */}
          <div>
            <label className="text-text" htmlFor="password">
              Enter Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-xl border-solid border-text border-2 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-backgroundButton p-4 pe-12 text-sm shadow-sm"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="text-text" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-xl border-solid border-text border-2 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-backgroundButton p-4 pe-12 text-sm shadow-sm"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Role Input (Hidden, default is "Owners") */}
          <input type="hidden" value={role} />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Password Requirements */}
          <p className="text-sm text-gray-600">
            Password must contain at least one non-alphanumeric character (e.g.,
            !, @, #).
          </p>

          {/* Terms and Conditions */}
          <div className="flex text-center flex-col items-center justify-between">
            <p className="md:text-sm text-[10px] flex gap-1 text-gray-600">
              <input type="checkbox" required />
              by signing up you accept the
              <a href="#" className="underline text-linkButton">
                Terms of Service
              </a>
              <span>and</span>
              <a href="#" className="underline text-linkButton">
                Privacy Policy
              </a>
            </p>
            <button
              className="inline-block mt-2 rounded-xl w-full bg-button px-5 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>

          {/* Login Link */}
          <p className="md:text-sm text-[10px] text-center flex gap-2 items-center text-gray-600">
            Already have an Account?
            <a href="/login" className="underline text-linkButton">
              Login
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default SignUP;
