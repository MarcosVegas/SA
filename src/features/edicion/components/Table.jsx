import { useState } from "react";
import Swal from "sweetalert2";
import { requestUpdate } from "../../../core/services/requestUpdate"; 
import { requestUpdateMascotas } from "../../../core/services/requestUpdateMascotas"; 
import { requestUpdatePagoAsesor } from "../../../core/services/requestUpdatePagoAsesor"; 
import AseguradoSection from "./AseguradoSection";
import MascotasSection from "./MascotasSection";
import PagoAsesorSection from "./PagoAsesorSection";
import { razasPerros, razasGatos } from "../../../core/libs/Constants";

export default function Table({ data }) {
    const mascotas = data.Asegurado.Mascotas?.flat() || [];
    const pagoAsesor = data.Asegurado.PagoAsesor?.flat() || [];
    const [mascotasData, setMascotasData] = useState(mascotas);
    const [pagoAsesorData, setPagoAsesorData] = useState(pagoAsesor);
    const [showInfo, setShowInfo] = useState({ poliza: false, mascotas: false, pagoAsesor: false });
    const [editable, setEditable] = useState(false);
    const [aseguradoData, setAseguradoData] = useState({
        TipoIdAsegurado: data.Asegurado.TipoIdAsegurado || "",
        NombreAseguradoCompleto: data.Asegurado.NombreAseguradoCompleto,
        NumeroIdAsegurado: data.Asegurado.NumeroIdAsegurado,
        PrimerApellidoAsegurado: data.Asegurado.PrimerApellidoAsegurado,
        SegundoApellidoAsegurado: data.Asegurado.SegundoApellidoAsegurado,
        SexoAsegurado: data.Asegurado.SexoAsegurado,
        Telefono: data.Asegurado.Telefono,
        Email: data.Asegurado.Email,
        Direccion: data.Asegurado.Direccion,
        Ciudad: data.Asegurado.Ciudad,
        FormaDePago: data.Asegurado.FormaDePago || "", 
        Ultimos4DigitosCuenta: data.Asegurado.Ultimos4DigitosCuenta || 0,
        Banco: data.Asegurado.Banco || "",
        AutorizaDebitoAutomatico: data.Asegurado.AutorizaDebitoAutomatico || "",
        TipoDeCuenta: data.Asegurado.TipoDeCuenta || "", 
        Franquicia: data.Asegurado.Franquicia || "",
        CodigoDeOficina: data.Asegurado.CodigoDeOficina || "", 
        ApuntadorDebitoAutomatico: data.Asegurado.ApuntadorDebitoAutomatico || "",
        EmpresaColectiva: data.Asegurado.EmpresaColectiva || "", 
        CargoColectiva: data.Asegurado.CargoColectiva || ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [selectedMascotaIndex, setSelectedMascotaIndex] = useState(null);
    const [selectedPagoAsesorIndex, setSelectedPagoAsesorIndex] = useState(null);
    const [loading, setLoading] = useState(false);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

function sumarUnDiaYFormatear(fechaStr) {
    if (!fechaStr) return "";
    const base = fechaStr.length > 10 ? fechaStr.slice(0, 10) : fechaStr;
    const [year, month, day] = base.split("-");
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
    
    return date.toISOString().slice(0, 19) + "Z";
}

function sumarUnDiaYFormatearFin(fechaStr) {
    if (!fechaStr) return "";
    const base = fechaStr.length > 10 ? fechaStr.slice(0, 10) : fechaStr;
    const [year, month, day] = base.split("-");
    const date = new Date(`${year}-${month}-${day}T05:00:00Z`);
    date.setDate(date.getDate());
    return date.toISOString().slice(0, 19) + "Z";
}

    const checkAndUpdateMascotaAge = () => {
        const updatedMascotas = mascotasData.map(mascota => {
            const birthDate = new Date(mascota.FechaNacimiento);
            const birthMonth = birthDate.getMonth() + 1;
            const birthDay = birthDate.getDate();

            if (birthMonth === currentMonth && birthDay === currentDay) {
                mascota = { ...mascota, Edad: mascota.Edad + 1 };
            }

            return mascota;
        });
        setMascotasData(updatedMascotas);
    };


    const toggleSection = (section) => {
        setShowInfo((prev) => {
            const newState = { poliza: false, mascotas: false, pagoAsesor: false };
            newState[section] = !prev[section];
            return newState;
        });
    };

    const handleMascotaChange = (e, index, key) => {
        const { value } = e.target;
        setMascotasData((prevMascotas) => {
            const newMascotas = [...prevMascotas];
            newMascotas[index] = { ...newMascotas[index], [key]: value };
            return newMascotas;
        });
    };


    const handleAseguradoChange = (e, key) => {
        setAseguradoData((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };


    const handlePagoAsesorChange = (e, index, key) => {
        const { value } = e.target;

        setPagoAsesorData((prevPagoAsesor) => {
            const newPagoAsesor = [...prevPagoAsesor];
    
            if (value) {
                newPagoAsesor[index] = {
                    ...newPagoAsesor[index],
                    [key]: value
                };
            } else {
                newPagoAsesor[index] = {
                    ...newPagoAsesor[index],
                    [key]: ""
                };
            }
           
            return newPagoAsesor;
        });
    };

    const guardarMascotaEditada = (index) => {
        const mascotaEditada = mascotasData[index];
        enviarMascotaIndividual(mascotaEditada);
        setSelectedMascotaIndex(null);
    };

    const guardarPagoAsesorEditado = (index) => {
        const idMascota = mascotasData[index]?.IdMascota;
        const pagoAsesorEditado = pagoAsesorData[index];
        const pagoConMascota = {
            ...pagoAsesorEditado,
            IdMascota: idMascota,
            SaldoGastosVeterinario: Number(pagoAsesorEditado.SaldoGastosVeterinario) || 0,
        };
        console.log("Pago Asesor a enviar:", pagoConMascota);
        enviarPagoAsesor(pagoConMascota);
        setSelectedPagoAsesorIndex(null);
    };


    const enviarMascotaIndividual = async (mascota) => {
        try {
            const data = {
                    mascota: {
                        NombreMascota: mascota.NombreMascota || "",
                        Edad: mascota.Edad || "",
                        Sexo: mascota.Sexo || "",
                        Raza: mascota.Raza || "",
                        FechaNacimiento: sumarUnDiaYFormatearFin(mascota.FechaNacimiento) || "",
                        IdMascota: mascota.IdMascota || "",
                        NumeroDeMicrochipDeLaMascota: mascota.NumeroDeMicrochipDeLaMascota || "",
                        EdadDeIngresoMascota: mascota.EdadDeIngresoMascota || "",
                        NumeroPoliza: mascota.NumeroPoliza || "",
                    },
                }

            const response = await requestUpdateMascotas(data);

            if (!response) throw new Error("No se recibió respuesta de la API.");

            Swal.fire({
                icon: "success",
                title: "Mascota actualizada",
                text: `La información de ${mascota.NombreMascota} se actualizó con éxito.`,
            });
        } catch (error) {
            console.error("Error al enviar mascota:", error);
            Swal.fire({
                icon: "error",
                title: "Error al guardar mascota"
            });
        }
    };



    const enviarPagoAsesor = async (pagoAsesor) => {
    try {
        let RcValue = pagoAsesor.Rc;
        let IncluyeRcValue = pagoAsesor.IncluyeRc;

        if (RcValue !== undefined && RcValue !== "") {
            IncluyeRcValue = RcValue;
        }

        if ((RcValue === undefined || RcValue === "") && IncluyeRcValue !== undefined) {
            RcValue = "";
        }

        const data = {
            pagoAsesor: Object.fromEntries(
                Object.entries({
                    ...pagoAsesor,
                    Rc: RcValue,
                    IncluyeRc: IncluyeRcValue,
                    FechaCancelacion: pagoAsesor.FechaCancelacion,
                    InicioDeVigencia: sumarUnDiaYFormatearFin(pagoAsesor.InicioDeVigencia),
                    FinDeVigencia: sumarUnDiaYFormatearFin(pagoAsesor.FinDeVigencia),
                    FechaExpedicionPoliza: pagoAsesor.FechaExpedicionPoliza,
                    FechaUltimoRecibo: pagoAsesor.FechaUltimoRecibo,
                    BolsaAseguradaRc: parseInt(pagoAsesor.BolsaAseguradaRc, 10) || 0,
                    SaldoRc: parseInt(pagoAsesor.SaldoRc, 10) || 0,
                    CodAsesor: pagoAsesor.CodAsesor,
                    ValorDePrimaMensualSinIva: parseInt(pagoAsesor.ValorDePrimaMensualSinIva, 10) || 0,
                    ValorDePrimaAnualSinIva: parseInt(pagoAsesor.ValorDePrimaAnualSinIva, 10) || 0,
                    ValorDePrimaMensualConIva: parseInt(pagoAsesor.ValorDePrimaMensualConIva, 10) || 0,
                    ValorDePrimaAnualConIva: parseInt(pagoAsesor.ValorDePrimaAnualConIva, 10) || 0,
                    MotivoCancelacion: pagoAsesor.MotivoCancelacion,
                    NombreAsesor: pagoAsesor.NombreAsesor,
                    Modificaciones: pagoAsesor.Modificaciones,
                    InicioVigenciaOriginal: pagoAsesor.InicioVigenciaOriginal,
                    BolsaAseguradaServiciosVeterinarios: parseInt(pagoAsesor.BolsaAseguradaServiciosVeterinarios, 10) || 0,
                }).filter(([_, value]) => value !== "" && value !== 0)
            ),
        };

        const response = await requestUpdatePagoAsesor(data);

        if (!response) throw new Error("No se recibió respuesta de la API.");

        Swal.fire({
            icon: "success",
            title: "Información plan actualizada"
        });
    } catch (error) {
        console.error("Error al enviar informacion del plan:", error);
        Swal.fire({
            icon: "error",
            title: "Error al enviar informacion del plan"
        });
    }
};

    const handleUpload = async () => {

        const dataToSend = {
            asegurado: {
                aseguradoData: { ...aseguradoData },
            },
        };

        setLoading(true);

        try {
            const response = await requestUpdate(dataToSend);

            if (!response) {
                throw new Error("No se recibió respuesta de la API.");
            }

            Swal.fire({
                icon: "success",
                title: "Enviado correctamente",
                text: "Los datos han sido enviados con éxito.",
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error("Error al enviar la información:", error);
            Swal.fire({
                icon: "error",
                title: "Error en la solicitud",
                text: error.message || "Ocurrió un error inesperado.",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="space-y-4 mx-30 py-20">
            <h2 className="text-[#2D6DF6] font-bold text-[18px]">Resultados de búsqueda</h2>
            <p><strong>Cédula:</strong> {aseguradoData.NumeroIdAsegurado}</p>
            <div className="border-1 border-[#81B1FF] rounded-[24px] bg-white py-4 px-6">
                <AseguradoSection
                    aseguradoData={aseguradoData}
                    editable={editable}
                    loading={loading}
                    showInfo={showInfo}
                    toggleSection={toggleSection}
                    handleAseguradoChange={handleAseguradoChange}
                    handleUpload={handleUpload}
                    setEditable={setEditable}
                />
                <MascotasSection
                    mascotasData={mascotasData}
                    pagoAsesorData={pagoAsesorData}
                    showInfo={showInfo}
                    toggleSection={toggleSection}
                    selectedMascotaIndex={selectedMascotaIndex}
                    setSelectedMascotaIndex={setSelectedMascotaIndex}
                    handleMascotaChange={handleMascotaChange}
                    guardarMascotaEditada={guardarMascotaEditada}
                    razasPerros={razasPerros}
                    razasGatos={razasGatos}
                />
                <PagoAsesorSection
                    pagoAsesorData={pagoAsesorData}
                    mascotasData={mascotasData}
                    showInfo={showInfo}
                    toggleSection={toggleSection}
                    selectedPagoAsesorIndex={selectedPagoAsesorIndex}
                    setSelectedPagoAsesorIndex={setSelectedPagoAsesorIndex}
                    guardarPagoAsesorEditado={guardarPagoAsesorEditado}
                    handlePagoAsesorChange={handlePagoAsesorChange}
                />
            </div>
        </div>
    );
}
