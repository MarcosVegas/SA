import { FaChevronDown } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { SexoAseguradoOptions, TipoIdAseguradoOptions, FormaDePagoOptions, AutorizaDebitoAutomaticoOptions, TipoDeCuentaOptions } from "../../../core/libs/SelectOptions";

export default function AseguradoSection({ aseguradoData, editable, loading, showInfo, toggleSection, handleAseguradoChange, handleUpload, setEditable }) {
    return (
        <div>
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("poliza")}
            >
                <h2 className="text-[16px] font-bold text-[#0033A0]">
                    Información del asegurado
                </h2>
                <FaChevronDown
                    className={`transition-transform text-[#0033A0] h-9 w-9 ${showInfo.poliza ? "rotate-180" : ""}`}
                />
            </div>
            {showInfo.poliza && (
                <>
                    <div className="relative bg-white p-6 shadow-lg border-1 border-blue-500 rounded-[24px] mt-4">
                        <div className="absolute top-4 right-4">
                            <button
                                className="bg-[#F8F8F8] p-3 rounded-[28px] flex items-center justify-center"
                                onClick={() => setEditable(!editable)}
                            >
                                <CiEdit className="text-[#888B8D] w-6 h-6" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-10">
                            {Object.entries(aseguradoData).map(
                                ([key, value]) =>
                                    key !== "InicioDeVigencia" &&
                                    key !== "FinDeVigencia" && (
                                        <div key={key} className="flex flex-col">
                                            <span className="font-bold text-[#0033A0] mb-1">
                                                {key === "NombreAseguradoCompleto"
                                                    ? "Nombres Asegurado" : key.replace(/([A-Z])/g, " $1")}:
                                            </span>
                                            {key === "NumeroIdAsegurado" ? (
                                                <input
                                                    type="text"
                                                    name={key}
                                                    value={value || ""}
                                                    disabled
                                                    className="border rounded-[20px] px-4 py-2 h-12 bg-gray-300 text-gray-600 cursor-not-allowed"
                                                />
                                            ) : key === "SexoAsegurado" ? (
                                                editable ? (
                                                    <select
                                                        value={value}
                                                        onChange={(e) => handleAseguradoChange(e, key)}
                                                        className="border rounded-[20px] px-4 py-2 h-12 transition-all duration-200 bg-white text-black"
                                                    >
                                                        {SexoAseguradoOptions.map(opt => (
                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="border rounded-[20px] px-4 py-2 h-12 bg-gray-300 text-gray-600 flex items-center">
                                                        {value}
                                                    </span>
                                                )
                                            ) : key === "TipoIdAsegurado" ? (
                                                editable ? (
                                                    <select
                                                        value={value}
                                                        onChange={(e) => handleAseguradoChange(e, key)}
                                                        className="border rounded-[20px] px-4 py-2 h-12 transition-all duration-200 bg-white text-black"
                                                    >
                                                        {TipoIdAseguradoOptions.map(opt => (
                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="border rounded-[20px] px-4 py-2 h-12 bg-gray-300 text-gray-600 flex items-center">
                                                        {value}
                                                    </span>
                                                )
                                            ) : key === "FormaDePago" ? (
                                                editable ? (
                                                    <select
                                                        value={value}
                                                        onChange={(e) => handleAseguradoChange(e, key)}
                                                        className="border rounded-[20px] px-4 py-2 h-12 transition-all duration-200 bg-white text-black"
                                                    >
                                                        {FormaDePagoOptions.map(opt => (
                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="border rounded-[20px] px-4 py-2 h-12 bg-gray-300 text-gray-600 flex items-center">
                                                        {value}
                                                    </span>
                                                )
                                            ) : key === "AutorizaDebitoAutomatico" ? (
                                                editable ? (
                                                    <select
                                                        value={value}
                                                        onChange={(e) => handleAseguradoChange(e, key)}
                                                        className="border rounded-[20px] px-4 py-2 h-12 transition-all duration-200 bg-white text-black"
                                                    >
                                                        {AutorizaDebitoAutomaticoOptions.map(opt => (
                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="border rounded-[20px] px-4 py-2 h-12 bg-gray-300 text-gray-600 flex items-center">
                                                        {value}
                                                    </span>
                                                )
                                            ) : key === "TipoDeCuenta" ? (
                                                editable ? (
                                                    <select
                                                        value={value}
                                                        onChange={(e) => handleAseguradoChange(e, key)}
                                                        className="border rounded-[20px] px-4 py-2 h-12 transition-all duration-200 bg-white text-black"
                                                    >
                                                        {TipoDeCuentaOptions.map(opt => (
                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="border rounded-[20px] px-4 py-2 h-12 bg-gray-300 text-gray-600 flex items-center">
                                                        {value}
                                                    </span>
                                                )
                                            ) : (
                                                <input
                                                    type="text"
                                                    name={key}
                                                    value={value || ""}
                                                    onChange={(e) => handleAseguradoChange(e, key)}
                                                    disabled={!editable}
                                                    className={`border rounded-[20px] px-4 py-2 h-12 transition-all duration-200 ${
                                                        editable ? "bg-white text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                    }`}
                                                />
                                            )}
                                        </div>
                                    )
                            )}
                        </div>
                        {editable && (
                            <div className="mt-5 flex justify-center">
                                <button
                                    onClick={handleUpload}
                                    className="bg-[#0033A0] text-white p-20 py-2 px-20 rounded-full"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div style={{ border: "4px solid #f3f3f3", borderTop: "4px solid #3498db", borderRadius: "50%", width: "24px", height: "24px", animation: "spin 2s linear infinite" }}></div>
                                    ) : (
                                        "Guardar"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
