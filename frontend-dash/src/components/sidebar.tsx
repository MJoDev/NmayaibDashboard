import { Home, Database, Search, MessageSquare, LogOut } from 'lucide-react'
import Link from "next/link"
import { cn } from "@/lib/utils"
import React from 'react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Inicio", href: "/" },
    { icon: Database, label: "Data", href: "/data" },
    { icon: Search, label: "Busqueda", href: "/search" },
    { icon: MessageSquare, label: "Chatbot", href: "/chat" },
  ]

  return (
    <div className={cn("flex h-screen w-[200px] flex-col bg-[#14213D] p-4", className)}>
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
      <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/10">
        <LogOut className="h-5 w-5" />
        Log Out
      </button>
    </div>
  )
}

