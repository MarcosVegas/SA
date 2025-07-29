import { FaChevronDown } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { SexoOptions, EdadOptions, EdadDeIngresoMascotaOptions } from "../../../core/libs/SelectOptions";

export default function MascotasSection({ mascotasData, pagoAsesorData, showInfo, toggleSection, selectedMascotaIndex, setSelectedMascotaIndex, handleMascotaChange, guardarMascotaEditada, razasPerros, razasGatos }) {
    return (
        <div className={'mt-5'}>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("mascotas")}>
                <h2 className="text-[16px] font-bold text-[#0033A0]">
                    Información de la(s) mascota(s)
                </h2>
                <FaChevronDown
                    className={`transition-transform text-[#0033A0] h-9 w-9 ${showInfo.mascotas ? "rotate-180" : ""}`}
                />
            </div>
        
            {showInfo.mascotas && (
                <>
                    <div className="flex gap-5 py-5 mt-4 overflow-x-auto max-w-full">
                        {mascotasData.map((mascota, index) => (
                            <div
                                key={index}
                                className={`pt-5 border ${selectedMascotaIndex === index ? "border-blue-500 shadow-lg" : "border-gray-300"
                                    } rounded-[24px] p-4 min-w-[600px]`}
                            >
                                <div className="flex justify-center items-center mb-8 gap-5">
                                    <h3 className="text-lg font-bold text-[#0033A0]">
                                        Mascota {index + 1}: {mascota.NombreMascota}
                                    </h3>
                                    <button
                                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                                        onClick={() => {
                                            const producto = (pagoAsesorData[index]?.Producto || "").toLowerCase();
                                            if (producto === "salud para perros" || producto === "salud para gatos") {
                                                setSelectedMascotaIndex(index); 
                                            } else {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Producto no válido",
                                                    text: "El producto debe ser 'Salud para perros' o 'Salud para gatos' para editar.",
                                                });
                                            }
                                        }}
                                    >
                                        <CiEdit className="text-[#0033A0] w-5 h-5" />
                                    </button>
                                </div>
                                                {Object.entries(mascota).map(([key, value]) => {
                                                    const fieldKey = `${index}-${key}`;
                                                    return (
                                                        <div key={fieldKey} className="grid grid-cols-2 items-center mb-5 px-5">
                                                            <span className="font-bold text-[#0033A0] text-start pr-3">
                                                                {key.replace(/([A-Z])/g, " $1")}:
                                                            </span>
                                                            {key === "Sexo" ? (
                                                                selectedMascotaIndex === index ? (
                                                                    <select
                                                                        value={value}
                                                                        onChange={(e) => handleMascotaChange(e, index, key)}
                                                                        disabled={selectedMascotaIndex !== index}
                                                                        className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                            selectedMascotaIndex === index
                                                                                ? "bg-white text-black"
                                                                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                        } w-full max-w-md h-12`}
                                                                    >
                                                                        {SexoOptions.map(opt => (
                                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                        ))}
                                                                    </select>
                                                                ) : (
                                                                    <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                        {mascotasData[index]?.Sexo}
                                                                    </span>
                                                                )
                                                            ) : key === "IdMascota" ? (
                                                                <input
                                                                    type="text"
                                                                    name={key}
                                                                    value={value || ""}
                                                                    disabled
                                                                    className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center"
                                                                />
                                                        ) : key === "NumeroPoliza" ? (
                                                            <input
                                                                type="text"
                                                                name={key}
                                                                value={value || ""}
                                                                disabled
                                                                className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center"
                                                            />
                                                    ) : key === "Edad" ? (
                                                                selectedMascotaIndex === index ? (
                                                                    <select
                                                                        value={value || ""}
                                                                        onChange={(e) => handleMascotaChange(e, index, key)}
                                                                        disabled={selectedMascotaIndex !== index}
                                                                        className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${selectedMascotaIndex === index
                                                                            ? "bg-white text-black"
                                                                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                            } w-full max-w-md h-12 `}
                                                                    >
                                                                        {EdadOptions.map(opt => (
                                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                        ))}
                                                                    </select>
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        value={value || ""}
                                                                        readOnly
                                                                        disabled
                                                                        className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12"
                                                                    />
                                                                )
                                                            ) : key === "EdadDeIngresoMascota" ? (
                                                                selectedMascotaIndex === index ? (
                                                                <select
                                                                    value={value}
                                                                    onChange={(e) => handleMascotaChange(e, index, key)}
                                                                    disabled={selectedMascotaIndex !== index} 
                                                                    className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                        selectedMascotaIndex === index
                                                                            ? "bg-white text-black"
                                                                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                    } w-full max-w-md h-12`}
                                                                >
                                                                   {EdadDeIngresoMascotaOptions.map(opt => (
                                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                   ))}
                                                                </select>
                                                            
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        value={value || ""}
                                                                        readOnly
                                                                        disabled
                                                                        className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12"
                                                                    />
                                                                )
                                                            ) :key === "Raza" ? (
                                                                selectedMascotaIndex === index ? (
                                                                    <select
                                                                        value={mascotasData[index]?.Raza || ""}
                                                                        onChange={(e) => handleMascotaChange(e, index, key)}
                                                                        className="border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 bg-white text-black w-full max-w-md h-12"
                                                                    >
                                                                        {pagoAsesorData[index]?.Producto.toLowerCase() === "salud para perros"
                                                                            ? razasPerros.map((raza) => (
                                                                                <option key={raza} value={raza}>
                                                                                    {raza}
                                                                                </option>
                                                                            ))
                                                                            : razasGatos.map((raza) => (
                                                                                <option key={raza} value={raza}>
                                                                                    {raza}
                                                                                </option>
                                                                            ))}
                                                                    </select>
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        value={mascotasData[index]?.Raza || ""}
                                                                        readOnly
                                                                        className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 cursor-not-allowed w-full max-w-md h-12"
                                                                    />
                                                                )
                                                            ) : key === "FechaNacimiento" ? (
                                                                <input
                                                                    type="date"
                                                                    value={
                                                                        value
                                                                            ? (() => {
                                                                                try {
                                                                                    const date = new Date(value);
                                                                                    if (!isNaN(date.getTime())) {
                                                                                        const year = date.getFullYear();
                                                                                        const month = (date.getMonth() + 1).toString().padStart(2, "0");
                                                                                        const day = date.getDate().toString().padStart(2, "0");
                                                                                        return `${year}-${month}-${day}`;
                                                                                    }
                                                                                    return "";
                                                                                } catch {
                                                                                    return "";
                                                                                }
                                                                            })()
                                                                            : ""
                                                                    }
                                                                    onChange={(e) => {
                                                                        const dateValue = e.target.value ? `${e.target.value}T00:00:00` : "";
                                                                        handleMascotaChange({ target: { value: dateValue } }, index, key);
                                                                    }}
                                                                    max={new Date().toISOString().slice(0, 10)}
                                                                    disabled={selectedMascotaIndex !== index}
                                                                    className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                        selectedMascotaIndex === index
                                                                            ? "bg-white text-black"
                                                                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                    } w-full max-w-md h-12`}
                                                                />
                                                            ) : key !== "FechaNacimiento" ? (
                                                                <input
                                                                    type="text"
                                                                    value={value}
                                                                    onChange={(e) => handleMascotaChange(e, index, key)}
                                                                    disabled={selectedMascotaIndex !== index}
                                                                    className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${selectedMascotaIndex === index
                                                                        ? "bg-white text-black"
                                                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                        } w-full max-w-md h-12 `}
        
                                                                />
                                                            ) : null}
                                                        </div>
        
                                                    );
                                                })}
                                                {selectedMascotaIndex === index && (
                                                    <div className="flex justify-center mt-4">
                                                        <button
                                                            onClick={() => guardarMascotaEditada(index)}
                                                            className="bg-[#0033A0] text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
                                                        >
                                                            Guardar
                                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
