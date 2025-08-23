"use client";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setMessage(response.data.message);

      if (response.data.success) {
        setEmail("");
        setPassword("");

        router.push("/");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`,
        {
          email,
        },
        {
          withCredentials: true,
        }
      );

      setMessage(response.data.message);

      if (response.data.success) {
        setEmail("");
        router.push("/login");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      {!openForgotPassword ? (
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-green-500 mb-6 text-center flex items-center justify-center gap-2">
            <LogIn size={24} /> Login
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
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

            {/* forgot password */}
            <div className="flex justify-between items-center text-sm text-gray-400 text-center mt-6">
              <a href="#" className="text-green-500 hover:underline">
                Don't have an account?
              </a>
              <button
                onClick={() => setOpenForgotPassword(true)}
                className="text-green-500 hover:underline"
              >
                Forgot Password
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition duration-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          {/* Extra */}
          <p className="text-sm text-gray-400 text-center mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-green-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
          <label className="block text-sm text-gray-300 mb-3">
            Enter Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <button
            onClick={handleForgotPasswordSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition duration-200 mt-4"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
          <button
            onClick={() => setOpenForgotPassword(false)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition duration-200 mt-4"
            disabled={loading}
          >
            Back
          </button>

          {message && (
            <p className="text-center text-sm mt-4 text-red-500">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}
