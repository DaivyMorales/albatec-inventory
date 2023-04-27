import { productContext } from "@/context/ProductContextProvider";
import { GetServerSidePropsContext } from "next";
import { useContext, useEffect, useState } from "react";
import CardProduct from "../../components/product/CardProduct";
import { useFormik } from "formik";
import { useRouter } from "next/router";

interface IProduct {
  Codigo: number;
  Descripcion: string;
  Presentacion: number;
  _id: string;
  createdAt: string;
  updateAt: string;
}

interface MyProps {
  data: IProduct[];
}

interface IData {
  Codigo: number;
  Descripcion: string;
  Presentacion: string;
}

export default function TableProduct({ data }: MyProps) {
  const router = useRouter();

  const { products, setProducts, createProduct, setColumnOn, columnOn } =
    useContext(productContext);

  const [newProductSchema, setNewProductSchema] = useState({
    Codigo: 0,
    Descripcion: "",
    Presentacion: 0,
  });

  const formik = useFormik({
    initialValues: { newProductSchema },
    onSubmit: async (values, { resetForm }) => {
      console.log(values.newProductSchema);
      createProduct(values.newProductSchema);
      setColumnOn(!columnOn);
      resetForm();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setProducts(data);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center flex-col items-center my-10 gap-y-2">
        <div className=" w-full flex justify-between items-center px-3 py-6  border-b border-gray-700">
          <div className="flex flex-col gap-y-2">
            <h3>Productos</h3>
            <a
              onClick={() => router.push("/")}
              className="cursor-pointer hover:text-blue-400"
            >
              Ir a Inventario
            </a>
          </div>
          <button
            onClick={() => setColumnOn(!columnOn)}
            className={`${columnOn ? "bg-red-500" : "bg-blue-600 "} `}
          >
            {columnOn ? "Cancelar" : "Crear Producto "}
          </button>
        </div>

        <div className="w-full px-10">
          <div className="relative border-1 w-full border-gray-700 overflow-x-auto rounded-lg px-6">
            <table className="w-full text-xs text-left">
              <thead className="text-2xs text-gray-400 uppercase border-b border-gray-700 ">
                <tr>
                  <th scope="col" className="px-5 py-5">
                    Codigo
                  </th>
                  <th scope="col" className="px-5 py-5">
                    Descripcion
                  </th>
                  <th scope="col" className="px-5 py-5">
                    Presentacion
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={`${
                    columnOn ? "" : "hidden"
                  } text-xs border-b border-gray-700 text-gray-300 font-normal`}
                >
                  <th className=" py-1">
                    {columnOn ? (
                      <form onSubmit={formik.handleSubmit}>
                        <input
                          className="fieldTable w-20"
                          type="number"
                          onChange={formik.handleChange}
                          value={formik.values.newProductSchema.Codigo}
                          name="newProductSchema.Codigo"
                        />
                      </form>
                    ) : (
                      ""
                    )}
                  </th>
                  <td className="px-3 py-1">
                    {columnOn ? (
                      <form onSubmit={formik.handleSubmit}>
                        <input
                          className="fieldTable w-60"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.newProductSchema.Descripcion}
                          name="newProductSchema.Descripcion"
                        />
                      </form>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-3 py-1">
                    {columnOn ? (
                      <form onSubmit={formik.handleSubmit}>
                        <input
                          className="fieldTable w-12"
                          type="number"
                          onChange={formik.handleChange}
                          value={formik.values.newProductSchema.Presentacion}
                          name="newProductSchema.Presentacion"
                        />
                      </form>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                {products.map((product) => (
                  <CardProduct product={product} key={product._id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch("https://albatec-inventory.vercel.app/api/product");
  const data = await res.json();

  // Ordenar los datos por fecha de creación descendente
  const sortedData = data.sort(
    (a: IProduct, b: IProduct) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    props: { data: sortedData },
  };
}
