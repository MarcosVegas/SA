import { FaChevronDown } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import SelectOptions from "../../../core/libs/SelectOptions";

export default function PagoAsesorSection({ pagoAsesorData, mascotasData, showInfo, toggleSection, selectedPagoAsesorIndex, setSelectedPagoAsesorIndex, guardarPagoAsesorEditado, handlePagoAsesorChange }) {
    return (
        <div className={'mt-5'}>
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("pagoAsesor")}
                    >
                        <h2 className="text-[16px] font-bold text-[#0033A0]">
                            Información del plan
                        </h2>
                        <FaChevronDown
                            className={`transition-transform text-[#0033A0] h-9 w-9 ${showInfo.pagoAsesor ? "rotate-180" : ""}`}
                        />
                    </div>
                    {showInfo.pagoAsesor && (
                        <>
                            <div className="flex gap-5 py-5 mt-4 overflow-x-auto max-w-full">
                                {pagoAsesorData.map((pagoAsesor, index) => (
                                    <div
                                        key={index}
                                        className={`pt-5 border ${selectedPagoAsesorIndex === index ? "border-blue-500 shadow-lg" : "border-gray-300"
                                            } rounded-[24px] p-4 min-w-[600px]`}
                                    >
                                        <div className="flex justify-center items-center mb-4 gap-5">
                                            <h3 className="text-lg font-bold text-[#0033A0]">
                                                Pago | Mascota: {mascotasData[index]?.NombreMascota || ""}
                                            </h3>
                                            <button
                                                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                                                onClick={() => setSelectedPagoAsesorIndex(index)}
                                            >
                                                <CiEdit className="text-[#0033A0] w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 items-center mb-5 px-5">
                                            <span className="font-bold text-[#0033A0] text-start pr-4">
                                                Id Mascota:
                                            </span>
                                            <input
                                                type="text"
                                                value={mascotasData[index]?.IdMascota || ""}
                                                readOnly
                                                disabled
                                                className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-200 text-gray-700 w-full max-w-md h-12"
                                            />
                                        </div>
                                        {Object.entries(pagoAsesor).map(([key, value]) => {
                                            const fieldKey = `${index}-${key}`;
                                            return (
                                                <div key={fieldKey} className="grid grid-cols-2 items-center mb-5 px-5">
                                                    <span className="font-bold text-[#0033A0] text-start pr-4">
                                                        {key === "IncluyeRc" ? "RC" : key.replace(/([A-Z])/g, " $1")}:
                                                    </span>
                                                    {key === "IncluyeRc" ? (
                                                        selectedPagoAsesorIndex === index ? (
                                                            <select
                                                                value={value === true ? "True" : value === false ? "False" : value}
                                                                onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                                className="border p-2 rounded-[20px] px-6 ml-3 bg-white text-black w-full max-w-md h-12"
                                                            >
                                                                {SelectOptions.IncluyeRc.map(opt => (
                                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                {value === true || value === "True" ? "Si" : "No"}
                                                            </span>
                                                        )
                                                    ) : key === "MotivoCancelacion" ? (
                                                        selectedPagoAsesorIndex === index ? (
                                                            <select
                                                                value={value}
                                                                onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                                className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                    selectedPagoAsesorIndex === index
                                                                        ? "bg-white text-black"
                                                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                } w-full max-w-md h-12`}
                                                            >
                                                                {SelectOptions.MotivoCancelacion.map(opt => (
                                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-200 text-gray-700 w-full max-w-md h-12 flex items-center">
                                                                {value}
                                                            </span>
                                                        )
                                                        ): key === "Estado" || key === "Plan" ? (
                                                            selectedPagoAsesorIndex === index ? (
                                                                <select
                                                                    value={value}
                                                                    onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                                    className="border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 bg-white text-black w-full max-w-md h-12"
                                                                >
                                                                    {(key === "Estado" ? SelectOptions.Estado : SelectOptions.Plan).map(opt => (
                                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                    ))}
                                                                </select>
                                                            ) : (
                                                                <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                    {value || "No disponible"}
                                                                </span>
                                                            )

                                                        ) : key === "Producto" ? (
                                                            selectedPagoAsesorIndex === index ? (
                                                                <select
                                                                    value={value}
                                                                    onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                                    className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 bg-white text-black w-full max-w-md h-12`}
                                                            >
                                                                {SelectOptions.Producto.map(opt => (
                                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                {pagoAsesorData[index]?.Producto || "SaludPerros"}
                                                            </span>
                                                        )
                                                    ) : key === "Rc" ? (
                                                        selectedPagoAsesorIndex === index ? (
                                                            <select
                                                                value={value}
                                                                onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                                disabled={selectedPagoAsesorIndex !== index}
                                                                className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                    selectedPagoAsesorIndex === index
                                                                        ? "bg-white text-black"
                                                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                } w-full max-w-md h-12`}
                                                            >
                                                                {SelectOptions.Rc.map(opt => (
                                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                {pagoAsesorData[index]?.Rc || ""}
                                                            </span>
                                                        )
                                                    ) : key === "SaldoGastosVeterinario" ? (
                                                        selectedPagoAsesorIndex === index ? (
                                                            <input
                                                                type="text"
                                                                value={new Intl.NumberFormat("es-ES").format(value || 0)}
                                                                onChange={(e) => {
                                                                    const rawValue = e.target.value.replace(/\./g, "");
                                                                    handlePagoAsesorChange({ target: { value: rawValue } }, index, key);
                                                                }}
                                                                className="border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 bg-white text-black w-full max-w-md h-12"
                                                            />
                                                        ) : (
                                                            <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                {new Intl.NumberFormat("es-ES").format(value || 0)}
                                                            </span>
                                                        )
                                                    ) : key === "BolsaAseguradaServiciosVeterinarios" || key === "SaldoGastosVeterinario" || key === "BolsaAseguradaRc" || key === "SaldoRc" || key === "ValorDePrimaMensualSinIva" || key === "ValorDePrimaAnualSinIva" || key === "ValorDePrimaMensualConIva" || key === "ValorDePrimaAnualConIva" ? (
                                                        selectedPagoAsesorIndex === index ? (
                                                            <input
                                                                type="text"
                                                                value={new Intl.NumberFormat("es-ES").format(value || 0)} 
                                                                onChange={(e) => {
                                                                    const rawValue = e.target.value.replace(/\./g, ""); 
                                                                    handlePagoAsesorChange({ target: { value: rawValue } }, index, key);
                                                                }}
                                                                className="border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 bg-white text-black w-full max-w-md h-12"
                                                            />
                                                        ) : (
                                                            <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                {new Intl.NumberFormat("es-ES").format(value || 0)} 
                                                            </span>
                                                    )
                                                 ) : key === "Fecha de cancelación" ? (
                                                    <input
                                                    type="date"
                                                    value={value ? value.slice(0, 10) : ""}
                                                    onChange={(e) => {
                                                        const dateValue = e.target.value ? e.target.value : "";
                                                        handlePagoAsesorChange({ target: { value: dateValue } }, index, key);
                                                    }}
                                                    disabled={selectedPagoAsesorIndex !== index}
                                                    className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                        selectedPagoAsesorIndex === index
                                                            ? "bg-white text-black"
                                                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                    } w-full max-w-md h-12`}
                                                />
                                                ) : key === "FechaExpedicionPoliza" ? (
                                                    <input
                                                        type="date"
                                                        value={value ? value.slice(0, 10) : ""}
                                                        onChange={(e) => {
                                                            const dateValue = e.target.value ? e.target.value : "";
                                                            handlePagoAsesorChange({ target: { value: dateValue } }, index, key);
                                                        }}
                                                        disabled={selectedPagoAsesorIndex !== index}
                                                        className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                            selectedPagoAsesorIndex === index
                                                                ? "bg-white text-black"
                                                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                        } w-full max-w-md h-12`}
                                                    />
                                                ) : key === "FechaUltimoRecibo" ? (
                                                    <input
                                                        type="date"
                                                        value={value ? value.slice(0, 10) : ""}
                                                        onChange={(e) => {
                                                            const dateValue = e.target.value ? e.target.value : "";
                                                            handlePagoAsesorChange({ target: { value: dateValue } }, index, key);
                                                        }}
                                                        disabled={selectedPagoAsesorIndex !== index}
                                                        className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                            selectedPagoAsesorIndex === index
                                                                ? "bg-white text-black"
                                                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                        } w-full max-w-md h-12`}
                                                    />
                                                ) : key === "InicioDeVigencia" || key === "FinDeVigencia" || key === "Fecha de cancelación" || key === "FechaExpedicionPoliza" || key === "FechaUltimoRecibo" ? (
                                                       <input
                                                            type="date"
                                                            value={
                                                                value
                                                                    ? (() => {
                                                                        try {
                                                                            const date = new Date(value);
                                                                            if (!isNaN(date.getTime())) {
                                                                                const year = date.getUTCFullYear();
                                                                                const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
                                                                                const day = date.getUTCDate().toString().padStart(2, "0");
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
                                                                const dateValue = e.target.value ? `${e.target.value}T00:00:00Z` : "";
                                                                handlePagoAsesorChange({ target: { value: dateValue } }, index, key);
                                                            }}
                                                            disabled={selectedPagoAsesorIndex !== index}
                                                            className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                                selectedPagoAsesorIndex === index
                                                                    ? "bg-white text-black"
                                                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            } w-full max-w-md h-12`}
                                                        />
                                                    ) : key === "FinDeVigencia" ? (
                                                        <input
                                                            type="datetime-local"
                                                            value={
                                                                value
                                                                    ? new Date(value).toISOString().slice(0, 16)
                                                                    : ""
                                                            }
                                                            onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                            disabled={selectedPagoAsesorIndex !== index}
                                                            className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                                selectedPagoAsesorIndex === index
                                                                    ? "bg-white text-black"
                                                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            } w-full max-w-md h-12`}
                                                        />
                                                    ) : key === "Fecha de cancelación" ? (
                                                        <input
                                                            type="datetime-local"
                                                            value={
                                                                value
                                                                    ? new Date(value).toISOString().slice(0, 16)
                                                                    : ""
                                                            }
                                                            onChange={(e) => {
                                                                const newValue = e.target.value;
                                                                const formattedValue = `${newValue}:00Z`; 
                                                                handlePagoAsesorChange({ target: { value: formattedValue } }, index, key);
                                                            }}
                                                            disabled={selectedPagoAsesorIndex !== index}
                                                            className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                                selectedPagoAsesorIndex === index
                                                                    ? "bg-white text-black"
                                                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            } w-full max-w-md h-12`}
                                                        />
                                                    ) : key === "BolsaAseguradaServiciosVeterinarios" ? (
                                                        selectedPagoAsesorIndex === index ? (
                                                            <input
                                                                type="text"
                                                                value={new Intl.NumberFormat("es-ES").format(value || 0)} 
                                                                onChange={(e) => {
                                                                    const rawValue = e.target.value.replace(/\./g, ""); 
                                                                    handlePagoAsesorChange({ target: { value: rawValue } }, index, key);
                                                                }}
                                                                className="border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 bg-white text-black w-full max-w-md h-12"
                                                            />
                                                        ) : (
                                                            <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                {new Intl.NumberFormat("es-ES").format(value || 0)}
                                                            </span>
                                                        )
                                                    
                                                    ) : key === "FechaExpedicionPoliza" ? (
                                                        <input
                                                            type="datetime-local"
                                                            value={
                                                                value
                                                                    ? (() => {
                                                                        try {
                                                                            const date = new Date(value);
                                                                            if (!isNaN(date.getTime())) {
                                                                                const year = date.getFullYear();
                                                                                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                                                                                const day = date.getDate().toString().padStart(2, "0");
                                                                                const hours = date.getHours().toString().padStart(2, "0");
                                                                                const minutes = date.getMinutes().toString().padStart(2, "0");
                                                                                return `${year}-${month}-${day}T${hours}:${minutes}`;
                                                                            }
                                                                            return "";
                                                                        } catch (error) {
                                                                            console.error("Error al formatear InicioDeVigencia:", error);
                                                                            return "";
                                                                        }
                                                                    })()
                                                                    : ""
                                                            }
                                                            onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                            disabled={selectedPagoAsesorIndex !== index}
                                                            className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                                selectedPagoAsesorIndex === index
                                                                    ? "bg-white text-black"
                                                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            } w-full max-w-md h-12`}
                                                        />
                                                        
                                                        ) : key === "FechaUltimoRecibo" ? (
                                                            <input
                                                            type="datetime-local"
                                                            value={
                                                                value
                                                                    ? new Date(value).toISOString().slice(0, 16)
                                                                    : ""
                                                            }
                                                            onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                            disabled={selectedPagoAsesorIndex !== index}
                                                            className={`border p-1 rounded-[20px] px-5 ml-3 transition-all duration-200 ${
                                                                selectedPagoAsesorIndex === index
                                                                    ? "bg-white text-black"
                                                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            } w-full max-w-md h-12`}
                                                        />
                                                        
                                                            ) :(
                                                        <input
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) => handlePagoAsesorChange(e, index, key)}
                                                            disabled={selectedPagoAsesorIndex !== index}
                                                            className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${selectedPagoAsesorIndex === index
                                                                ? "bg-white text-black"
                                                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                } w-full max-w-md h-12 `}
                                                        />
                                                    )}

                                                </div>
                                            );
                                        })}
                                        {selectedPagoAsesorIndex === index && (
                                            <div className="flex justify-center mt-4">
                                                <button
                                                    onClick={() => guardarPagoAsesorEditado(index)}
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
