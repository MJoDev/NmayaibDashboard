"use client"

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter} from "next/navigation";

export default function NotAdminLayout({children}){
    const [loading, setLoading] = useState(true);  // State for initial loading
    const router = useRouter(); 

  
    useEffect(() => {
        // Token verification only in the client
        const userData = JSON.parse(Cookies.get("user_data") || "{}");
        const token = userData.auth_token;
        Cookies.set("AdminStatus", "User");
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
        )  
    }

    return(
        <div>
            {children}
        </div>
        
    )
}