"use client"
import { Home, Database, Search, MessageSquare, LogOut, Shield, CirclePlus} from 'lucide-react'
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import crypto from 'crypto';
import { useEncryption } from "@/lib/encrypt";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string,
  isOpen: boolean
}



export function Sidebar({ className, isOpen }: SidebarProps) {

  const [encryptedData, setEncryptedData] = useState('');
  const { encryptData } = useEncryption();
  const router = useRouter();

  

  useEffect(() => { 
    const userData = JSON.parse(Cookies.get("user_data") || "{}");
    const token = userData.auth_token;
    const username = userData.username;
    const secretKey = crypto.randomBytes(32).toString('base64');
    const handleEncrypt = async () => {
      try{
        const result = await encryptData(username, token, secretKey);
        setEncryptedData(result);
      }catch{
        console.log("Error Encrypting data");
      }
      
    }
    handleEncrypt();
  }, []);



  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Database, label: "Data", href: `https://alertas.portal.com?data=${encryptedData}` },
    { icon: Search, label: "Find", href: `https://alertas.portal.com?data=${encryptedData}`},
    { icon: MessageSquare, label: "Chatbot", href: `https://chatbot.portal.com?data=${encryptedData}` },
    { icon: Shield, label: "Admin", href: "/admin" },
    { icon: CirclePlus, label: "Extras", href: "/extras" },
  ]

  const handleLogout = () => {
    // Elimina el token de las cookies
    Cookies.remove("auth_token");
    Cookies.remove("adminAuthToken");
    Cookies.remove("AdminStatus");
    // Redirige al usuario a la página de login
    router.push("/login"); 
  };

  return (
    <div
      className={`flex h-[97vh] flex-col bg-[#14213D] p-4 transition-transform duration-300 ease-in-out 
        ${isOpen ? 'w-[200px] translate-x-0' : 'w-0 translate-x-[-100%]'} `}
      style={{
        paddingLeft: 'clamp(1rem, 5vw, 2rem)',
        paddingRight: 'clamp(1rem, 5vw, 2rem)',
        borderRadius: '1rem',
      }}
    >
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/10"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/10"
      >
        <LogOut className="h-5 w-5" />
        Log Out
      </button>
    </div>
  );

}

