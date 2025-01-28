"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; 
import Link from "next/link"
export default function Admin() {

    const router = useRouter();
    useEffect(() => {
        const userData = JSON.parse(Cookies.get("user_data") || "{}");
        const token = userData.auth_token;
        const adminToken = Cookies.get("adminAuthToken");
        // Si no hay token o el token es inválido, redirige a login
        if (!adminToken || !token || !(Cookies.get("AdminStatus") === "Admin")) {
            Cookies.set("AdminStatus", "Admin");
            router.push("/login");
        }
    }, [router]);

    // Cambia los valores del href como quieras.

    const Columnn1 = [
        { title: "Add User", href: "/" },
        { title: "Change User Password", href: "/" },
        { title: "Download Data", href: "/" },
    ]

    const Columnn2 = [
        { title: "Load Fixed Income", href: "/" },
        { title: "Load Conviction", href: "/" },
        { title: "Load Outlook", href: "/" },
    ]


    return (
        <div className="grid place-items-center bottom-0 min-h-screen">
            <div className="flex flex-wrap gap-6">
                {/* Columna 1 */}
                <div className="grid gap-y-4">
                    {Columnn1.map((button, index) => (
                        <Button key={index} className="min-w-[250px]">
                            <Link href={button.href} target="_blank">
                                {button.title}
                            </Link>
                        </Button>
                    ))}
                </div>
                {/* Columna 2 */}
                <div className="grid gap-y-4">
                    {Columnn2.map((button, index) => (
                        <Button key={index} className="min-w-[250px]">
                            <Link href={button.href} target="_blank">
                                {button.title}
                            </Link>
                        </Button>
                    ))}
                    
                </div>
            </div>
            {/* Botón adicional */}
            <Button className="mt-6 bg-[#C91414] hover:bg-[#d49595] text-white py-2 px-4 rounded">
                <Link href={"/api/launch"} target="_blank">
                    Launch API
                </Link>
                
            </Button>
        </div>

    )
}