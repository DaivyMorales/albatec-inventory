import React, { useState, useEffect } from "react";
import * as xslx from "xlsx";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { RiFileExcel2Fill } from "react-icons/ri";
import CardInventory from "../components/inventory/CardInventory";

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

interface MyProps {
  data: IInventory[];
}

export default function index({ data }: MyProps) {
  const [inventoryContent, setInventoryContent] = useState<IInventory[]>([]);

  useEffect(() => {
    setInventoryContent(data);
  }, []);

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
        const response = await axios.post("/api/inventory", dataExcel);
        setInventoryContent(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fileReader.onerror = (event) => {
      console.error("Error reading file:", event);
    };
  };

  const deleteAllInventory = async () => {
    try {
      await axios.delete("/api/inventory");
      setInventoryContent([]);
    } catch (error) {
      console.log(error);
    }
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

          <button
            className="bg-red-500"
            onClick={() => {
              deleteAllInventory();
              setInventoryContent([]);
            }}
          >
            Eliminar
          </button>
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
              <CardInventory inventory={inventory} key={inventory._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch("https://albatec-inventory.vercel.app/api/inventory");
  const data = await res.json();

  return {
    props: { data },
  };
}
