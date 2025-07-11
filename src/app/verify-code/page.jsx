"use client"; // Required for using React hooks and client-side functionality

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For redirecting after successful verification

function VerificationCode() {
  const router = useRouter(); // Initialize the router

  // State for verification code inputs
  const [code, setCode] = useState(["", "", "", "",""]); // Array to store each digit of the code
  const [error, setError] = useState(""); // For displaying error messages
  const [isLoading, setIsLoading] = useState(false); // For loading state

  // Handle input change
  const handleInputChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus to the next input
    if (value && index < 4) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate the code
    const fullCode = code.join("");
    if (fullCode.length !== 5) {
      setError("Please enter a 5-digit verification code.");
      return;
    }

    setIsLoading(true); // Set loading state
    setError(""); // Clear previous errors
    localStorage.setItem("code-verify",fullCode)
    setTimeout(() => router.push("/reset-password"), 3000);
  };

  return (
    <section className="flex flex-row justify-between items-center m-auto text-center h-screen w-full">
      <div className="bg-background flex justify-center items-center m-auto text-center w-1/2 h-screen">
        <Image src="/assets/icons/logoCol.svg" alt="logo" width={150} height={150} />
      </div>
      <div className="flex justify-center text-start items-center h-screen w-1/2 m-auto flex-col">
        <div className="items-center w-[70%] text-start">
          <h1 className="text-2xl items-start font-bold sm:text-3xl">
            Write Code
          </h1>
        </div>
        <div className="md:w-[70%] w-full text-start items-start h-auto space-y-4">
          <form
            className="flex w-full flex-col items-center justify-center relative rounded-xl p-4 bg-white overflow-hidden"
            onSubmit={handleSubmit}
          >
            <div className="my-6 w-full grid grid-flow-col grid-cols-4 items-center justify-center justify-items-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-input-${index}`}
                  className="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-12 w-12 max-w-full rounded-xl p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-backgroundButton focus-visible:ring-offset-0 placeholder:select-none"
                  spellCheck="false"
                  autoComplete="one-time-code"
                  aria-invalid="false"
                  type="tel"
                  aria-disabled="false"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  disabled={isLoading}
                />
              ))}
            </div>
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex flex-col w-full items-start justify-between">
              <p className="md:text-sm text-[10px] flex gap-2 text-gray-600">
                Resend Code?
                <a href="#" className="underline text-linkButton">
                  Click here
                </a>
              </p>
              <button
                className="inline-block mt-6 rounded-xl w-full bg-button px-5 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default VerificationCode;