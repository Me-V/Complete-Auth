"use client";

import { useState } from "react";
import axios from "axios";
import Verification from "./VerificationDailog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ApiResponse = {
  success: boolean;
  message: string;
};

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openVerification, setOpenVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openLoginWithPhone, setOpenLoginWithPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/signup-email`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setName("");
        setEmail("");
        setPassword("");

        setOpenVerification(true);
        toast.success("Check your email for verification code");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Error in signing up");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/signup-phone`,
        { phone, name },
        { withCredentials: true }
      );

      setMessage(response.data.message);

      if (response.data.success) {
        toast.success("OTP sent successfully");
        setOtpSent(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error in sending OTP");
      } else {
        toast.error("Error in sending OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-otp`,
        { phone, otp },
        { withCredentials: true }
      );

      setMessage(response.data.message);

      if (response.data.success) {
        setPhone("");
        setOtp("");
        setOtpSent(false);
        setOpenLoginWithPhone(false);
        router.push("/");
        toast.success("OTP verified successfully");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error in verifying OTP");
      } else {
        toast.error("Error in verifying OTP");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {openVerification ? (
        <Verification />
      ) : !openLoginWithPhone && !otpSent ? (
        <form
          onSubmit={handleSubmit}
          className="w-[400px] mx-auto mt-10 p-8 bg-gray-800 rounded-2xl shadow-lg space-y-5"
        >
          <h2 className="text-2xl font-semibold text-green-500 text-center">
            Create Account
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 font-medium"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="flex justify-center items-center flex-col text-center text-sm text-gray-300">
            <div>
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-green-500 hover:underline cursor-pointer"
              >
                Login
              </button>
            </div>
            {/* sign up with phone */}
            <button
              onClick={() => setOpenLoginWithPhone(true)}
              className="text-green-500 hover:underline cursor-pointer mt-2"
            >
              Sign Up with Phone
            </button>
          </div>
        </form>
      ) : openLoginWithPhone && !otpSent ? (
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-green-500 text-center mb-4">
            Sign Up with Phone
          </h2>

          <label className="block text-sm text-gray-300 mb-3">Enter Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <label className="block text-sm text-gray-300 my-2">
            Enter Phone Number
          </label>
          <input
            type="tel"
            placeholder="XXX XXX XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <button
            onClick={handleSendOtp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition duration-200 mt-4"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
          <button
            onClick={() => {
              setOpenLoginWithPhone(false);
              setOpenForgotPassword(false);
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-md transition duration-200 mt-4"
            disabled={loading}
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-green-500 underline cursor-pointer mt-6"
          >
            Login with your number instead
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
          <label className="block text-sm text-gray-300 mb-3">Enter OTP</label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none tracking-widest text-center text-xl"
          />

          <button
            onClick={handleVerifyOtp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition duration-200 mt-6"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={() => {
              setOtpSent(false), setOtp("");
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-md transition duration-200 mt-4"
          >
            Back
          </button>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
