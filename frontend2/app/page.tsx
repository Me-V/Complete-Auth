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
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/check-auth`,
          {
            withCredentials: true, // VERY IMPORTANT for cookies
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
        {}, // body (empty for logout)
        { withCredentials: true } // config (cookies included here)
      );
      if (response.data.success) {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      {user !== null ? (
        <button
          className="mb-3 cursor-pointer bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="mb-3 cursor-pointer bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      )}

      {user !== null && (
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-center text-5xl text-green-300 font-serif mb-10">
            welcome {user.name}
          </h1>
          <h1 className="text-center text-2xl text-green-300">
            Mail :- {user.email}
          </h1>
        </div>
      )}
    </div>
  );
}
