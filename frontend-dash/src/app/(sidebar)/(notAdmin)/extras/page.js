import { Button } from "@/components/ui/button"
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import crypto from 'crypto';
import { useEncryption } from "@/lib/encrypt";
import Cookies from "js-cookie";


export default function Extras() {

    const [encryptedData, setEncryptedData] = useState('');
    const { encryptData } = useEncryption();

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
    

    const extraButtons = [
        { title: "Positions", href: `https://positions.portal.com?data={${encryptedData}`  },
        { title: "Maturities", href: `https://maturities.portal.com?data={${encryptedData}`  },
        { title: "YC Client", href: `https://ycclient.portal.com?data={${encryptedData}`  },
        { title: "YC Rep", href: `https://ycrep.portal.com?data={${encryptedData}`  },
        { title: "YC Complete", href: `https://yc.portal.com?data={${encryptedData}`  },
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