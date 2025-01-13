"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

export function RegisterForm() {

  // Estado para manejar la imagen QR
  const [qrImage, setQrImage] = useState(null);  // Aquí guardamos la URL de la imagen QR
  const [loadingQr, setLoadingQr] = useState(false);  // Para manejar el estado de carga del QR
  const [errorQr, setErrorQr] = useState(null);  // Para manejar errores en la carga del QR
  const [creationSuccess, setCreationSuccess] = useState(false);  // Estado para indicar si la creación fue exitosa
  const [loading, setLoading] = useState(false);  // Para manejar el estado de carga del formulario

   // Definir el estado para las variables del formulario
   const [adminUsername, setAdminUsername] = useState('');
   const [adminPassword, setAdminPassword] = useState('');
   const [newUsername, setNewUsername] = useState('');
   const [newPassword, setNewPassword] = useState('');
   
   const [adminUsernameError, setAdminUsernameError] = useState('');
   const [adminPasswordError, setAdminPasswordError] = useState('');
   const [newUsernameError, setNewUsernameError] = useState('');
   const [newPasswordError, setNewPasswordError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      // Simula la creación del usuario en reqres.in
        try {
            const response = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newUsername,  // En reqres.in, los campos son name, job, etc.
                job: 'developer',
            }),
            });
    
            if (!response.ok) {
            throw new Error('Error al crear el usuario');
            }
    
            // Si la creación fue exitosa, cambiar el estado y proceder a obtener el QR
            setCreationSuccess(true);
            setLoading(false);
            
            // Ahora hacemos la petición para obtener la imagen QR
            fetchQrImage();
        } catch (err) {
            setLoading(false);
            console.error('Error durante la creación:', err);
        }
    }
  };

  const fetchQrImage = async () => {
    setLoadingQr(true);
    try {
      // Usamos un servicio de ejemplo para generar el QR, reemplaza con tu lógica de servidor real
      const response = await fetch('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HelloWorld');
      if (!response.ok) {
        throw new Error('Error al obtener la imagen QR');
      }
      
      const qrImageUrl = await response.url;  // Usamos la URL de la imagen generada
      setQrImage(qrImageUrl);  // Guardamos la URL de la imagen QR
      setLoadingQr(false);
    } catch (err) {
      setErrorQr('No se pudo cargar la imagen QR');
      setLoadingQr(false);
    }
  };



  return (
    <Card className="w-full m-12">
        <CardHeader>
            <CardTitle className="text-2xl text-black">Register</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mostrar la imagen QR solo si la creación es exitosa */}
            {creationSuccess && (
            <div className="flex justify-center">
                {loadingQr ? (
                <p>Loading QR Image...</p>
                ) : errorQr ? (
                <p className="text-red-500">{errorQr}</p>
                ) : qrImage ? (
                <img src={qrImage} alt="QR Code" className="w-32 h-32" />
                ) : (
                <p>No QR image available</p>
                )}
            </div>
            )}
            
            
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

