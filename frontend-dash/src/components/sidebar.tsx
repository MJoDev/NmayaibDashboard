"use client"
import { Home, Database, Search, MessageSquare, LogOut, Shield, CirclePlus} from 'lucide-react'
import Link from "next/link"
import { cn } from "@/lib/utils"
import React from 'react'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string,
  isOpen: boolean
}

export function Sidebar({ className, isOpen }: SidebarProps) {

  const router = useRouter();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Database, label: "Data", href: "/data" },
    { icon: Search, label: "Find", href: "/search" },
    { icon: MessageSquare, label: "Chatbot", href: "/chat" },
    { icon: Shield, label: "Admin", href: "/admin" },
    { icon: CirclePlus, label: "Extras", href: "/extras" },
  ]

  const handleLogout = () => {
    // Elimina el token de las cookies
    Cookies.remove("auth_token");

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

