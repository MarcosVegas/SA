import GloboIcon from "../../assets/Globo.png";

export default function NoDataModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[400px] text-center">
        <img
          src={GloboIcon}
          alt="Ícono de advertencia"
          className="mx-auto mb-4 w-12 h-12"
        />
        <h2 className="text-xl font-bold text-[#0033A0] mb-2">Lo sentimos:</h2>
        <p className="text-gray-700 mb-4">
          Para las fechas seleccionadas no hay datos disponibles.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
