import React from "react";

export function DataTable({ jsonData }) {
    if (!jsonData || jsonData.length === 0) return null;
    return (
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
                                <th className="border border-gray-300 px-4 py-2">IncluyeRc</th>
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
                                <th className="border border-gray-300 px-4 py-2">Fecha Último Recibo</th>
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
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["IncluyeRc"] || item.IncluyeRc}</td>
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
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Prima Mensual Sin IVA"] || item.PrimaMensualSinIVA }</td>
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
                                 <td className="border border-gray-300 px-4 py-2 text-center">{item["Fecha Último Recibo"] || item.FechaUltimoRecibo}</td>
                             </tr>
                            ))}
                            </tbody>
                        </table>
        </div>
    );
}
