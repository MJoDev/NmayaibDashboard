"use client"
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Sidebar } from "@/components/sidebar";
import { Menu } from "lucide-react";

const ProtectedLayout = ({ children }) => {
const [loading, setLoading] = useState(true);  // State for initial loading
const router = useRouter(); // New hook from next/navigation
const [isSidebarOpen, setIsSidebarOpen] = useState(true);

const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
};

useEffect(() => {
    // Token verification only in the client
    const token = Cookies.get("auth_token");
    if (!token) {
      router.push("/login");  // Redirect to login if no token
    } else {
      setLoading(false);  // If token exists, allow page rendering
    }
  }, [router]);

if (loading) {
    return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    )  // Show loading while checking
}
  return (
    <div className="w-full overflow-hidden transition-transform duration-300 ease-in-out">
      <main className="overflow-hidden flex m-3">

      <button
        onClick={handleSidebarToggle}
        className={`md:hidden p-2 text-white bg-[#14213D] rounded-full fixed top-5 z-50 ${isSidebarOpen ? 'ml-[210px]' : 'ml-0'}`}
      >
        <Menu></Menu>
      </button>
        <div
        className={`transition-transform duration-300 ease-in-out 
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-[-100%]'} `}
        >
            <Sidebar isOpen={isSidebarOpen}></Sidebar>
        </div>
        <div
          className={`flex-1 transition-transform duration-300 ease-in-out m-14`}
        >
            {children}
        </div>
    </main>
    </div>
  );
};

export default ProtectedLayout;
