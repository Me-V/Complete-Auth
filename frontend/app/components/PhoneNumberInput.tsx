import React from "react";

const PhoneNumberInput = ({
  phone,
  setPhone,
  handleSendOtp,
  loading,
  setOpenLoginWithPhone,
  setOpenForgotPassword,
}: {
  phone: string;
  setPhone: (phone: string) => void;
  handleSendOtp: () => void;
  loading: boolean;
  setOpenLoginWithPhone: (open: boolean) => void;
  setOpenForgotPassword: (open: boolean) => void;
}) => {
  return (
    <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
      <label className="block text-sm text-gray-300 mb-3">
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
        onClick={() => setOpenLoginWithPhone(false)}
        className="text-green-500 underline cursor-pointer mt-6"
      >
        Register Your Phone Number
      </button>
    </div>
  );
};

export default PhoneNumberInput;
