import { DateRangePicker } from "react-date-range";
import { es } from "date-fns/locale";

export default function DownloadControls({
  dateRange,
  setDateRange,
  customStaticRanges,
  loading,
  handleDownload
}) {
  return (
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
  );
}
