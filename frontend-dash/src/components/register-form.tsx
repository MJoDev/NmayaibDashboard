"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

export function RegisterForm() {

  // Estado para manejar la respuesta de la imagen QR
  const [qrImage, setQrImage] = useState(null);  // Aquí guardamos la URL o la imagen en sí
  const [loading, setLoading] = useState(true);  // Para manejar el estado de carga
  const [error, setError] = useState(null);  // Para manejar errores de la solicitud

   // Definir el estado para las variables del formulario
   const [adminUsername, setAdminUsername] = useState('');
   const [adminPassword, setAdminPassword] = useState('');
   const [newUsername, setNewUsername] = useState('');
   const [newPassword, setNewPassword] = useState('');
   
   const [adminUsernameError, setAdminUsernameError] = useState('');
   const [adminPasswordError, setAdminPasswordError] = useState('');
   const [newUsernameError, setNewUsernameError] = useState('');
   const [newPasswordError, setNewPasswordError] = useState('');

  // Esta función simula una petición al servidor para obtener la imagen QR
  useEffect(() => {
    // Simulamos que la imagen QR se genera luego de un evento o acción
    const fetchQrImage = async () => {
      try {
        setLoading(true);
        // Simulamos una petición para obtener la imagen (puedes reemplazar esto con tu endpoint real)
        const response = await fetch('/api/get-qr-image');  // Reemplazar con la URL real de tu API

        if (!response.ok) {
          throw new Error('Error al obtener la imagen QR');
        }

        const qrImageUrl = await response.text();  // Asumimos que el servidor responde con una URL de imagen
        setQrImage(qrImageUrl);  // Guardamos la URL de la imagen
        setLoading(false);
      } catch (err) {
        setError('QR no disponible.');
        setLoading(false);
      }
    };

    fetchQrImage();
  }, []);


 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple (puedes expandirla según lo necesites)
    let isValid = true;

    if (!adminUsername) {
      setAdminUsernameError('Admin Username is required');
      isValid = false;
    } else {
      setAdminUsernameError('');
    }

    if (!adminPassword) {
      setAdminPasswordError('Admin Password is required');
      isValid = false;
    } else {
      setAdminPasswordError('');
    }

    if (!newUsername) {
      setNewUsernameError('New Username is required');
      isValid = false;
    } else {
      setNewUsernameError('');
    }

    if (!newPassword) {
      setNewPasswordError('New Password is required');
      isValid = false;
    } else {
      setNewPasswordError('');
    }

    if (isValid) {
      // Aquí puedes agregar la lógica para enviar los datos
      console.log({
        adminUsername,
        adminPassword,
        newUsername,
        newPassword,
      });
    }
  };


  return (
    <Card className="w-full m-12">
        <CardHeader>
            <CardTitle className="text-2xl text-black">Register</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Espacio para la imagen QR */}
            
            <div className="flex justify-center">
                {loading ? (
                    <p>Loading QR Image...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : qrImage ? (
                    <img src={qrImage} alt="QR Code" className="w-32 h-32" />
                ) : (
                    <p>No QR image available</p>
                )}
            </div>
            
            
            <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {/* Columna Admin */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="admin-username">Admin Username</Label>
                        <Input
                        id="admin-username"
                        type="text"
                        placeholder="Admin Username"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        required
                        aria-describedby="email-error"
                        />
                        {adminUsernameError && <p id="email-error" className="text-red-500 text-sm">{adminUsernameError}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="admin-password">Admin Password</Label>
                        <Input
                        id="admin-password"
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="Password"
                        required
                        aria-describedby="password-error"
                        />
                        {adminPasswordError && <p id="password-error" className="text-red-500 text-sm">{adminPasswordError}</p>}
                    </div>
                </div>
                
                {/* Columna Nuevo Usuario */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-username">New Username</Label>
                        <Input
                        id="new-username"
                        type="text"
                        placeholder="New Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                        aria-describedby="email-error"
                        />
                        {newUsernameError && <p id="email-error" className="text-red-500 text-sm">{newUsernameError}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Password"
                        required
                        aria-describedby="password-error"
                        />
                        {newPasswordError && <p id="password-error" className="text-red-500 text-sm">{newPasswordError}</p>}
                    </div>
                </div>
            </div>
            </CardContent>
            <CardFooter className="px-4">
            <Button type="submit" className="mx-auto min-w-[250px]">
                REGISTER
            </Button>
            </CardFooter>
        </form>
    </Card>




  );
}

