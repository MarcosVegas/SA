// src/ProtectedApp.jsx
import React, { useState } from "react";

const ProtectedApp = ({ children }) => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    const storedKey = import.meta.env.VITE_API_KEY;
    if (apiKey === storedKey) {
      setAccessGranted(true);
    } else {
      alert("API Key incorrecta");
    }
  };

  if (!accessGranted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h1 className="text-xl font-semibold mb-4 text-center">Digita la clave maestra</h1>
          <img
            src="https://image.comunicaciones.sura.com/lib/fe3911727564047d771277/m/1/bbdcd229-7399-4ed7-b86f-04b83b2950fe.png"
            alt="Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <input
            type="password"
            placeholder="Ingresa la clave maestra"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:border-blue-400 px-4 py-2"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedApp;
