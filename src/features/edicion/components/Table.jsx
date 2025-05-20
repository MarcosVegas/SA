import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { requestUpdate } from "../../../core/services/requestUpdate"; // Importar la función requestUpdate
import { requestUpdateMascotas } from "../../../core/services/requestUpdateMascotas"; // Importar la función requestUpdateMascotas
import { requestUpdatePagoAsesor } from "../../../core/services/requestUpdatePagoAsesor"; // Importar la función requestUpdateMascotas

// Removed unused import
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
        EmpresaColectiva: data.Asegurado.EmpresaColectiva || "", // Nuevo campo
        CargoColectiva: data.Asegurado.CargoColectiva || ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [selectedMascotaIndex, setSelectedMascotaIndex] = useState(null);
    const [selectedPagoAsesorIndex, setSelectedPagoAsesorIndex] = useState(null);
    const [loading, setLoading] = useState(false);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();



    const checkAndUpdateMascotaAge = () => {
        const formatSharePointDate = (dateString) => {
            if (!dateString) return "";
            const [datePart] = dateString.split(" "); // Separate date and time
            const parts = datePart.split("/");
            if (parts.length === 3) {
                const [day, month, year] = parts;
                return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
            }
            return dateString; // Return original if format is unexpected
        };
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


    const razasPerros = ["Afgano", "Airedale Terrier", "Akita", "Akita Americano", "Alaskan Malamute", "American Bully", "American Pitt Bull Terrier", "American Staffordshire Terrier", "American Water Spaniel", "Antiguo Pastor Inglés", "Australian Labradoodle", "Barzoi", "Basenji", "Basset Azul de Gaseogne", "Basset Hound", "Basset leonado de Bretaña", "Beagle", "Bearded Collie", "Beauceron", "Berger Blanc Suisse", "Bernés Boyero de Montaña", "Bichón Frisé", "Bichón Habanero", "Bichón Maltés", "Bloodhound", "Bobtail", "Border Collie", "Border Terrier", "Borzoi", "Boston Terrier", "Boxer", "Boyero Australiano", "Boyero de Flandes", "Braco Alemán", "Braco de Weimar", "Braco Húngaro", "Brazilian Shorthair", "Briard", "Bull Terrier", "Bulldog Americano", "Bulldog Francés", "Bulldog Inglés", "Bullmastiff", "Ca de Bou", "Ca mè mallorquí", "Cane Corso", "Caniche", "Cavalier King Charles Spaniel", "Chien de Saint Hubert", "Chihuahua", "Chino Crestado", "Chow Chow", "Cirneco del Etna", "Cockapoo", "Cocker Spaniel Americano", "Cocker Spaniel Inglés", "Collie", "Corgi", "Corgi galés", "Coton de Tuléar", "Criollo", "Dachshund", "Dálmata", "Deutsch Drahthaar", "Deutsch Kurzhaar", "Dobermann", "Dogo Alemán", "Dogo Argentino", "Dogo Canario", "Dogo de Burdeos", "Drahthaar", "English Springer Spaniel", "Epagneul Bretón", "Eurasier", "Fila Brasileiro", "Fox Terrier", "Foxhound Americano", "Foxhound Inglés", "French poodle o caniche", "Galgo Afgano", "Galgo Español", "Galgo Italiano", "Galgo Ruso", "Gigante de los Pirineos", "Golden Retriever", "Goldendoodle", "Gos d'Atura", "Gran Danés", "Gran Perro Japonés", "Grifón de Bruselas", "Husky Siberiano", "Irish Wolfhound", "Jack Russel", "Japanes Chin", "Kelpie", "Kelpie Australiano", "Kerry Blue", "Komondor", "Kuvasz", "Labradoodle", "Labrador Retriever", "Laika de Siberia Occidental", "Laika Ruso-europeo", "Lebrel ruso", "Leonberger", "Lhasa Apso", "Magyar Vizsla", "Maltés", "Maltipoo", "Mastín del Alentejo", "Mastín del Pirineo", "Mastin del Tibet", "Mastín Español", "Mastín Napolitano", "Mucuchies", "Norfolk Terrier", "Otro", "Ovtcharka", "Pachón Navarro", "Parson Russell Terrier", "Pastor Alemán", "Pastor americano miniatura", "Pastor Australiano", "Pastor Australiano Ganadero", "Pastor Australiano Ovejero", "Pastor Belga", "Pastor Blanco Suizo", "Pastor Collie", "Pastor de Beauce", "Pastor de Brie", "Pastor de los Pirineos", "Pastor de Shetland", "Pastor del Cáucaso", "Pastor Holandés", "Pastor Inglés", "Pekinés", "Perdiguero Burgos", "Perdiguero Chesapeake Bay", "Perdiguero de Drentse", "Perdiguero de Pelo lido", "Perdiguero de pelo rizado", "Perdiguero Portugués", "Perro Crestado Chino", "Perro de Aguas", "Perro sin pelo de Mexico", "Perro sin pelo del Perú", "Pinscher miniatura", "Pitbull", "Podenco Andaluz", "Podenco Ibicenco", "Podenco Portugués", "Pointer", "Pomerania", "Pomsky", "Poodle Mix", "Presa canario", "Presa Mallorquin", "Pug o Carlino", "Rafeiro do Alentejo", "Rhodesian Ridgeback", "Rottweiler", "Rough Collie", "Sabueso Español", "Sabueso Fino Colombiano", "Sabueso Hélenico", "Sabueso Italiano", "Sabueso Suizo", "Saint Hubert", "Saluki", "Samoyedo", "San Bernardo", "Schnauzer", "Schnoodle", "Scottish Terrier", "Sealyhalm Terrier", "Setter Gordon", "Setter Irlandés", "Shar Pei", "Shiba", "Shiba Inu", "Shih Tzu", "Siberian Husky", "Smooth Collie", "Spaniel Japonés", "Spinone Italiano", "Spitz Alemán", "Springer Spaniel Inglés", "Staffordshire Bull Terrier", "Teckel", "Teckel o Dachshund", "Terranova", "Terrier Australiano", "Terrier Escocés", "Terrier Irlandés", "Terrier Japonés", "Terrier Negro Ruso", "Terrier Norfolk", "Terrier Ruso", "Tibetan Terrier", "Tosa Japonés", "Vizsla", "Weimaraner", "Welhs Terrier", "West Highland Terrier", "Wolfspitz", "Xoloitzquintle", "Yorkshire Terrier"];
    const razasGatos = ["Abisinio", "Africano doméstico", "Angora turco", "Azul ruso", "Balinés", "Bambino", "Bengalí", "Birmano", "Bombay", "Bosque de Noruega", "Brivon de pelo corto", "Brivon de pelo largo", "Burmés", "Burmilla", "California Spangled", "Chartreux", "Cornish rex", "Criollo", "Curl Americano", "Cymric", "Devon rex", "Don Sphynx", "Dorado africano", "Dragon Li", "Esfinge o Sphynx", "Exótico de pelo corto", "Fold Escocés", "FoldEx", "Gato Carey", "Gato común europeo", "Gato europeo bicolor", "Gato rojo", "German Rex", "Habana brown", "Himalayo", "Khao Manee", "Kohana", "Korat", "Maine Coon", "Manx", "Mau egipcio", "Munchkin", "Ocicat", "Oriental", "Oriental de pelo largo", "Pelo de alambre americano", "Pelocorto americano", "Pelocorto brasilero", "Pelocorto británico", "Pelolargo británico", "Persa", "Peterbald", "Pixie Bob", "Rabicorto Bobtail japonés", "Ragdoll", "Sagrado de Birmania", "Savannah", "Selkirk rex", "Serengeti", "Seychellois", "Siamés", "Siberiano", "Snowshoe", "Somalí", "Tabby", "Tonkinés", "Toyger", "Van Turco"];

    const toggleSection = (section) => {
        setShowInfo((prev) => {
            const newState = { poliza: false, mascotas: false, pagoAsesor: false };
            newState[section] = !prev[section]; // Alternar solo el acordeón seleccionado
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

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };


    const handleProductoChange = (e) => {
        setProductoSeleccionado(e.target.value);
    };

    const guardarMascotaEditada = (index) => {
        const mascotaEditada = mascotasData[index];
        console.log("Mascota actualizada:", mascotaEditada);

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
        console.log("Pago Asesor actualizado:", pagoConMascota);
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
                        FechaNacimiento: mascota.FechaNacimiento || "",
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
            // Filtrar campos vacíos o con valor 0
            const data = {
                pagoAsesor: Object.fromEntries(
                    Object.entries({
                        ...pagoAsesor,
                        Rc: pagoAsesor.Rc || "",
                        BolsaAseguradaRc: parseInt(pagoAsesor.BolsaAseguradaRc, 10) || 0,
                        SaldoRc: parseInt(pagoAsesor.SaldoRc, 10) || 0,
                        CodAsesor: pagoAsesor.CodAsesor,
                        ValorDePrimaMensualSinIva: parseInt(pagoAsesor.ValorDePrimaMensualSinIva, 10) || 0,
                        ValorDePrimaAnualSinIva: parseInt(pagoAsesor.ValorDePrimaAnualSinIva, 10) || 0,
                        ValorDePrimaMensualConIva: parseInt(pagoAsesor.ValorDePrimaMensualConIva, 10) || 0,
                        ValorDePrimaAnualConIva: parseInt(pagoAsesor.ValorDePrimaAnualConIva, 10) || 0,
                        FechaCancelacion: pagoAsesor.FechaCancelacion,
                        MotivoCancelacion: pagoAsesor.MotivoCancelacion,
                        NombreAsesor: pagoAsesor.NombreAsesor,
                        Modificaciones: pagoAsesor.Modificaciones,
                        InicioVigenciaOriginal: pagoAsesor.InicioVigenciaOriginal,
                        FechaExpedicionPoliza: pagoAsesor.FechaExpedicionPoliza,
                        BolsaAseguradaServiciosVeterinarios: parseInt(pagoAsesor.BolsaAseguradaServiciosVeterinarios, 10) || 0, 
                        FechaUltimoRecibo: pagoAsesor.FechaUltimoRecibo,
                    }).filter(([_, value]) => value !== "" && value !== 0) // Filtrar valores vacíos o 0
                ),
            };

            console.log("JSON enviado a Power Automate:", data); // Verificar el JSON
            const response = await requestUpdatePagoAsesor(data);

            if (!response) throw new Error("No se recibió respuesta de la API.");

            Swal.fire({
                icon: "success",
                title: "Información plan actualizada"
            });
        } catch (error) {
            console.error("Error al enviar pago:", error);
            Swal.fire({
                icon: "error",
                title: "Error al enviar pago"
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
    console.log(data.Asegurado.Mascotas);
    console.log("Datos iniciales de mascotas:", data.Asegurado.Mascotas);
    console.log("mascota:", mascotasData);
    return (
        <div className="space-y-4 mx-30 py-20">
            <h2 className="text-[#2D6DF6] font-bold text-[18px]">Resultados de búsqueda</h2>
            <p><strong>Cédula:</strong> {aseguradoData.NumeroIdAsegurado}</p>
            <div className="border-1 border-[#81B1FF] rounded-[24px] bg-white py-4 px-6">

                {/* Información del asegurado */}
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
                                {/* Botón editar en la esquina superior derecha */}
                                <div className="absolute top-4 right-4">
                                    <button
                                        className="bg-[#F8F8F8] p-3 rounded-[28px] flex items-center justify-center"
                                        onClick={() => setEditable(!editable)}
                                    >
                                        <CiEdit className="text-[#888B8D] w-6 h-6" />
                                    </button>
                                </div>

                                {/* Contenido del asegurado en dos columnas */}
                                <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-10">
                                    {Object.entries(aseguradoData).map(
                                        ([key, value]) =>
                                            key !== "InicioDeVigencia" &&
                                            key !== "FinDeVigencia" && (
                                                <div key={key} className="flex flex-col">
            <span className="font-bold text-[#0033A0] mb-1">
                {key.replace(/([A-Z])/g, " $1")}:
            </span>
            {key === "SexoAsegurado" ? (
                 editable ? (
                    <select
                        value={value}
                        onChange={(e) => handleAseguradoChange(e, key)}
                        className="border rounded-[20px] px-4 py-2 h-12 transition-all duration-200 bg-white text-black"
                    >
                        <option value="">Selecciona una opcion</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
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
                        <option value="">Selecciona una opcion</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="P">Pasaporte</option>
                        <option value="NIT">NIT</option>
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
                        <option value="">Selecciona una opcion</option>
                        <option value="Anual">Anual</option>
                        <option value="Mensual">Mensual</option>
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
                        <option value="">Selecciona una opcion</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
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
                        <option value="">Selecciona una opcion</option>
                        <option value="Ahorros">Ahorros</option>
                        <option value="Corriente">Corriente</option>
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

                                {/* Botón Guardar justo debajo de los campos */}
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
                {/* Información de la mascota */}
                <div className={'mt-5'}>
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("mascotas")}
                    >
                        <h2 className="text-[16px] font-bold text-[#0033A0]">
                            Información de la(s) mascota(s)
                        </h2>
                        <FaChevronDown
                            className={`transition-transform text-[#0033A0] h-9 w-9 ${showInfo.mascotas ? "rotate-180" : ""}`}
                        />
                    </div>

                    {showInfo.mascotas && (
        <>
            {/* Contenedor con scroll horizontal */}
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
                                    const producto = pagoAsesorData[index]?.Producto || "Salud para gatos"; // Valor predeterminado
                                    if (producto === "Salud para perros" || producto === "Salud para gatos") {
                                        setSelectedMascotaIndex(index); // Habilitar edición
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
                                                                disabled={selectedMascotaIndex !== index} // Solo editable si está seleccionada
                                                                className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                    selectedMascotaIndex === index
                                                                        ? "bg-white text-black"
                                                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                } w-full max-w-md h-12`}
                                                            >
                                                                <option value="">Selecciona una opcion</option>
                                                                <option value="Hembra">Hembra</option>
                                                                <option value="Macho">Macho</option>
                                                            </select>
                                                        ) : (
                                                            <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                {mascotasData[index]?.Sexo}
                                                            </span>
                                                        )
                                                    ) : key === "Edad" ? (
                                                        selectedMascotaIndex === index ? (
                                                            <select
                                                                value={value || ""}
                                                                onChange={(e) => handleMascotaChange(e, index, key)}
                                                                disabled={selectedMascotaIndex !== index} // Solo editable si está seleccionada
                                                                className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${selectedMascotaIndex === index
                                                                    ? "bg-white text-black"
                                                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                    } w-full max-w-md h-12 `}
                                                            >
                                                                <option value="">Selecciona una opcion</option>
                                                                <option value="De 4 meses a 1 año">De 4 meses a 1 año</option>
                                                                <option value="1 años">1 año</option>
                                                                <option value="2 años">2 años</option>
                                                                <option value="3 años">3 años</option>
                                                                <option value="4 años">4 años</option>
                                                                <option value="5 años">5 años</option>
                                                                <option value="6 años">6 años</option>
                                                                <option value="7 años">7 años</option>
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
                                                            <option value="">Selecciona una opcion</option>
                                                            <option value="De 4 meses a 1 año">De 4 meses a 1 año</option>
                                                            <option value="1 año">1 año</option>
                                                            <option value="2 años">2 años</option>
                                                            <option value="3 años">3 años</option>
                                                            <option value="4 años">4 años</option>
                                                            <option value="5 años">5 años</option>
                                                            <option value="6 años">6 años</option>
                                                            <option value="7 años">7 años</option>
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
                                                                value={mascotasData[index]?.Raza || value} // Valor actual de la raza
                                                                onChange={(e) => handleMascotaChange(e, index, key)} // Actualiza el estado de mascotasData
                                                                className="border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 bg-white text-black w-full max-w-md h-12"
                                                            >
                                                                {pagoAsesorData[index]?.Producto === "Salud para perros" // Verifica el producto en pagoAsesorData
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
                                                                value={mascotasData[index]?.Raza || value} // Valor actual de la raza
                                                                readOnly
                                                                className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 cursor-not-allowed w-full max-w-md h-12"
                                                            />
                                                        )
                                                    ) : key === "FechaNacimiento" ? (
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
                                                                            return ""; // Si la fecha no es válida, retorna un valor vacío
                                                                        } catch (error) {
                                                                            console.error("Error al formatear FechaCancelacion:", error);
                                                                            return ""; // Manejo de errores
                                                                        }
                                                                    })()
                                                                    : ""
                                                            }
                                                            onChange={(e) => handleMascotaChange(e, index, key)}
                                                            disabled={selectedMascotaIndex !== index} // Solo editable si está seleccionada
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
                                                            disabled={selectedMascotaIndex !== index} // Solo editable si está seleccionada
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

                {/* Información de pago y asesor */}
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
            {/* Contenedor con scroll horizontal */}
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
                                                        {key.replace(/([A-Z])/g, " $1")}:
                                                    </span>
                                                    {
                                                    key === "MotivoCancelacion" ? (
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
                                                                <option value="">Selecciona una opcion</option>
                                                                <option value="Mora">Mora</option>
                                                                <option value="Fallecimiento">Fallecimiento</option>
                                                                <option value="Solicitud del cliente">Solicitud del cliente</option>
                                                                <option value="Reticencia">Reticencia</option>
                                                                <option value="Motivo empleador">Motivo empleador</option>
                                                                <option value="Otro">Otro</option>
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
                                                                    {key === "Estado" && (
                                                                        <>
                                                                            <option value="">Selecciona una opción</option>
                                                                            <option value="Vigente">Vigente</option>
                                                                            <option value="Cancelada">Cancelada</option>
                                                                            <option value="Suspendida">Suspendida</option>
                                                                            <option value="En Carencia">En Carencia</option>
                                                                        </>
                                                                    )}
                                                                    {key === "Plan" && (
                                                                        <>
                                                                            <option value="">Selecciona una opción</option>
                                                                            <option value="Clásico">Clásico</option>
                                                                            <option value="Global">Global</option>
                                                                            <option value="Esencial">Esencial</option>
                                                                        </>
                                                                    )}
                                                                </select>
                                                            ) : (
                                                                <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                    {value || "No disponible"}
                                                                </span>
                                                            )
                                                    
                                                    
                                                ) : key === "Producto" ? (
                                                        selectedPagoAsesorIndex === index ? (
                                                            <select
                                                                value={pagoAsesorData[index]?.Producto || "SaludPerros"} // Valor predeterminado "SaludPerros"
                                                                onChange={(e) => handlePagoAsesorChange(e, index, key)} // Actualiza el estado al cambiar
                                                                className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 bg-white text-black w-full max-w-md h-12`}
                                                            >
                                                                <option value="">Selecciona una opción</option>
                                                                <option value="Salud para perros">Salud para perros</option>
                                                                <option value="Salud para gatos">Salud para gatos</option>
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
                                                                disabled={selectedPagoAsesorIndex !== index} // Solo editable si está seleccionado
                                                                className={`border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 ${
                                                                    selectedPagoAsesorIndex === index
                                                                        ? "bg-white text-black"
                                                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                                } w-full max-w-md h-12`}
                                                            >
                                                                <option value="">Selecciona una opción</option>
                                                                <option value="Sí">Sí</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                        ) : (
                                                            <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 w-full max-w-md h-12 flex items-center">
                                                                {pagoAsesorData[index]?.Rc || ""}
                                                            </span>
                                                        )
                                                    ) : key === "SaldoGastosVeterinario" ? (
                                                        selectedPagoAsesorIndex === index ? (
                                                            <input
                                                                type="number"
                                                                value={pagoAsesorData[index]?.SaldoGastosVeterinario || 0}
                                                                onChange={(e) => handlePagoAsesorChange(e, index, "SaldoGastosVeterinario")}
                                                                className="border p-2 rounded-[20px] px-6 ml-3 transition-all duration-200 bg-white text-black w-full max-w-md h-12"
                                                            />
                                                        ) : (
                                                            <span className="border p-2 rounded-[20px] px-6 ml-3 bg-gray-300 text-gray-600 cursor-not-allowed w-full max-w-md h-12 flex items-center">
                                                                {pagoAsesorData[index]?.SaldoGastosVeterinario || 0}
                                                            </span>
                                                        )
                                                    ) : key === "InicioDeVigencia" ? (
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
                                                                            return ""; // Si la fecha no es válida, retorna un valor vacío
                                                                        } catch (error) {
                                                                            console.error("Error al formatear InicioDeVigencia:", error);
                                                                            return ""; // Manejo de errores
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
                                                    ) : key === "FinDeVigencia" ? (
                                                        <input
                                                            type="datetime-local"
                                                            value={
                                                                value
                                                                    ? new Date(value).toISOString().slice(0, 16) // Formato correcto para FinDeVigencia
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
                                                                    ? new Date(value).toISOString().slice(0, 16) // Formato para el campo datetime-local
                                                                    : ""
                                                            }
                                                            onChange={(e) => {
                                                                const newValue = e.target.value; // Valor del calendario
                                                                const formattedValue = `${newValue}:00Z`; // Agregar :00Z al final
                                                                handlePagoAsesorChange({ target: { value: formattedValue } }, index, key);
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
                                                                            return ""; // Si la fecha no es válida, retorna un valor vacío
                                                                        } catch (error) {
                                                                            console.error("Error al formatear InicioDeVigencia:", error);
                                                                            return ""; // Manejo de errores
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
                                                                    ? new Date(value).toISOString().slice(0, 16) // Formato correcto para FinDeVigencia
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
            </div>
        </div>
    );
}
