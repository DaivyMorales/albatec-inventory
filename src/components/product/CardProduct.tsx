import { FaProductHunt } from "react-icons/fa";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { productContext } from "@/context/ProductContextProvider";
import { TiDelete } from "react-icons/ti";

interface IProduct {
  Codigo: number;
  Descripcion: string;
  Presentacion: string;
  _id: string;
  createdAt: string;
  updateAt: string;
}

interface MyProps {
  product: IProduct;
}

export default function CardProduct({ product }: MyProps) {
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
    Codigo: product.Codigo,
    Descripcion: product.Descripcion,
    Presentacion: product.Presentacion,
  });

  const formik = useFormik({
    initialValues: { productSchema },
    onSubmit: async (values) => {
      console.log(values.productSchema);
      setProductSchema(values.productSchema);
      await updateProduct(product.Codigo, values.productSchema);
      setFieldOn("n");
    },
    enableReinitialize: true,
  });

  return (
    <>
      <tr
        className={`text-xs border-b border-gray-700 text-gray-300 font-normal ${
          fieldOn === product._id ? "bg-gray-900" : ""
        } hover:bg-gray-900 ${columnOn ? "text-gray-600" : ""}`}
        onClick={() => setFieldOn(product._id)}
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
          onClick={() => setFieldOn(product._id)}
        >
          {fieldOn === product._id ? (
            <form onSubmit={formik.handleSubmit}>
              <input
                className="fieldTable w-20"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.productSchema.Codigo}
                name="productSchema.Codigo"
              />
            </form>
          ) : (
            product.Codigo
          )}
        </th>
        <td
          className={`px-3 py-1 flex justify-start items-center gap-x-1 ${
            columnOn ? "text-gray-600" : "text-white"
          }`}
          onClick={() => setFieldOn(product._id)}
        >
          {fieldOn === product._id ? (
            <form onSubmit={formik.handleSubmit}>
              <input
                className="fieldTable w-60"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.productSchema.Descripcion}
                name="productSchema.Descripcion"
              />
            </form>
          ) : (
            product.Descripcion
          )}
          <FaProductHunt
            size={10}
            className={`${columnOn ? "text-gray-600" : "text-blue-500"}`}
          />
        </td>
        <td className="px-3 py-1" onClick={() => setFieldOn(product._id)}>
          {fieldOn === product._id ? (
            <form onSubmit={formik.handleSubmit}>
              <input
                className="fieldTable w-12"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.productSchema.Presentacion}
                name="productSchema.Presentacion"
              />
            </form>
          ) : (
            product.Presentacion
          )}
        </td>
      </tr>
    </>
  );
}
