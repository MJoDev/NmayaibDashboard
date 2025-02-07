import crypto from 'crypto';
 
 export const useEncryption = () => {
    const encryptData = async (username, authToken, secretKey) => {
      const encoder = new TextEncoder();
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        encoder.encode(secretKey),
        { name: 'AES-GCM' },
        false,
        ['encrypt']
      );
  
      // Crear los datos a cifrar
      const data = `${username}:${authToken}`;
      const encodedData = encoder.encode(data);
  
      // Generar un vector de inicialización (IV)
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
      // Cifrar los datos
      const encrypted = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        keyMaterial,
        encodedData
      );
  
      // Convertir el resultado a Base64 para poder pasarlo en la URL
      const encryptedArray = Array.from(new Uint8Array(encrypted));
      const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
      const ivBase64 = btoa(String.fromCharCode(...iv));
  
      return `${encryptedBase64}:${ivBase64}`;
    };
  
    return { encryptData };
  };