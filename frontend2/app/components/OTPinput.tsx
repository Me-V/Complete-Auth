import React from "react";

const OTPinput = ({
  otp,
  setOtp,
  handleVerifyOtp,
  loading,
  setOtpSent,
}: {
  otp: string;
  setOtp: (otp: string) => void;
  handleVerifyOtp: () => void;
  loading: boolean;
  setOtpSent: (otpSent: boolean) => void;
}) => {
  return (
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
  );
};

export default OTPinput;
