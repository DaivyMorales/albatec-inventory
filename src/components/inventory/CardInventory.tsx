import { FaProductHunt } from "react-icons/fa";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { productContext } from "@/context/ProductContextProvider";
import { TiDelete } from "react-icons/ti";

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
  inventory: IInventory;
}

export default function InventoryCard({ inventory }: MyProps) {
  const { fieldOn, setFieldOn, updateProduct, columnOn, deleteProduct } =
    useContext(productContext);

  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const [productSchema, setProductSchema] = useState({
    Codigo: inventory.Codigo,
    Descripcion: inventory.Descripcion,
    Presentacion: inventory.Presentacion,
  });

  const formik = useFormik({
    initialValues: { productSchema },
    onSubmit: async (values) => {
      console.log(values.productSchema);
      setProductSchema(values.productSchema);
      await updateProduct(inventory.Codigo, values.productSchema);
      setFieldOn("n");
    },
    enableReinitialize: true,
  });
  return (
    <>
      <tr
        className={`text-xs border-b border-gray-700 text-gray-300 font-normal ${
          fieldOn === inventory._id ? "bg-gray-900" : ""
        } hover:bg-gray-900 ${columnOn ? "text-gray-600" : ""}`}
        onClick={() => setFieldOn(inventory._id)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* <TiDelete
          onClick={async () => await deleteProduct(product.Codigo)}
          size={22}
          className={`${
            hover ? "" : "hidden"
          }  cursor-pointer hover:text-red-600 `}
        /> */}
        <th
          scope="row"
          className="px-3 py-1  "
          onClick={() => setFieldOn(inventory._id)}
        >
          {inventory.Codigo}
        </th>
        <td
          className={`px-3 py-1 flex justify-start items-center gap-x-1 ${
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
          25
        </td>
        <td className="px-3 py-1" onClick={() => setFieldOn(inventory._id)}>
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
