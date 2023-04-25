import React, { useState } from "react";
import * as xslx from "xlsx";
import axios from "axios";
import InventoryCard from "@/components/inventory/InventoryCard";
import { RiFileExcel2Fill } from "react-icons/ri";

interface IData {
  CANTIDAD: number;
  LOTE: string;
  NOMBRE: string;
  PRODUCTO: string;
}

interface IInventory {
  Codigo: string;
  Descripcion: string;
  Lote: string;
  Almacen: number;
  Cantidad: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export default function index() {
  const [inventoryContent, setInventoryContent] = useState<IInventory[]>([]);
  console.log(inventoryContent);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async (event) => {
      if (!event.target) return;
      const fileBuffer = event.target.result as ArrayBuffer;
      const workbook = xslx.read(fileBuffer, { type: "array" });
      const worksheet = workbook.Sheets["Hoja1"];
      const dataExcel: Array<IData> = xslx.utils.sheet_to_json(worksheet);
      try {
        const response = await axios.post("http://localhost:3000/api/inventory", dataExcel);
        setInventoryContent(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fileReader.onerror = (event) => {
      console.error("Error reading file:", event);
    };
  };
  return (
    <div className="flex   justify-center items-center">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div>
          <label className="buttonExcel">
            <RiFileExcel2Fill />
            Importar Excel
            <input
              className="hidden"
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
            />
          </label>
        </div>
        <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Codigo
              </th>
              <th scope="col" className="px-6 py-3">
                Descripcion
              </th>
              <th scope="col" className="px-6 py-3">
                Lote
              </th>
              <th scope="col" className="px-6 py-3">
                Almacen
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad
              </th>
            </tr>
          </thead>
          <tbody>
            {inventoryContent.map((inventory) => (
              <InventoryCard inventory={inventory} key={inventory._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
