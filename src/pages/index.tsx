import React, { useState, useEffect, ChangeEvent } from "react";
import * as xslx from "xlsx";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { RiFileExcel2Fill } from "react-icons/ri";
import CardInventory from "../components/inventory/CardInventory";
import { useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { productContext } from "@/context/ProductContextProvider";
import { inventoryContext } from "@/context/InventoryContextProveider";
import { useFormik } from "formik";
import ExportButton from "@/components/xlsx/ExportButton";
import { useRouter } from "next/router";

interface IData {
  CANTIDAD: number;
  LOTE: string;
  NOMBRE: string;
  PRODUCTO: string;
}

interface IInventory {
  Codigo: number;
  Descripcion: string;
  Presentacion: number;
  Lote: string;
  Almacen: number;
  Cantidad: number;
  Conteo: number;
  Saldo: number;
  Formula: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IProduct {
  Codigo: number;
  Descripcion: string;
  Presentacion: number;
  _id: string;
  createdAt: string;
  updateAt: string;
}

interface MyProps {
  data1: IInventory[];
  data2: IProduct[];
}

export default function index({ data1, data2 }: MyProps) {
  const { inventoryContent, setInventoryContent, deleteAllInventory } =
    useContext(inventoryContext);

  const router = useRouter();

  const { setProducts } = useContext(productContext);

  useEffect(() => {
    setInventoryContent(data1);
    setProducts(data2);
  }, []);
  console.log(inventoryContent);

  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  const handleDescripcion = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    setSearchTerm(value);
  };

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

  return (
    <div className="flex justify-center items-center">
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <div className="flex justify-between items-center gap-x-2 p-5">
          <div className="flex justify-between items-center gap-x-2 ">
            {inventoryContent.length > 0 ? (
              <>
                <button
                  className="bg-red-500"
                  onClick={() => {
                    deleteAllInventory();
                    setInventoryContent([]);
                  }}
                >
                  Eliminar
                </button>

                <ExportButton tableId="my-table" />
              </>
            ) : (
              <label className="buttonExcel flex cursor-pointer gap-x-1 justify-center items-center hover:bg-blue-500">
                Importar Excel
                <input
                  className="hidden"
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileUpload}
                />
                <RiFileExcel2Fill />
              </label>
            )}
            <div className={`${inventoryContent.length > 0 ? "" : "hidden"}`}>
              <div className="flex gap-x-1 items-center justify-center  rounded-lg pl-2 py-1">
                <IoSearch />
                <input
                  type="text"
                  className="text-xs bg-[#1a1c1e] font-semibold  px-1 shadow-sm shadow-gray-900py-1 "
                  onChange={handleDescripcion}
                  placeholder="Ej: SULFATO FERROSO"
                  value={searchTerm.toUpperCase()}
                />
              </div>
            </div>
          </div>
          <a
            onClick={() => router.push("/product")}
            className="cursor-pointer hover:text-blue-400"
          >
            Ir a productos
          </a>
        </div>
        <table
          id="my-table"
          className={`${
            inventoryContent.length > 0 ? "" : "hidden"
          }  text-sm text-left text-blue-100 dark:text-blue-100`}
        >
          <thead className="text-2xs text-gray-400 uppercase border-b border-gray-700">
            <tr>
              <th scope="col" className="px-2">
                Codigo
              </th>
              <th scope="col" className="px-2">
                Descripcion
              </th>
              <th scope="col" className="px-2">
                Presentacion
              </th>
              <th scope="col" className="">
                Lote
              </th>
              <th scope="col" className="px-2">
                Almacen
              </th>
              <th scope="col" className="px-2">
                Cantidad
              </th>
              <th scope="col" className="px-2">
                Conteo
              </th>
              <th scope="col" className="px-2">
                Saldo
              </th>
              <th scope="col" className="px-2">
                Formula
              </th>
              <th scope="col" className="px-2">
                Total
              </th>
              <th scope="col" className="px-2">
                Diferencia
              </th>
            </tr>
          </thead>
          <tbody>
            {inventoryContent
              .filter((inventory) => {
                if (searchTerm == "") {
                  return inventory;
                } else if (
                  inventory.Descripcion &&
                  inventory.Descripcion.includes(searchTerm)
                ) {
                  return inventory;
                }
              })
              .map((inventory) => (
                <CardInventory inventory={inventory} key={inventory._id} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res1 = await fetch(
    "https://albatec-inventory.vercel.app/api/inventory"
  );
  const data1 = await res1.json();

  const res2 = await fetch("https://albatec-inventory.vercel.app/api/product");
  const data2 = await res2.json();

  return {
    props: { data1, data2 },
  };
}
