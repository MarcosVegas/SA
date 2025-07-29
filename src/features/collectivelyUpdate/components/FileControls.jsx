import React from "react";
import { IoIosAttach } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";

export function FileControls({ file, fileInputRef, handleFileChange, handleDownloadTemplate }) {
    return (
        <div className="flex flex-col mt-5">
            <div className="flex gap-3">
                <label
                    className="bg-blue-500 text-white px-4 py-2 rounded-[27px] cursor-pointer hover:bg-[#0033A0] text-center w-[391px] flex justify-center gap-5">
                    <IoIosAttach className="w-6 h-6 inline-block" />
                    Seleccionar Archivo
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
                {file && (
                    <p className="mt-2 text-gray-700 text-sm font-medium italic">
                        Archivo seleccionado: {file.name}
                    </p>
                )}
            </div>
            <button
                onClick={handleDownloadTemplate}
                className="bg-blue-500 text-white p-2 mt-5 rounded-[27px] h-[39px] w-[391px] cursor-pointer hover:bg-[#0033A0] flex gap-5 items-center justify-center">
                <MdOutlineFileDownload className="w-6 h-6 inline-block " />
                Descarga plantilla de base de datos
            </button>
        </div>
    );
}
