import {useNavigate} from "react-router-dom";
import {CiLogout} from "react-icons/ci";
import {useState} from "react";
import {requestSearchColectiva} from "../core/services/requestSearchColectiva.js";
import {requestSearch} from "../core/services/requestSearch.js";
import Table from "../features/edicion/components/Table.jsx";
import { IoIosSearch } from "react-icons/io";
import Swal from 'sweetalert2';

export function SearchPage() {
    const [tipoBusquedaState, setTipoBusquedaState] = useState("individual");

    const handleTipoBusquedaChange = (tipo) => {
        setTipoBusquedaState(tipo);
    };

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({});
    const [searchData, setSearchData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleMenuPage = () => {
        navigate("/");
    };


    const handleInputChange = (option, value) => {
        setFormValues((prev) => ({...prev, [option]: value}));
    };


    const handleRequestSearch = async () => {
        setSearchData(null);
        setError(null);
    
        const searchDataIndividual = {
            numeroAsegurado: formValues.cedula || formValues.nit || "",
            idMascota: formValues.idMascota || "",
            numeroPoliza: formValues.numeroPoliza || ""
        };
    
        const searchDataColectiva = {
            nombreEmpresa: formValues.nombreEmpresa || "",
            cedula: formValues.cedula || ""
        };
    
        setLoading(true);
    
        try {
            let response;
            if (tipoBusquedaState === "individual") {
                response = await requestSearch(searchDataIndividual);
            } else {
                response = await requestSearchColectiva(searchDataColectiva);
            }
            setSearchData(response);
        } catch (e) {
            setError("No existen datos con esos valores");
            setSearchData(null);
    
            Swal.fire({
                icon: 'error',
                title: 'No existen datos con esos valores',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                setFormValues({
                    cedula: "",
                    nit: "",
                    idMascota: "",
                    numeroPoliza: "",
                    nombreEmpresa: ""
                });
            });
        } finally {
            setFormValues({
                cedula: "",
                nit: "",
                idMascota: "",
                numeroPoliza: "",
                nombreEmpresa: ""
            }); // Limpia los campos de consulta
            setLoading(false);
        }
    };
    
    return (
        <div className="relative ">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-blur bg-opacity-50 z-10">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className={` rounded-md p-10 mx-20  relative ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                <button
                    onClick={handleMenuPage}
                    className="absolute flex top-3 right-1 gap-2 p-2 text-gray-600 hover:text-red-500 cursor-pointer"
                >
                    <CiLogout className="w-5 h-5"/> Salir
                </button>

                <h2 className="flex-1 font-bold text-[22px] text-[#0D0D0D]">Consulta y edición de datos</h2>

                <p className="text-[16px]  mt-5">A continuación, seleccione la opción deseada</p>

                <div className="flex mt-5 rounded-md gap-5">
                    <button
                        className={` p-2 font-bold rounded-[27px] w-[250px] cursor-pointer ${
                            tipoBusquedaState === "individual"
                                ? "bg-[#2D6DF6] border-2 border-white text-white"
                                : "bg-white text-[#0033A0] border"
                        }`}
                        onClick={() => handleTipoBusquedaChange("individual")}
                        disabled={tipoBusquedaState === "individual"}
                    >
                        Consulta Individual
                    </button>
                    <button
                        className={` p-2 font-bold rounded-[27px] w-[250px] cursor-pointer ${
                            tipoBusquedaState === "colectiva"
                                ? "bg-[#2D6DF6] border-2 border-white text-white"
                                : "bg-white text-[#0033A0] border"
                        }`}
                        onClick={() => handleTipoBusquedaChange("colectiva")}
                        disabled={tipoBusquedaState === "colectiva"}
                    >
                        Consulta Colectiva
                    </button>
                </div>

                <div className="mt-5 py-10 px-10 border-1 border-[#81B1FF] rounded-[23px] w-[681px] h-[490px]">

                    <p className="text-[16px] text-[#2D6DF6] font-bold">Ingrese un dato para iniciar la búsqueda</p>

                    <div className="flex flex-col space-y-5 mt-5">
                        {tipoBusquedaState === "individual" ? (
                            <>
                                <div className="flex flex-col">
                                    <label className="text-[#2D6DF6]">Cédula</label>
                                    <input
                                        type="text"
                                        className=" p-2 px-3 text-[#B4B4B5] h-[44px] border-1 border-[#0033A0] rounded-md"
                                        placeholder="EJ: 1092768965"
                                        value={formValues.cedula || ""}
                                        onChange={(e) => handleInputChange("cedula", e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[#2D6DF6]">Id de la mascota</label>
                                    <input
                                        type="text"
                                        className="p-1 px-3 text-[#B4B4B5] h-[44px] border-1 border-[#0033A0] rounded-md"
                                        placeholder="EJ: ACPU5678JIL"
                                        value={formValues.idMascota || ""}
                                        onChange={(e) => handleInputChange("idMascota", e.target.value)}
                                        disabled={loading}
                                        style={{ appearance: "none", MozAppearance: "textfield" }} // Deshabilita las flechas
                                    />
                                </div>

                                <div className={"flex flex-col"}>
                                    <label className="text-[#2D6DF6]">Número de póliza</label>
                                    <input
                                        type="number"
                                        className="p-1 px-3 text-[#B4B4B5] h-[44px] border-1 border-[#0033A0] rounded-md"
                                        placeholder="EJ: 12345C678"
                                        value={formValues.numeroPoliza || ""}
                                        onChange={(e) => handleInputChange("numeroPoliza", e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col">
                                    <label className="text-[#2D6DF6]">Nombre de empresa</label>
                                    <input
                                        type="text"
                                        className=" p-2 px-3 text-[#B4B4B5] h-[44px] border-1 border-[#0033A0] rounded-md"
                                        placeholder="Ingrese el nombre de la empresa"
                                        value={formValues.nombreEmpresa || ""}
                                        onChange={(e) => handleInputChange("nombreEmpresa", e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-[#2D6DF6]">Cédula</label>
                                    <input
                                        type="text"
                                        className=" p-2 px-3 text-[#B4B4B5] h-[44px] border-1 border-[#0033A0] rounded-md"
                                        placeholder="EJ: 1092768965"
                                        value={formValues.cedula || ""}
                                        onChange={(e) => handleInputChange("cedula", e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={handleRequestSearch}
                        className="flex w-[176px] bg-blue-500 text-white px-4 py-2 rounded-[27px] mt-10 cursor-pointer justify-center gap-4"
                        disabled={loading}
                    >
                        <IoIosSearch className="w-6 h-6"/>
                        {loading ? "Buscando..." : "Buscar"}
                    </button>
                </div>


            </div>
            <div className={'mt-10 bg-[#F5FAFF]'}>
                {searchData && <Table   data={searchData}/>}
            </div>
        </div>
    );

}
