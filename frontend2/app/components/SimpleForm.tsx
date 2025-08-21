// components/SignUpForm.tsx
"use client";

import { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        {
          name,
          email,
          password,
        }
      );

      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Sign Up
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Sign Up
      </button>

      {message && (
        <p className="text-center text-sm text-gray-700">{message}</p>
      )}
    </form>
  );
};

export default SignUpForm;
