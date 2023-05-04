import { FaProductHunt } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { productContext } from "@/context/ProductContextProvider";
import { inventoryContext } from "@/context/InventoryContextProveider";

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

interface MyProps {
  inventory: IInventory;
}

export default function InventoryCard({ inventory }: MyProps) {
  const { fieldOn, setFieldOn, products, columnOn } =
    useContext(productContext);

  const { updateInventory } = useContext(inventoryContext);

  const [inventorySchema, setInventorySchema] = useState({
    Presentacion:
      inventory.Presentacion === undefined ? 0 : inventory.Presentacion,
    Conteo: inventory.Conteo === undefined ? 0 : inventory.Conteo,
    Saldo: inventory.Saldo === undefined ? 0 : inventory.Saldo,
    Formula: inventory.Formula === undefined ? 0 : inventory.Formula,
  });

  const formik = useFormik({
    initialValues: { inventorySchema },
    onSubmit: async (values, { resetForm }) => {
      console.log(values.inventorySchema);
      await updateInventory(inventory._id, values.inventorySchema);
      setInventorySchema(values.inventorySchema);
      setFieldOn("n");
      resetForm();
    },
    enableReinitialize: true,
  });

  let total: number = Math.floor(
    inventory.Conteo * inventory.Presentacion +
      inventory.Saldo +
      inventory.Formula
  );

  if (isNaN(total)) {
    total = 0;
  }

  return (
    <>
      <tr
        className={`text-xs border-b border-gray-700 text-gray-300 font-normal ${
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
        <td className="px-3 py-1 " onClick={() => setFieldOn(inventory._id)}>
          {fieldOn === inventory._id ? (
            <form onSubmit={formik.handleSubmit}>
              <input
                className="fieldTable w-8"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.inventorySchema.Presentacion || ""}
                name="inventorySchema.Presentacion"
              />
            </form>
          ) : (
            inventory.Presentacion
          )}
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
        <td className="px-3 py-1 " onClick={() => setFieldOn(inventory._id)}>
          {fieldOn === inventory._id ? (
            <form onSubmit={formik.handleSubmit}>
              <input
                className="fieldTable w-8"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.inventorySchema.Conteo || ""}
                name="inventorySchema.Conteo"
              />
            </form>
          ) : inventory.Conteo === 0 ? (
            ""
          ) : (
            inventory.Conteo
          )}
        </td>

        <td className="px-3 py-1 " onClick={() => setFieldOn(inventory._id)}>
          {fieldOn === inventory._id ? (
            <form onSubmit={formik.handleSubmit}>
              <input
                className="fieldTable w-8"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.inventorySchema.Saldo || ""}
                name="inventorySchema.Saldo"
              />
            </form>
          ) : inventory.Saldo === 0 ? (
            ""
          ) : (
            inventory.Saldo
          )}
        </td>

        <td className="px-3 py-1 " onClick={() => setFieldOn(inventory._id)}>
          {fieldOn === inventory._id ? (
            <form onSubmit={formik.handleSubmit}>
              <input
                className="fieldTable w-8"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.inventorySchema.Formula || ""}
                name="inventorySchema.Formula"
              />
            </form>
          ) : inventory.Formula === 0 ? (
            ""
          ) : (
            inventory.Formula
          )}
        </td>
        <td className="px-3 py-1 ">{total == 0 ? "" : total}</td>
        <td
          className={`px-3 py-1 ${
            total - inventory.Cantidad > 0
              ? total - inventory.Cantidad === 0
                ? "text-yellow-600"
                : "text-gray-400 "
              : "text-red-500 font-bold"
          }`}
        >
          {total === 0 ? "" : (total - inventory.Cantidad).toFixed(2)}
        </td>
      </tr>
    </>
  );
}
