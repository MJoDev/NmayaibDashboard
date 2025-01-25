"use client"
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie"; // Para manejar las cookies

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para manejar el mensaje de error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple del username (puedes agregar más validaciones si lo deseas)
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
      return;
    } else {
      setUsernameError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      // Peticion a reqres.in A cambiar. Lo envio como email ya que su API recibe es un email.
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${username}`,  // Usamos un correo ficticio con el username
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
      const { token } = data;
      if(Cookies.get("AdminStatus") === "Admin") {
        Cookies.set("adminAuthToken", token, {expires: 1})
        window.location.href = "/admin"; 
      }else{
        // Si el login es exitoso, guarda el token en las cookies
        Cookies.set("auth_token", token, { expires: 7 }); // Token guardado en las cookies por 7 días

        // Redirige a la página principal o a la página protegida
        window.location.href = "/"; // Cambia la URL de acuerdo a tu estructura de rutas
      }
      

    } catch (error: any) {
      // Si hay un error, muestra el mensaje de error
      setErrorMessage(error.message || "Invalid username or password.");
    }
  };

  return (
    <div>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl text-black">Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-describedby="username-error"
            />
            {usernameError && <p id="username-error" className="text-red-500 text-sm">{usernameError}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              aria-describedby="password-error"
            />
            {passwordError && <p id="password-error" className="text-red-500 text-sm">{passwordError}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            SIGN IN
          </Button>
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </CardFooter>
        
      </form>
      
    </Card>
    <a href="/register" className="text-blue-500 justify-end flex underline">Register here!</a>
    </div>
  );
}
