import AvisoIcon from "../../assets/aviso.png";

export default function FullDBModal({ onClose, onDownload, loading }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
    >
      <div
        className="bg-white rounded-2xl p-8 w-[380px] text-center"
        style={{ boxShadow: "0px 0px 30px 0px rgba(0, 51, 160, 0.2)" }}
      >
        <img
          src={AvisoIcon}
          alt="Ícono de advertencia"
          className="mx-auto mb-4 w-12 h-12"
        />
        <h2 className="text-xl font-bold text-[#0033A0] mb-3">Ten presente:</h2>
        <p className="text-gray-700 mb-6">
          Elegiste una descarga anual. Este proceso puede tardar un poco.
        </p>
        <button
          onClick={onDownload}
          className="bg-[#2563EB] text-white px-6 py-2 rounded-full hover:bg-[#0033A0]"
          disabled={loading}
        >
          {loading ? "Descargando..." : "Cerrar"}
        </button>
      </div>
    </div>
  );
}
