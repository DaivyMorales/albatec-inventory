import { FaProductHunt } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { productContext } from "@/context/ProductContextProvider";

interface IInventory {
  Codigo: number;
  Descripcion: string;
  Lote: string;
  Almacen: number;
  Cantidad: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface MyProps {
  inventory: IInventory;
}

export default function InventoryCard({ inventory }: MyProps) {
  const { fieldOn, setFieldOn, products, columnOn } =
    useContext(productContext);

  const [presentacionLoad, setPresentacionLoad] = useState({
    Presentacion: 0,
  });

  useEffect(() => {
    products.filter((product) => {
      product.Codigo === inventory.Codigo
        ? setPresentacionLoad({
            Presentacion: product.Presentacion,
          })
        : "";
    });
  }, []);

  return (
    <>
      <tr
        className={`text-2xs border-b border-gray-700 text-gray-300 font-normal ${
          fieldOn === inventory._id ? "bg-gray-900" : ""
        } hover:bg-gray-900 ${columnOn ? "text-gray-600" : ""}`}
        onClick={() => setFieldOn(inventory._id)}
      >
        <th
          scope="row"
          className="px-3 py-1  "
          onClick={() => setFieldOn(inventory._id)}
        >
          {inventory.Codigo}
        </th>
        <td
          className={`px-3 py-1  flex justify-start items-center gap-x-1 ${
            columnOn ? "text-gray-600" : "text-white"
          }`}
          onClick={() => setFieldOn(inventory._id)}
        >
          {inventory.Descripcion}
          <FaProductHunt
            size={10}
            className={`${columnOn ? "text-gray-600" : "text-blue-500"}`}
          />
        </td>
        <td className="px-3 py-1" onClick={() => setFieldOn(inventory._id)}>
          {presentacionLoad.Presentacion}
        </td>
        <td className="px-1  py-1" onClick={() => setFieldOn(inventory._id)}>
          {inventory.Lote}
        </td>
        <td className="px-3 py-1" onClick={() => setFieldOn(inventory._id)}>
          {inventory.Almacen}
        </td>
        <td className="px-3 py-1" onClick={() => setFieldOn(inventory._id)}>
          {inventory.Cantidad}
        </td>
      </tr>
    </>
  );
}
