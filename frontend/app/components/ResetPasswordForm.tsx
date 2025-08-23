"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

type ApiResponse = {
  success: boolean;
  message: string;
};

export default function ResetPasswordForm({ slug }: { slug: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password/${slug}`,
        { password },
        { withCredentials: true }
      );

      setMessage(response.data.message);

      if (response.data.success) {
        setPassword("");
        router.push("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Something went wrong");
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Password */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Enter New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-green-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition duration-200"
        disabled={loading}
      >
        {loading ? "Resetting Password..." : "Reset Password"}
      </button>

      {message && (
        <p className="text-center text-sm text-gray-400 mt-2">{message}</p>
      )}
    </form>
  );
}
