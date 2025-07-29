import {CiLogout} from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import * as XLSX from "xlsx";
import {handleDownloadTemplate} from "../shared/utils/index.js";
import Swal from "sweetalert2";
import { FileControls } from "../core/components/FileControls";
import { DataTable } from "../core/components/DataTable.jsx";
import { UploadButton } from "../core/components/UploadButton";
import { requestUpdateCollectively } from "../core/services/requestUpdateCollectively.js";

const excelDateToJSDate = (serial) => {
    const utcDays = Math.floor(serial - 25569); 
    const utcValue = utcDays * 86400; 
    const dateInfo = new Date(utcValue * 1000); 
    const day = String(dateInfo.getUTCDate()).padStart(2, '0');
    const month = String(dateInfo.getUTCMonth() + 1).padStart(2, '0');
    const year = dateInfo.getUTCFullYear();
    return `${day}/${month}/${year}`;
};

export  function CollectivelyUpdate() {
        const navigate = useNavigate();
            const [file, setFile] = useState(null);
            const [jsonData, setJsonData] = useState([]);
            const [loading, setLoading] = useState(false);
            const [errors, setErrors] = useState({}); 
            const fileInputRef = useRef(null);
        
            const handleMenuPage = () => {
                navigate("/");
            };
        
            const handleFileChange = (event) => {
                if (event.target.files && event.target.files.length > 0) {
                    const file = event.target.files[0];
                    setFile(file);
                    readExcel(file);
                }
            };
        
            const readExcel = (file) => {
                const reader = new FileReader();
                reader.readAsBinaryString(file);
        
                reader.onload = (e) => {
                    const data = e.target?.result;
                    const workbook = XLSX.read(data, { type: "binary" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const parsedData = XLSX.utils.sheet_to_json(sheet);
        
                    if (parsedData.length > 51) {
                        Swal.fire({
                            icon: "error",
                            title: "Archivo demasiado grande",
                            text: "El archivo supera los 50 registros permitidos. Selecciona otro archivo.",
                        });
        
                        setJsonData([]);
                        setFile(null);
        
                        if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                        }
                    } else {
                        const formatToExcelDate = (value) => {
                            if (!value) {
                                return value;
                            }

                            if (!isNaN(value) && Number(value) > 59) {
                                return excelDateToJSDate(Number(value));
                            }

                            if (typeof value === "string" && value.includes("/")) {
                                const [day, month, year] = value.split("/").map(Number);
                                if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                                    const date = new Date(year, month - 1, day);
                                    if (!isNaN(date.getTime())) {
                                        const formattedDay = String(date.getUTCDate()).padStart(2, '0');
                                        const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
                                        const formattedYear = date.getUTCFullYear();
                                        return `${formattedDay}/${formattedMonth}/${formattedYear}`;
                                    }
                                }
                            }

                            const date = new Date(value);
                            if (!isNaN(date.getTime())) {
                                const day = String(date.getUTCDate()).padStart(2, '0');
                                const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                                const year = date.getUTCFullYear();
                                return `${day}/${month}/${year}`;
                            }

                            return value;
                        };
        
                        const processedData = parsedData.map((item, index) => {
                            const formatField = (field, fieldName) => {
                                if (field) {
                                    const formattedDate = formatToExcelDate(field);
                                    return formattedDate;
                                }
                                return field;
                            };
        
                            item["InicioVigencia"] = formatField(item["InicioVigencia"], "InicioVigencia");
                            item["FinVigencia"] = formatField(item["FinVigencia"], "FinVigencia");
        
                            return item;
                        });
        
                        setJsonData(processedData);
                    }
                };
            };
        
            const handleFieldBlur = (fieldName, value) => {
                if (!value) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [fieldName]: `${fieldName} no puede estar vacío.`
                    }));
                } else {
                    setErrors((prevErrors) => {
                        const newErrors = { ...prevErrors };
                        delete newErrors[fieldName];
                        return newErrors;
                    });
                }
            };
        
            const handleUpload = async () => {
                const newErrors = {};
                jsonData.forEach((item, index) => {
                    if (!item.InicioVigencia) {
                        newErrors[`InicioVigencia-${index}`] = "Inicio de vigencia no puede estar vacío.";
                    }
                    if (!item.FinVigencia) {
                        newErrors[`FinVigencia-${index}`] = "Fin de vigencia no puede estar vacío.";
                    }
                });
        
                if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                    Swal.fire({
                        icon: "error",
                        title: "Campos obligatorios vacíos",
                        text: "Por favor completa todos los campos obligatorios antes de enviar."
                    });
                    return;
                }
        
                if (jsonData.length === 0) {
                    Swal.fire({
                        icon: "warning",
                        title: "Sin datos",
                        text: "No hay datos para enviar.",
                    });
                    return;
                }
        
                for (const [i, item] of jsonData.entries()) {
                const inicioVigencia = item["Inicio de vigencia"] || item.InicioVigencia;
                const finVigencia = item["Fin de vigencia"] || item.FinVigencia;
                const bolsaAsegurada = item["BolsaAseguradaServiciosVeterinarios"] || item.BolsaAseguradaServiciosVeterinarios;
                const saldoGastos = item["SaldoGastosVeterinarios"] || item.SaldoGastosVeterinarios;
                const primaAnualSinIVA = item["Prima Anual Sin IVA"] || item.PrimaAnualSinIVA;
                const primaAnualConIVA = item["Prima Anual Con IVA"] || item.PrimaAnualConIVA;
                const primaMensualSinIVA = item["Prima Mensual Sin IVA"] || item.PrimaMensualSinIVA;
                const primaMensualConIVA = item["Prima Mensual Con IVA"] || item.PrimaMensualConIVA;
                const incluyeRcRaw = item["IncluyeRc"] || item.IncluyeRc;
                const incluyeRc =
                    typeof incluyeRcRaw === "string"
                        ? incluyeRcRaw.trim().toLowerCase()
                        : incluyeRcRaw;
                const bolsaRC = item["Bolsa Asegurada RC"] || item.BolsaAseguradaRC;
                const saldoRC = item["Saldo RC"] || item.SaldoRC;

                if (
                    !inicioVigencia ||
                    !finVigencia ||
                    !bolsaAsegurada ||
                    !saldoGastos ||
                    !primaAnualSinIVA ||
                    !primaAnualConIVA ||
                    !primaMensualSinIVA ||
                    !primaMensualConIVA ||
                    !incluyeRc ||
                    (incluyeRc !== "si" && incluyeRc !== "no")
                )  {
                        Swal.fire({
                            icon: "error",
                            title: "Campos obligatorios vacíos",
                            text: `Hay campos requeridos vacíos en la fila ${i + 1}. Por favor completa todos los campos obligatorios antes de enviar.`,
                        });
                        return;
                    }
                    if (
                    incluyeRc === "si" || incluyeRc === true
                ) {
                    if (!bolsaRC || Number(bolsaRC) === 0 || !saldoRC || Number(saldoRC) === 0) {
                        Swal.fire({
                            icon: "error",
                            title: "Campos inválidos",
                            text: `Revisa los valores en la fila ${i + 1}. Si el campo "Incluye RC" está marcado como "Sí", los campos "Saldo RC" y "Bolsa RC" deben estar vacíos.`,
                        });
                        return;
                    }
                }

                if (incluyeRc === "no" || incluyeRc === false) {
                    const isEmptyOrZero = (val) =>
                        val === undefined ||
                        val === null ||
                        val === "" ||
                        (typeof val === "string" && val.trim() === "") ||
                        (typeof val === "string" && val.includes("$")) ||
                        Number(val) === 0;

                    if (!isEmptyOrZero(bolsaRC) || !isEmptyOrZero(saldoRC)) {
                        Swal.fire({
                            icon: "error",
                            title: "Campos inválidos",
                            text: `Revisa los valores en la fila ${i + 1}. Si el campo "Incluye RC" está marcado como "No", los campos "Saldo RC" y "Bolsa RC" deben estar vacíos o en cero.`,
                        });
                        return;
                    }
                }
                }
                setLoading(true);
        
                const formattedData = jsonData.map((item) => {
                    const inicioVigencia = item["Inicio de vigencia"] || item.InicioVigencia;
                    const finVigencia = item["Fin de vigencia"] || item.FinVigencia;
                    const terminacionCarencia = item["Terminación de Carencia"] || item.TerminacionCarencia;
                    const dia15PostVigencia = item["Día 15 después de inicio de vigencia"] || item.Dia15PostVigencia;
                    const dia25PostVigencia = item["Día 25 después de inicio de vigencia"] || item.Dia25PostVigencia;
                    const dia30PostVigencia = item["Día 30 después de inicio de vigencia"] || item.Dia30PostVigencia;
            
                    const formatEdad = (valor) => {
                        const num = String(valor).trim();
                        return /^[1-8]$/.test(num) ? `${num} años` : num;
                    };
        
                    const formatDate = (dateString, sumarDia = true) => {
                        if (!dateString || typeof dateString !== "string") return null;
                    const parts = dateString.split("/");
                        if (parts.length !== 3) return null;
                    const [day, month, year] = parts;
                        if (
                            isNaN(day) || isNaN(month) || isNaN(year) ||
                            day.length < 1 || month.length < 1 || year.length !== 4
                        ) {
                            return null;
                        }
                    const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
                        if (isNaN(date.getTime())) return null;
                        if (sumarDia) {
                            date.setUTCDate(date.getUTCDate() + 1);
                        }
                        date.setHours(0, 0, 0, 0);
                        return date.toISOString();
                    };
                            
                    const parseNumericField = (value) => {
                        if (typeof value === "string" && value.trim().replace(/[\s$-]/g, "") === "") return 0;
                        if (typeof value === "string" && value.includes("$")) return 0;
                        if (isNaN(value) || (typeof value === "string" && /[^\d]/.test(value.replace(/\$/g, "")))) return 0;
                        return Number(value);
                    };
                                
                    const rawData = {
                        NumeroPoliza: String(item.NumeroPoliza || item["N° Póliza"]),
                        IDMascota: String(item.IDMascota || item["ID Mascota"]),
                        NombreMascota: String(item.NombreMascota || item["Nombre mascota"]),
                        Raza: String(item.Raza || item["Raza"]),
                        FechaNacimientoMascotaEstimada: formatDate(item.FechaNacimientoMascotaEstimada || item["Fecha estimada de nacimiento mascota"]),
                        EdadIngresoMascota: formatEdad(item.EdadIngresoMascota || item["Edad Ingreso Mascota"]),
                        EdadActualMascota: formatEdad(item.EdadActualMascota || item["Edad Actual Mascota"]),
                        SexoMascota: String(item.SexoMascota || item["Sexo Mascota"]),
                        Producto: String(item.Producto || item["Producto"]),
                        Plan: String(item.Plan || item["Plan"]),
                        Estado: String(item.Estado || item["Estado"]),
                        InicioVigencia: formatDate(inicioVigencia),
                        FinVigencia: formatDate(finVigencia),
                        BolsaAseguradaServiciosVeterinarios: parseNumericField(item.BolsaAseguradaServiciosVeterinarios || item["BolsaAseguradaServiciosVeterinarios"]),
                        SaldoGastosVeterinarios: parseNumericField(item.SaldoGastosVeterinarios || item["SaldoGastosVeterinarios"]),
                        BolsaAseguradaRC: parseNumericField(item.BolsaAseguradaRC || item["Bolsa Asegurada RC"]),
                        SaldoRC: parseNumericField(item.SaldoRC || item["Saldo RC"]),
                        IncluyeRc: typeof (item["IncluyeRc"] || item.IncluyeRc) === "string" ? (item["IncluyeRc"] || item.IncluyeRc).trim().toLowerCase() === "si" : false,
                        TipoIDAsegurado: String(item.TipoIDAsegurado || item["Tipo ID Asegurado"]),
                        NumeroIDAsegurado: String(item.NumeroIDAsegurado || item["Número ID Asegurado"]),
                        AseguradoNombreCompleto: String(item.AseguradoNombreCompleto || item["Asegurado Nombre Completo"]),
                        AseguradoPrimerApellido: String(item.AseguradoPrimerApellido || item["Asegurado Primer Apellido"]),
                        AseguradoSegundoApellido: String(item.AseguradoSegundoApellido || item["Asegurado Segundo Apellido"]),
                        AseguradoSexo: String(item.AseguradoSexo || item["Asegurado Sexo"]),
                        Telefono: String(item.Telefono || item["Teléfono"]),
                        Telefono2: String(item.Telefono2 || item["Teléfono 2"]),
                        Email: String(item.Email || item["Email"]),
                        Email3: String(item.Email3 || item["Email 3"]),
                        Direccion: String(item.Direccion || item["Dirección"]),
                        Direccion4: String(item.Direccion4 || item["Dirección 4"]),
                        Ciudad: String(item.Ciudad || item["Ciudad"]),
                        Ciudad5: String(item.Ciudad5 || item["Ciudad 5"]),
                        FormaDePago: String(item.FormaDePago || item["Forma de Pago"]),
                        AutorizaDebitoAutomatico: String(item.AutorizaDebitoAutomatico || item["Autoriza Débito Automático"]),
                        CodigoAsesor: String(item.CodigoAsesor || item["Cod Asesor"]),
                        PrimaMensualSinIVA:  parseInt(item.PrimaMensualSinIVA) || 0 || item["Prima Mensual Sin IVA"],
                        PrimaAnualSinIVA:  parseInt(item.PrimaAnualSinIVA) || 0 || item["Prima Anual Sin IVA"],
                        PrimaMensualConIVA:  parseInt(item.PrimaMensualConIVA) || 0 || item["Prima Mensual Con IVA"],
                        PrimaAnualConIVA:   parseInt(item.PrimaAnualConIVA) || 0 || item["Prima Anual Con IVA"],
                        TerminacionCarencia: formatDate(terminacionCarencia),
                        Dia15PostVigencia: formatDate(dia15PostVigencia),
                        Dia25PostVigencia: formatDate(dia25PostVigencia),
                        Dia30PostVigencia: formatDate(dia30PostVigencia),
                        ViaDePago: String(item.ViaDePago || item["Vía de Pago"]),
                        TipoPoliza: String(item.TipoPoliza || item["Tipo Póliza"]),
                        EmpresaColectiva: String(item.EmpresaColectiva || item["Empresa Colectiva"]),
                        NombreAsesor: String(item.NombreAsesor || item["Nombre Asesor"]),
                        TipoIDAseguradoSecundario: String(item.TipoIDAseguradoSecundario || item["Tipo ID Asegurado Secundario"]),
                        NumeroIDAseguradoSecundario: String(item.NumeroIDAseguradoSecundario || item["Número ID Asegurado Secundario"]),
                        AseguradoSecundarioNombreCompleto: String(item.AseguradoSecundarioNombreCompleto || item["Asegurado Secundario Nombre Completo"]),
                        AseguradoSecundarioPrimerApellido: String(item.AseguradoSecundarioPrimerApellido || item["Asegurado Secundario Primer Apellido"]),
                        AseguradoSecundarioSegundoApellido: String(item.AseguradoSecundarioSegundoApellido || item["Asegurado Secundario Segundo Apellido"]),
                        AseguradoSecundarioSexo: String(item.AseguradoSecundarioSexo || item["Asegurado Secundario Sexo"]),
                        Ultimos4DigitosCuenta: String(item.Ultimos4DigitosCuenta || item["Últimos 4 Dígitos Cuenta"]),
                        Banco: String(item.Banco || item["Banco"]),
                        TipoCuenta: String(item.TipoCuenta || item["Tipo Cuenta"]),
                        Franquicia: String(item.Franquicia || item["Franquicia"]),
                        CodigoOficina: String(item.CodigoOficina || item["CodigoOficina"]),
                        ApuntadorDebitoAutomatico: String(item.ApuntadorDebitoAutomatico || item["ApuntadorDebitoAutomatico"]),
                        CargoColectiva: String(item.CargoColectiva || item["Cargo Colectiva"]),
                        FechaCancelacion: formatDate(item.FechaCancelacion || item["Fecha Cancelación"]),
                        MotivoCancelacion: String(item.MotivoCancelacion || item["Motivo Cancelación"]),
                        TrasladoOtraPoliza: String(item.TrasladoOtraPoliza || item["Traslado Otra Póliza"]),
                        SedeEmpresaColectiva: String(item.SedeEmpresaColectiva || item["Sede Empresa Colectiva"]),
                        Modificaciones: String(item.Modificaciones || item["Modificaciones"]),
                        FechaExpedicionPoliza: String(item.FechaExpedicionPoliza || item["Fecha Expedición Póliza"]),
                    };
            
                    return Object.fromEntries(
                        Object.entries(rawData).filter(([key, value]) => {
                            if (typeof value === "string" && value.trim() === "-") {
                                return false;
                            }
                            if (value === 0) {
                                return false;
                            }
                            if (value === "undefined") {
                                return false;
                            }
                            return value !== 0 && value !== "" && value !== null ;
                        })
                    );
                });
        
               try {
                    // Llama al servicio enviando el array directamente, no como { data: formattedData }
                    const response = await requestUpdateCollectively(formattedData);

                    if (response.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "Información actualizada",
                            text: "Recuerda que solo se actualizaron los campos correspondientes a renovaciones.",
                        }).then(() => {
                            window.location.reload();
                        });
                    } else if (response.status === 400) {
                        Swal.fire({
                            icon: "error",
                            title: "Dato inválido",
                            text: "La póliza que estás intentando renovar no se encuentra registrada.",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al enviar",
                            text: "Hubo un problema al enviar los datos.",
                        });
                    }
                } catch (error) {
                    console.error("Error en la solicitud", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error inesperado",
                        text: "Ocurrió un error al enviar la solicitud.",
                    });
                } finally {
                    setLoading(false);
                }
            };
        
            return <>
                 <div className="p-10 relative">
                        <button
                            onClick={handleMenuPage}
                            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer"
                        >
                            <CiLogout className="w-6 h-6"/> Salir
                        </button>
            
                        <h1 className="text-3xl text-[#0033A0] font-bold mt-5 ">
            
                        Renovaciones masivas
                        </h1>
                        <p className="text-[16px] mt-5">
                        Aquí podrás realizar hasta 50 renovaciones masivas
                    </p>
                    <div className="mt-2 mb-4">
                    <p>Recuerda que solo se actualizarán los campos correspondientes a la renovación:</p>
                    <ul className="list-disc ml-6 mt-2 text-[15px]">
                        <li>Fecha inicio de vigencia</li>
                        <li>Fecha fin de vigencia</li>
                        <li>Bolsa Asegurada</li>
                        <li>Saldo gastos veterinarios</li>
                        <li>Incluye RC</li>
                        <li>Bolsa RC</li>
                        <li>Saldo RC</li>
                        <li>Valor prima anual sin IVA</li>
                        <li>Valor prima anual con IVA</li>
                        <li>Valor prima mensual sin IVA</li>
                        <li>Valor prima mensual con IVA</li>
                    </ul>
                </div>
                <FileControls
                    file={file}
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    handleDownloadTemplate={handleDownloadTemplate}
                />

            {jsonData.length > 0 && (
                <>
                    <DataTable jsonData={jsonData} />
                    <UploadButton handleUpload={handleUpload} loading={loading} />
                </>
            )}
            </div>
        </>;
    }