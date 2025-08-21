"use client";
import SimpleForm from "./components/SimpleForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ grab from localStorage
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }
  
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/check-auth`,
          {
            headers: { Authorization: `Bearer ${token}` }, // ✅ send in header
          }
        );
  
        setUser(response.data.user);
      } catch (error) {
        console.log("Not authenticated:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);



  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <p className="text-green-600 font-bold">
          Welcome back, {user.name || user.email} 👋
        </p>
      ) : (
        <p className="text-red-500">Not logged in</p>
      )}

      {user ? (
        <p className="text-green-600 font-bold">
          Welcome back, {user.name || user.email} 👋
        </p>
      ) : (
        <button onClick={() => router.push("/signup")} className="bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition duration-200">Sign Up</button>
      )}
    </div>
  );
}
