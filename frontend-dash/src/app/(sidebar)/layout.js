"use client"
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Sidebar } from "@/components/sidebar";
import { Menu } from "lucide-react";

const ProtectedLayout = ({ children }) => {
const [loading, setLoading] = useState(true);  // State for initial loading
const router = useRouter(); 
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
    <div className="w-screen h-screen overflow-hidden transition-transform duration-300 ease-in-out">
      <main className="flex m-3">
        <button
          onClick={handleSidebarToggle}
          className={`md:hidden p-2 text-white bg-[#14213D] rounded-full fixed top-5 z-50 ${
            isSidebarOpen ? 'left-[210px]' : 'left-4'
          }`}
        >
          <Menu />
        </button>
        <div
          className={`transition-transform duration-300 ease-in-out fixed ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <div
            className={`flex-1 transition-transform duration-300 ease-in-out overflow-y-auto ${
              isSidebarOpen ? 'ml-[225px]' : 'ml-0'
            }`}
            style={{ maxHeight: '100vh',  marginRight: '0', paddingRight: '0' }} // Asegura que el contenedor permita scroll
          >
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
