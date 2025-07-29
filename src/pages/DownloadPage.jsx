import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { requestDate } from "../core/services/requestDate.js";
import { useState } from "react";
import { convertirAExcel } from "../shared/utils/index.js";
import { subDays, startOfMonth, endOfMonth } from "date-fns";
import { createStaticRanges } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import NoDataModal from "../core/components/NoDataModal.jsx";
import FullDBModal from "../core/components/FullDBModal.jsx";
import DownloadControls from "../core/components/DownloadControls.jsx";

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

  const formatDateToOData = (date, isEndDate = false) => {
    const adjustedDate = new Date(date.getTime()); 
    if (isEndDate) {
      adjustedDate.setDate(adjustedDate.getDate() + 2);
    } else {
      adjustedDate.setDate(adjustedDate.getDate() + 1);
    }
    return `${adjustedDate.toISOString().split("T")[0]}T00:00:00Z`;
  };

  const handleDownload = async () => {
    const startDate = formatDateToOData(dateRange[0].startDate);
    const endDate = formatDateToOData(dateRange[0].endDate, true);

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

        .rdrMonthAndYearWrapper select option {
          background-color: white !important;
          color: black !important;
          text-transform: capitalize;
        }
      `}
    </style>

      {showNoDataModal && (
        <NoDataModal onClose={() => setShowNoDataModal(false)} />
      )}

      {/* Modal: Datos completos */}
      {showFullDBModal && (
        <FullDBModal
          onClose={() => setShowFullDBModal(false)}
          onDownload={async () => {
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
          loading={loading}
        />
      )}

      <button onClick={handleMenuPage} className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer">
        <CiLogout className="w-6 h-6" /> Salir
      </button>

      <h1 className="text-3xl text-[#0033A0] font-bold mt-5">Descarga de la Base de datos</h1>
      <p className="text-[16px] mt-5">Para iniciar, seleccione los datos para descarga</p>

      <DownloadControls
        dateRange={dateRange}
        setDateRange={setDateRange}
        customStaticRanges={customStaticRanges}
        loading={loading}
        handleDownload={handleDownload}
      />
    </div>
  );
}
