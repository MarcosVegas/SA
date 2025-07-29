import {CiLogout} from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import * as XLSX from "xlsx";
import {handleDownloadTemplate} from "../shared/utils/index.js";
import Swal from "sweetalert2";
import { FileControls } from "../core/components/FileControls";
import { DataTable } from "../core/components/DataTable.jsx";
import { UploadButton } from "../core/components/UploadButton";
import { requestUpdatePage } from "../core/services/requestUpdatePage.js";

export  function UpdatePage() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState([]);
    const [loading, setLoading] = useState(false);
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

    const incluyeRcValido = parsedData.every(item => {
        const incluyeRc = String(item.IncluyeRc || item["IncluyeRc"] || "").toLowerCase();
        return (
            incluyeRc === "true" ||
            incluyeRc === "false" ||
            incluyeRc === "sí" ||
            incluyeRc === "si" ||
            incluyeRc === "no"
        );
    });

    if (!incluyeRcValido) {
        Swal.fire({
            icon: "error",
            title: "Valor inválido en Incluye RC",
            text: `El campo "Incluye RC" debe ser SI o NO.`,
        });
        setJsonData([]);
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        return;
    }

    setJsonData(parsedData);
}
        };
    };

    const handleUpload = async () => {
        if (jsonData.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Sin datos",
                text: "No hay datos para enviar.",
            });
            return;
        }

        for (const item of jsonData) {
        const poliza = String(item.NumeroPoliza || item["N° Póliza"] || "");
        const idMascota = String(item.IDMascota || item["ID Mascota"] || "");
        if (!idMascota.startsWith(poliza)) {
            Swal.fire({
                icon: "error",
                title: "ID Mascota inválido",
                text: `El ID de la mascota (${idMascota}) debe empezar con el número de póliza (${poliza}).`,
            });
            return;
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
            const FechaCancelacion = item["Fecha de cancelación"] || item.FechaCancelacion;
    
            const formatEdad = (valor) => {
            const num = String(valor).trim();
            return /^[1-8]$/.test(num) ? `${num} años` : num;
        };

            const formatDate = (dateString, sumarDia = true) => {
                if (!dateString || typeof dateString !== "string" || !dateString.includes("/")) return null;
                const [day, month, year] = dateString.split("/");
                if (!day || !month || !year) return null;
                const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
                if (isNaN(date.getTime())) return null; 
                if (sumarDia) {
                    date.setUTCDate(date.getUTCDate() + 1);
                }
                date.setHours(0, 0, 0, 0);
                return date.toISOString();
            };
            const parseNumericField = (value) => {
                return isNaN(value) || (typeof value === "string" && /[^\d]/.test(value)) ? 0 : Number(value);
            };
            const safeFormatDate = (dateString) => {
                if (!dateString || typeof dateString !== "string" || !dateString.includes("/")) return dateString || "";
                let [day, month, year] = dateString.split("/");
                if (day && day.length === 1) day = "0" + day;
                if (month && month.length === 1) month = "0" + month;
                if (!day || !month || !year) return dateString;
                const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
                if (isNaN(date.getTime())) return dateString;
                date.setUTCDate(date.getUTCDate() + 1);
                date.setHours(0, 0, 0, 0);
                return date.toISOString();
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
                IncluyeRc: (String(item.IncluyeRc || item["IncluyeRc"] || "").toLowerCase() === "sí" || String(item.IncluyeRc || item["IncluyeRc"] || "").toLowerCase() === "si") ? true : false,
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
                FechaExpedicionPoliza: safeFormatDate(item.FechaExpedicionPoliza || item["Fecha Expedición Póliza"]),
                FechaUltimoRecibo: safeFormatDate(item.FechaUltimoRecibo || item["Fecha Último Recibo"]),
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
            const responseData = await requestUpdatePage(formattedData);
            if (responseData && responseData.success) {
                Swal.fire({
                    icon: "success",
                    title: "Enviado correctamente",
                    text: "Los datos han sido enviados con éxito.",
                }).then(() => {
                    window.location.reload();
                });
            } else if (responseData && responseData.duplicate) {
                Swal.fire({
                    icon: "warning",
                    title: "Dato duplicado",
                    text: "El dato ya existe en la base de datos.",
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

                Carga de datos para Pólizas Colectivas
            </h1>
            <p className="text-[16px] mt-5">
                Aquí podrás importar máximo 50 datos de una póliza colectiva
            </p>
            <p>
                <strong>  * Recuerda que los campos vacíos deben permanecer en blanco</strong>
            </p>
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