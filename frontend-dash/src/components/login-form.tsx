"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie"; // Para manejar las cookies

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); // Campo adicional para token
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [tokenError, setTokenError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      // Petición a tu API
      const response = await fetch("http://10.20.1.61:8510/api/v1/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          username,
          password,
          token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      const adminStatus = "Admin";
      const { "usuario token": usuarioToken } = data; // Ajustar según el formato de tu API
      Cookies.set("adminAuthToken", usuarioToken, { expires: 0.04 });
      Cookies.set("AdminStatus", adminStatus, { expires: 0.04  }); // Establece la cookie


      // Guardar los datos del usuario en las cookies
      const userData = {
        auth_token: usuarioToken,
        token,
        username,
        password,
      };
      Cookies.set("user_data", JSON.stringify(userData), { expires: 0.04  });

      // Redirección después del login exitoso
      if (Cookies.get("AdminStatus") === "Admin") {
        //window.location.href = "/admin";  SE TIENE QUE HABULITAR SI SE DESEA QUE SE ENTRE ACA DIRECTO
        window.location.href = "/";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessage(error.message || "Invalid username, password, or token.");
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
              {usernameError && (
                <p id="username-error" className="text-red-500 text-sm">
                  {usernameError}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-describedby="password-error"
              />
              {passwordError && (
                <p id="password-error" className="text-red-500 text-sm">
                  {passwordError}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="token">Token</Label>
              <Input
                id="token"
                type="text"
                placeholder="Enter your token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                aria-describedby="token-error"
              />
              {tokenError && (
                <p id="token-error" className="text-red-500 text-sm">
                  {tokenError}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              SIGN IN
            </Button>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </CardFooter>
        </form>
      </Card>
      <a href="/register" className="text-blue-500 justify-end flex underline">
        Register here!
      </a>
    </div>
  );
}
