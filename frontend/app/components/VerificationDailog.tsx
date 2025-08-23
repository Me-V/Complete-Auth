"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type ApiResponse = {
  success: boolean;
  message: string;
};

const Verification = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-email`,
        { code }
      );

      setMessage(response.data.message);

      if (response.data.success) {
        setCode("");
        router.push("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Something went wrong");
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-green-200">
        <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
          Verify Your Email
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="px-4 py-2 border text-black border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Verify
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Verification;
