const SelectOptions = {
  Estado: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'Vigente', label: 'Vigente' },
    { value: 'Cancelado', label: 'Cancelado' },
    { value: 'Suspendido', label: 'Suspendido' },
    { value: 'En carencia', label: 'En carencia' },
  ],
  Plan: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'Clásico', label: 'Clásico' },
    { value: 'Global', label: 'Global' },
    { value: 'Esencial', label: 'Esencial' },
  ],
  Producto: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'SALUD PARA PERROS', label: 'SALUD PARA PERROS' },
    { value: 'SALUD PARA GATOS', label: 'SALUD PARA GATOS' },
  ],
  MotivoCancelacion: [
    { value: '', label: 'Selecciona una opcion' },
    { value: 'Mora', label: 'Mora' },
    { value: 'Fallecimiento', label: 'Fallecimiento' },
    { value: 'Solicitud del cliente', label: 'Solicitud del cliente' },
    { value: 'Reticencia', label: 'Reticencia' },
    { value: 'Motivo empleador', label: 'Motivo empleador' },
    { value: 'Otro', label: 'Otro' },
  ],
  IncluyeRc: [
    { value: 'False', label: 'No' },
    { value: 'True', label: 'Si' },
  ],
  Rc: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'True', label: 'Sí' },
    { value: 'False', label: 'No' },
  ],
  Edad: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'De 4 meses a 1 año', label: 'De 4 meses a 1 año' },
    { value: '1 año', label: '1 año' },
    { value: '2 años', label: '2 años' },
    { value: '3 años', label: '3 años' },
    { value: '4 años', label: '4 años' },
    { value: '5 años', label: '5 años' },
    { value: '6 años', label: '6 años' },
    { value: '7 años', label: '7 años' },
    { value: '8 años', label: '8 años' },
    { value: '9 años', label: '9 años' },
    { value: '10 años', label: '10 años' },
    { value: '11 años', label: '11 años' },
    { value: '12 años', label: '12 años' },
    { value: '13 años', label: '13 años' },
    { value: '14 años', label: '14 años' },
    { value: '15 años', label: '15 años' },
    { value: '16 años', label: '16 años' },
    { value: '17 años', label: '17 años' },
    { value: '18 años', label: '18 años' },
    { value: '19 años', label: '19 años' },
    { value: '20 años', label: '20 años' },
  ],
  Sexo: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'Macho', label: 'Macho' },
    { value: 'Hembra', label: 'Hembra' },
  ],
  EdadDeIngresoMascota:[
    { value: '', label: 'Selecciona una opción' },
    { value: 'De 4 meses a 1 año', label: 'De 4 meses a 1 año' },
    { value: '1 año', label: '1 año' },
    { value: '2 años', label: '2 años' },
    { value: '3 años', label: '3 años' },
    { value: '4 años', label: '4 años' },
    { value: '5 años', label: '5 años' },
    { value: '6 años', label: '6 años' },
    { value: '7 años', label: '7 años' },
  ],
  SexoAsegurado: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Femenino', label: 'Femenino' },
    { value: 'Otro', label: 'Otro' },
  ],
  TipoIdAsegurado: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'P', label: 'Pasaporte' },
    { value: 'NIT', label: 'NIT' },
  ],
  FormaDePago: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'Anual', label: 'Anual' },
    { value: 'Mensual', label: 'Mensual' },
  ],
  AutorizaDebitoAutomatico: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'True', label: 'Sí' },
    { value: 'False', label: 'No' },
  ],
  TipoDeCuenta: [
    { value: '', label: 'Selecciona una opción' },
    { value: 'Ahorros', label: 'Ahorros' },
    { value: 'Corriente', label: 'Corriente' },
  ],
};

export const EstadoOptions = SelectOptions.Estado;
export const PlanOptions = SelectOptions.Plan;
export const ProductoOptions = SelectOptions.Producto;
export const MotivoCancelacionOptions = SelectOptions.MotivoCancelacion;
export const IncluyeRcOptions = SelectOptions.IncluyeRc;
export const RcOptions = SelectOptions.Rc;
export const EdadOptions = SelectOptions.Edad;
export const SexoOptions = SelectOptions.Sexo;
export const EdadDeIngresoMascotaOptions = SelectOptions.EdadDeIngresoMascota;
export const SexoAseguradoOptions = SelectOptions.SexoAsegurado;
export const TipoIdAseguradoOptions = SelectOptions.TipoIdAsegurado;  
export const FormaDePagoOptions = SelectOptions.FormaDePago;
export const AutorizaDebitoAutomaticoOptions = SelectOptions.AutorizaDebitoAutomatico;
export const TipoDeCuentaOptions = SelectOptions.TipoDeCuenta;

export default SelectOptions;
