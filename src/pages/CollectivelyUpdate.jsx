import {CiLogout} from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import * as XLSX from "xlsx";
import {handleDownloadTemplate} from "../shared/utils/index.js";
import {MdOutlineFileDownload} from "react-icons/md";
import {IoIosAttach} from "react-icons/io";
import Swal from "sweetalert2";


export  function CollectivelyUpdate() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState([]);
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

        const formattedData = jsonData.map((item) => {
            const inicioVigencia = item["Inicio de vigencia"] || item.InicioVigencia;
            const finVigencia = item["Fin de vigencia"] || item.FinVigencia;
            const terminacionCarencia = item["Terminación de Carencia"] || item.TerminacionCarencia;
            const dia15PostVigencia = item["Día 15 después de inicio de vigencia"] || item.Dia15PostVigencia;
            const dia25PostVigencia = item["Día 25 después de inicio de vigencia"] || item.Dia25PostVigencia;
            const dia30PostVigencia = item["Día 30 después de inicio de vigencia"] || item.Dia30PostVigencia;
            const FechaCancelacion = item["Fecha de cancelación"] || item.FechaCancelacion;
    
            const formatDate = (dateString) => {
                if (!dateString) return null;
                const [day, month, year] = dateString.split("/");
                return new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();
            };
    
            // Crear el objeto con los datos formateados
            const rawData = {
                NumeroPoliza: String(item.NumeroPoliza || item["N° Póliza"]),
                IDMascota: String(item.IDMascota || item["ID Mascota"]),
                NombreMascota: String(item.NombreMascota || item["Nombre mascota"]),
                Raza: String(item.Raza || item["Raza"]),
                FechaNacimientoMascotaEstimada: String(item.FechaNacimientoMascotaEstimada || item["Fecha estimada de nacimiento mascota"]),
                EdadIngresoMascota: String(item.EdadIngresoMascota || item["Edad Ingreso Mascota"]),
                EdadActualMascota: String(item.EdadActualMascota || item["Edad Actual Mascota"]),
                SexoMascota: String(item.SexoMascota || item["Sexo Mascota"]),
                Producto: String(item.Producto || item["Producto"]),
                Plan: String(item.Plan || item["Plan"]),
                Estado: String(item.Estado || item["Estado"]),
                InicioVigencia: formatDate(inicioVigencia),
                FinVigencia: formatDate(finVigencia),
                BolsaAseguradaServiciosVeterinarios: item.BolsaAseguradaServiciosVeterinarios || item["BolsaAseguradaServiciosVeterinarios"],
                SaldoGastosVeterinarios: item.SaldoGastosVeterinarios || item["SaldoGastosVeterinarios"],
                BolsaAseguradaRC: item.BolsaAseguradaRC || item["Bolsa Asegurada RC"],
                SaldoRC: item.SaldoRC || item["Saldo RC"],
                RC: String(item.RC || item["RC"]),
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
                PrimaMensualSinIVA: item.PrimaMensualSinIVA || item["Prima Mensual Sin IVA"],
                PrimaAnualSinIVA: item.PrimaAnualSinIVA || item["Prima Anual Sin IVA"],
                PrimaMensualConIVA: item.PrimaMensualConIVA || item["Prima Mensual Con IVA"],
                PrimaAnualConIVA: item.PrimaAnualConIVA || item["Prima Anual Con IVA"],
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
            };
    
            // Filtrar claves con valores null o undefined
            return Object.fromEntries(
                Object.entries(rawData).filter(([_, value]) => value !== null && value !== "undefined")
            );
        });

        try {
            const response = await fetch("", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({data: formattedData}),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Enviado correctamente",
                    text: "Los datos han sido enviados con éxito.",
                }).then(() => {
                    window.location.reload();
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
                Aquí realizar hazta 50 renovaciones masivas
            </p>

            <div className="flex flex-col mt-5">
                <div className="flex gap-3">
                    <label
                        className="bg-blue-500 text-white px-4 py-2 rounded-[27px] cursor-pointer hover:bg-[#0033A0] text-center w-[391px] flex justify-center gap-5">
                        <IoIosAttach className="w-6 h-6 inline-block"/>
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
                    <MdOutlineFileDownload className="w-6 h-6 inline-block "/>
                    Descarga plantilla de base de datos
                </button>
            </div>


            {jsonData.length > 0 && (
                <>
                    <div className="mt-10 overflow-x-auto max-h-[500px]">

                        <table className="w-full min-w-max min-h-max border-collapse border border-gray-300 shadow-md ">
                            <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border border-gray-300 px-4 py-2">N° Póliza</th>
                                <th className="border border-gray-300 px-4 py-2">ID Mascota</th>
                                <th className="border border-gray-300 px-4 py-2">Nombre Mascota</th>
                                <th className="border border-gray-300 px-4 py-2">Raza</th>
                                <th className="border border-gray-300 px-4 py-2">Fecha Nacimiento Mascota Estimada</th>
                                <th className="border border-gray-300 px-4 py-2">Edad Ingreso Mascota</th>
                                <th className="border border-gray-300 px-4 py-2">Edad Actual Mascota</th>
                                <th className="border border-gray-300 px-4 py-2">Sexo Mascota</th>
                                <th className="border border-gray-300 px-4 py-2">Producto</th>
                                <th className="border border-gray-300 px-4 py-2">Plan</th>
                                <th className="border border-gray-300 px-4 py-2">Estado</th>
                                <th className="border border-gray-300 px-4 py-2">Inicio Vigencia</th>
                                <th className="border border-gray-300 px-4 py-2">Fin Vigencia</th>
                                <th className="border border-gray-300 px-4 py-2">Bolsa Asegurada Servicios Veterinarios</th>
                                <th className="border border-gray-300 px-4 py-2">Saldo Gastos Veterinarios</th>
                                <th className="border border-gray-300 px-4 py-2">RC</th>
                                <th className="border border-gray-300 px-4 py-2">Bolsa Asegurada RC</th>
                                <th className="border border-gray-300 px-4 py-2">Saldo RC</th>
                                <th className="border border-gray-300 px-4 py-2">Tipo ID Asegurado</th>
                                <th className="border border-gray-300 px-4 py-2">Número ID Asegurado</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Nombre Completo</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Primer Apellido</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Segundo Apellido</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Sexo</th>
                                <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Dirección</th>
                                <th className="border border-gray-300 px-4 py-2">Ciudad</th>
                                <th className="border border-gray-300 px-4 py-2">Tipo ID Asegurado Secundario</th>
                                <th className="border border-gray-300 px-4 py-2">Número ID Asegurado Secundario</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Secundario Nombre Completo</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Secundario Primer Apellido</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Secundario Segundo Apellido</th>
                                <th className="border border-gray-300 px-4 py-2">Asegurado Secundario Sexo</th>
                                <th className="border border-gray-300 px-4 py-2">Teléfono 2</th>
                                <th className="border border-gray-300 px-4 py-2">Email 3</th>
                                <th className="border border-gray-300 px-4 py-2">Dirección 4</th>
                                <th className="border border-gray-300 px-4 py-2">Ciudad 5</th>
                                <th className="border border-gray-300 px-4 py-2">Forma de Pago</th>
                                <th className="border border-gray-300 px-4 py-2">Últimos 4 Dígitos Cuenta</th>
                                <th className="border border-gray-300 px-4 py-2">Banco</th>
                                <th className="border border-gray-300 px-4 py-2">Autoriza Débito Automático</th>
                                <th className="border border-gray-300 px-4 py-2">Tipo Cuenta</th>
                                <th className="border border-gray-300 px-4 py-2">Franquicia</th>
                                <th className="border border-gray-300 px-4 py-2">Código de Oficina</th>
                                <th className="border border-gray-300 px-4 py-2">Código Asesor</th>
                                <th className="border border-gray-300 px-4 py-2">Apuntador Débito Automático</th>
                                <th className="border border-gray-300 px-4 py-2">Prima Mensual Sin IVA</th>
                                <th className="border border-gray-300 px-4 py-2">Prima Anual Sin IVA</th>
                                <th className="border border-gray-300 px-4 py-2">Prima Mensual Con IVA</th>
                                <th className="border border-gray-300 px-4 py-2">Prima Anual Con IVA</th>
                                <th className="border border-gray-300 px-4 py-2">Terminación Carencia</th>
                                <th className="border border-gray-300 px-4 py-2">Día 15 Post Vigencia</th>
                                <th className="border border-gray-300 px-4 py-2">Día 25 Post Vigencia</th>
                                <th className="border border-gray-300 px-4 py-2">Día 30 Post Vigencia</th>
                                <th className="border border-gray-300 px-4 py-2">Número Microchip Mascota</th>
                                <th className="border border-gray-300 px-4 py-2">Vía de Pago</th>
                                <th className="border border-gray-300 px-4 py-2">Tipo Póliza</th>
                                <th className="border border-gray-300 px-4 py-2">Empresa Colectiva</th>
                                <th className="border border-gray-300 px-4 py-2">Cargo Colectiva</th>
                                <th className="border border-gray-300 px-4 py-2">Fecha Cancelación</th>
                                <th className="border border-gray-300 px-4 py-2">Motivo Cancelación</th>
                                <th className="border border-gray-300 px-4 py-2">Nombre Asesor</th>
                                <th className="border border-gray-300 px-4 py-2">Traslado Otra Póliza</th>
                                <th className="border border-gray-300 px-4 py-2">Sede Empresa Colectiva</th>
                                <th className="border border-gray-300 px-4 py-2">Modificaciones</th>
                                <th className="border border-gray-300 px-4 py-2">Fecha Expedición Póliza</th>
                            </tr>
                            </thead>
                            <tbody>
                            {jsonData.map((item, index) => (
                                <tr key={index} className="odd:bg-gray-100 even:bg-white">
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["N° Póliza"] || item.NumeroPoliza}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["ID Mascota"] || item.IDMascota}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Nombre mascota"] || item.NombreMascota}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Raza"] || item.Raza}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Fecha estimada de nacimiento mascota"] || item.FechaNacimientoMascotaEstimada}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Edad Ingreso Mascota"] || item.EdadIngresoMascota}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Edad Actual Mascota"] || item.EdadActualMascota}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Sexo Mascota"] || item.SexoMascota}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Producto"] || item.Producto}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Plan"] || item.Plan}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Estado"] || item.Estado}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Inicio de vigencia"] || item.InicioVigencia}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Fin de vigencia"] || item.FinVigencia}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["BolsaAseguradaServiciosVeterinarios"] || item.BolsaAseguradaServiciosVeterinarios}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["SaldoGastosVeterinarios"] || item.SaldosGastosVeterinarios}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["RC"] || item.RC}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Bolsa Asegurada RC"] || item.BolsaAseguradaRC}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Saldo RC"] || item.SaldoRC}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["TipoIDAsegurado"] || item.TipoID}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["NumeroIDAsegurado"] || item.NumeroIdAsegurado}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Asegurado Nombre Completo"] || item.AseguradoNombreCompleto}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Asegurado Primer Apellido"] || item.AseguradoPrimerApellido}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Asegurado Segundo Apellido"] || item.AseguradoSegundoApellido}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Asegurado Sexo"] || item.AseguradoSexo}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Teléfono"] || item.Telefono}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Email"] || item.Email}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Dirección"] || item.Direccion}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Ciudad"] || item.Ciudad}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Tipo ID Asegurado Secundario"] || item.TipoIDAseguradoSecundario}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Número ID Asegurado Secundario"] || item.NumeroIDAseguradoSecundario}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Asegurado Secundario Nombre Completo"] || item.AseguradoSecundarioNombreCompleto}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Asegurado Secundario Primer Apellido"] || item.AseguradoSecundarioPrimerApellido}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Asegurado Secundario Segundo Apellido"] || item.AseguradoSecundarioSegundoApellido}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Asegurado Secundario Sexo"] || item.AseguradoSecundarioSexo}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Teléfono 2"] || item.Telefono2}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Email 3"] || item.Email3}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Dirección 4"] || item.Direccion4}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Ciudad 5"] || item.Ciudad5}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Forma de Pago"] || item.FormaDePago}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Últimos 4 Dígitos Cuenta"] || item.Ultimos4DigitosCuenta}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Banco"] || item.Banco}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Autoriza Débito Automático	"] || item.AutorizaDebitoAutomatico}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Tipo Cuenta"] || item.TipoCuenta}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Franquicia"] || item.Franquicia}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["CodigoOficina"] || item.CodigoOficina}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Cod Asesor"] || item.CodigoAsesor}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["ApuntadorDebitoAutomatico"] || item.ApuntadorDebitoAutomatico}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Prima Mensual Sin IVA"] || item.PrimaMensualSinIVA}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Prima Anual Sin IVA"] || item.PrimaAnualSinIVA}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Prima Mensual Con IVA"] || item.PrimaMensualConIVA}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Prima Anual Con IVA"] || item.PrimaAnualConIVA}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Terminación Carencia"] || item.TerminacionCarencia}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Día 15 Post Vigencia"] || item.Dia15PostVigencia}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Día 25 Post Vigencia"] || item.Dia25PostVigencia}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Día 30 Post Vigencia"] || item.Dia30PostVigencia}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["NumeroMicrochipMascota"] || item.NumeroMicrochipMascota}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Vía de Pago"] || item.ViaDePago}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Tipo Póliza"] || item.TipoPoliza}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Empresa Colectiva"] || item.EmpresaColectiva}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Cargo Colectiva"] || item.CargoColectiva}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Fecha Cancelación"] || item.FechaCancelacion}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Motivo Cancelación"] || item.MotivoCancelacion}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Nombre Asesor"] || item.NombreAsesor}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Traslado Otra Póliza"] || item.TrasladoOtraPoliza}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Sede Empresa Colectiva"] || item.SedeEmpresaColectiva}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Modificaciones"] || item.Modificaciones}</td>
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Fecha Expedición Póliza"] || item.FechaExpedicionPoliza}</td>
                             </tr>
                            ))}
                            </tbody>
                        </table>


                    </div>
                    <button
                        onClick={handleUpload}
                        className="bg-blue-500 text-white p-2 mt-5 rounded-[27px] h-[39px] w-[391px] cursor-pointer hover:bg-[#0033A0]"
                    >
                        Enviar a base de datos
                    </button>
                </>
            )}
        </div>
    </>;
}