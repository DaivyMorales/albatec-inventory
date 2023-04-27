import { useEffect } from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

interface MyProps {
  tableId: string;
}

export default function ExportButton({ tableId }: MyProps) {
  const handleDownload = () => {
    const wb = XLSX.utils.table_to_book(document.querySelector(`#${tableId}`), {
      sheet: "Sheet 1",
    });
    XLSX.writeFile(wb, "data.xlsx");
  };

  useEffect(() => {
    const button: null | any = document.querySelector("#export-button");

    button.addEventListener("click", handleDownload);

    return () => {
      button.removeEventListener("click", handleDownload);
    };
  }, []);

  return (
    <div
      id="export-button"
      className=" cursor-pointer flex justify-center items-center gap-x-1 text-xs font-normal px-3 py-2 rounded-md shadow-lg border-2 border-gray-700 hover:bg-gray-700"
    >
      Exportar
      <SiMicrosoftexcel color="whites" />
    </div>
  );
}
