import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Extras() {

    const extraButtons = [
        { title: "Positions", href: "/extras/positions" },
        { title: "Maturities", href: "/extras/maturities" },
        { title: "YC Client", href: "/extras/yc-client" },
        { title: "YC Rep", href: "/extras/yc-rep" },
        { title: "YC Complete", href: "/extras/yc-complete" },
    ]

    return (
        <div className="grid place-items-center bottom-0 min-h-screen">
            <div className="flex flex-wrap gap-6">
                <div className="grid gap-y-4">
                    {/* Cambia el valor del href en las constantes */}
                    {extraButtons.map((button, index) => (
                        <Button key={index} className="min-w-[250px]">
                            <Link href={button.href} target="_blank">
                                {button.title}
                            </Link>
                        </Button>
                    ))}
                </div>
                
                
            </div>
            
        </div>
    )
}