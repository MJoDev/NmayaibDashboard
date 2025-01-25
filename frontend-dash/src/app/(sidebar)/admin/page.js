"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; 
export default function Admin() {

    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get("auth_token");
        const adminToken = Cookies.get("adminAuthToken");
        // Si no hay token o el token es inválido, redirige a login
        if (!adminToken || !token || !(Cookies.get("AdminStatus") === "Admin")) {
            Cookies.set("AdminStatus", "Admin");
            router.push("/login");
        }
    }, [router]);


    return (
        <div className="grid place-items-center bottom-0 min-h-screen">
            <div className="flex flex-wrap gap-6">
                {/* Columna 1 */}
                <div className="grid gap-y-4">
                    <Button className="min-w-[250px]">
                        Add User
                    </Button>
                    <Button className="min-w-[250px]">
                        Change User Password
                    </Button>
                    <Button className="min-w-[250px]">
                        Download Data
                    </Button>
                </div>
                {/* Columna 2 */}
                <div className="grid gap-y-4">
                    <Button className="min-w-[250px]">
                        Load fixed income
                    </Button>
                    <Button className="min-w-[250px]">
                        Load Conviction
                    </Button>
                    <Button className="min-w-[250px]">
                        Load Outlook
                    </Button>
                </div>
            </div>
            {/* Botón adicional */}
            <Button className="mt-6 bg-[#C91414] hover:bg-[#d49595] text-white py-2 px-4 rounded">
                Launch API
            </Button>
        </div>

    )
}