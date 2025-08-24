"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, LogOut, LogIn } from "lucide-react";

type User = {
  name: string;
  email: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/check-auth`,
          {
            withCredentials: true,
          }
        );
        setUser(res.data.user);
      } catch (error) {
        console.log("Not logged in", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        setUser(null);
        router.push("/login");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.log("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-green-400">
        <Loader2 size={48} className="animate-spin" />
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      {user ? (
        <div className="flex flex-col items-center gap-6 bg-gray-800/70 rounded-2xl p-10 shadow-xl w-full max-w-lg">
          <h1 className="text-4xl font-bold text-green-400">
            Welcome, {user.name} 👋
          </h1>
          {user.email && (
            <p className="text-lg text-gray-300">
              📧 <span className="text-green-300">{user.email}</span>
            </p>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 bg-gray-800/70 rounded-2xl p-10 shadow-xl w-full max-w-lg">
          <h1 className="text-4xl font-bold text-green-400">Welcome 👋</h1>
          <p className="text-gray-300 text-center">
            Please login to continue and explore.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition"
          >
            <LogIn size={20} /> Login
          </button>
        </div>
      )}
    </div>
  );
}
