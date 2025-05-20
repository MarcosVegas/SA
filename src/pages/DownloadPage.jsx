import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { requestDate } from "../core/services/requestDate.js";
import { useState } from "react";
import { convertirAExcel } from "../shared/utils/index.js";
import { DateRangePicker } from "react-date-range";
import { subDays, startOfMonth, endOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { createStaticRanges } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import GloboIcon from "../assets/Globo.png";
import AvisoIcon from "../assets/aviso.png";

const customStaticRanges = createStaticRanges([
  {
    label: "Datos completos",
    range: () => ({
      startDate: new Date(2023, 0, 1),
      endDate: new Date(),
    }),
  },
  {
    label: "Hoy",
    range: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
  },
  {
    label: "Ayer",
    range: () => {
      const date = subDays(new Date(), 1);
      return { startDate: date, endDate: date };
    },
  },
  {
    label: "Últimos 7 días",
    range: () => ({
      startDate: subDays(new Date(), 6),
      endDate: new Date(),
    }),
  },
  {
    label: "Últimos 15 días",
    range: () => ({
      startDate: subDays(new Date(), 14),
      endDate: new Date(),
    }),
  },
  {
    label: "Últimos 30 días",
    range: () => ({
      startDate: subDays(new Date(), 29),
      endDate: new Date(),
    }),
  },
  {
    label: "Este mes",
    range: () => ({
      startDate: startOfMonth(new Date()),
      endDate: new Date(),
    }),
  },
  {
    label: "Mes pasado",
    range: () => {
      const now = new Date();
      const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return {
        startDate: startOfMonth(prevMonth),
        endDate: endOfMonth(prevMonth),
      };
    },
  },
]);

export function DownloadPage() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(2023, 0, 1),
      endDate: new Date(),
      key: "selection"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [showNoDataModal, setShowNoDataModal] = useState(false);
  const [showFullDBModal, setShowFullDBModal] = useState(false);

  const handleMenuPage = () => navigate("/");

  const formatDateToOData = (date) => `${date.toISOString().split("T")[0]}T00:00:00Z`;

  const handleDownload = async () => {
    const startDate = formatDateToOData(dateRange[0].startDate);
    const endDate = formatDateToOData(dateRange[0].endDate);

    // Detectar si es "Datos completos"
    const isFullDB =
      dateRange[0].startDate.getTime() === new Date(2023, 0, 1).getTime() &&
      dateRange[0].endDate.toDateString() === new Date().toDateString();

    if (isFullDB) {
      setShowFullDBModal(true);
      return;
    }

    setLoading(true);
    try {
      const response = await requestDate({ startDate, endDate });
      const data = response?.data ?? response;

      if (!Array.isArray(data) || data.length === 0) {
        setShowNoDataModal(true);
        return;
      }

      convertirAExcel(data);
    } catch (error) {
      console.error("Error al descargar los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 relative">
      <style>
      {`
        .rdrDateDisplayWrapper {
          display: none !important;
        }

        .rdrMonthAndYearWrapper {
          background-color: #2563eb !important;
          color: white !important;
          border-radius: 12px;
          padding: 6px 12px;
          margin-bottom: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s ease;
        }

        .rdrMonthAndYearWrapper:hover {
          background-color: #0033a0 !important;
        }

        .rdrMonthAndYearWrapper select {
          background-color: #2563eb !important;
          color: white !important;
          font-weight: bold;
          font-size: 16px;
          border: none;
          outline: none;
          cursor: pointer;
          text-transform: capitalize;
        }

        /* ✅ ESTO controla el menú desplegable cuando lo abres */
        .rdrMonthAndYearWrapper select option {
          background-color: white !important;
          color: black !important;
          text-transform: capitalize;
        }
      `}
    </style>



      {/* Modal: No hay datos */}
      {showNoDataModal && (
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
              onClick={() => setShowNoDataModal(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Modal: Datos completos */}
      {showFullDBModal && (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
    >
      <div
        className="bg-white rounded-2xl p-8 w-[380px] text-center"
        style={{
          boxShadow: "0px 0px 30px 0px rgba(0, 51, 160, 0.2)"
        }}
      > <img
      src={AvisoIcon}
      alt="Ícono de advertencia"
      className="mx-auto mb-4 w-12 h-12"
    />
        <h2 className="text-xl font-bold text-[#0033A0] mb-3">Ten presente:</h2>
        <p className="text-gray-700 mb-6">
          Elegiste una descarga anual. Este proceso puede tardar un poco.
        </p>
        <button
          onClick={async () => {
            setShowFullDBModal(false);
            setLoading(true);
            try {
              const startDate = formatDateToOData(new Date(2023, 0, 1));
              const endDate = formatDateToOData(new Date());
              const response = await requestDate({ startDate, endDate });
              const data = response?.data ?? response;

              if (!Array.isArray(data) || data.length === 0) {
                setShowNoDataModal(true);
                return;
              }

              convertirAExcel(data);
            } catch (error) {
              console.error("Error al descargar la base completa:", error);
            } finally {
              setLoading(false);
            }
          }}
          className="bg-[#2563EB] text-white px-6 py-2 rounded-full hover:bg-[#0033A0]"
        >
          Cerrar
        </button>
      </div>
    </div>
  )}


      <button onClick={handleMenuPage} className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer">
        <CiLogout className="w-6 h-6" /> Salir
      </button>

      <h1 className="text-3xl text-[#0033A0] font-bold mt-5">Descarga de la Base de datos</h1>
      <p className="text-[16px] mt-5">Para iniciar, seleccione los datos para descarga</p>

      <div className="flex flex-col mt-10 gap-4">
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-[300px]">
            <label className="text-sm font-medium text-blue-700 mb-1">Desde</label>
            <input
              type="text"
              value={dateRange[0].startDate.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
              readOnly
              className="p-2 border-2 border-blue-500 rounded-md bg-white shadow-sm text-center font-medium"
            />
          </div>
          <div className="flex flex-col w-[300px]">
            <label className="text-sm font-medium text-blue-700 mb-1">Hasta</label>
            <input
              type="text"
              value={dateRange[0].endDate.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
              readOnly
              className="p-2 border-2 border-blue-500 rounded-md bg-white shadow-sm text-center font-medium"
            />
          </div>
        </div>

        <DateRangePicker
          ranges={dateRange}
          onChange={(item) => setDateRange([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          direction="horizontal"
          locale={es}
          staticRanges={customStaticRanges}
          inputRanges={[]}
          minDate={new Date(2023, 0, 1)}
          maxDate={new Date()}
          rangeColors={["#2563eb"]}
          editableDateInputs={false}
        />

        <button
          disabled={loading}
          className="bg-blue-500 flex items-center justify-center gap-5 text-white mt-5 p-2 w-[302px] h-[39px] rounded-[27px] cursor-pointer hover:bg-[#0033A0]"
          onClick={handleDownload}
        >
          {loading && (
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          Descargar ahora
        </button>
      </div>
    </div>
  );
}
