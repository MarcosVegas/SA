import React from "react";

export function UploadButton({ handleUpload, loading }) {
    return (
        <button
            onClick={handleUpload}
            className="bg-blue-500 text-white p-2 mt-5 rounded-[27px] h-[39px] w-[391px] cursor-pointer hover:bg-[#0033A0] flex items-center justify-center"
            disabled={loading}
        >
            {loading ? (
                <div
                    className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"
                    role="status"
                ></div>
            ) : (
                "Enviar a base de datos"
            )}
        </button>
    );
}
