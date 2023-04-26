import { productContext } from "@/context/ProductContextProvider";
import { GetServerSidePropsContext } from "next";
import { useContext, useEffect } from "react";
import CardProduct from "../../components/product/CardProduct";
import * as xlsx from "xlsx";
import axios from "axios";

interface IProduct {
  Codigo: number;
  Descripcion: string;
  Presentacion: string;
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
  const { products, setProducts } = useContext(productContext);

  useEffect(() => {
    setProducts(data);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center flex-col items-center my-10 gap-y-2">
        <div className=" w-full flex justify-between items-center px-3 py-6  border-b border-gray-700">
          <h3>Productos</h3>
          <button>Crear Producto</button>
        </div>

        <div className="w-full px-24">
          <div className="relative border-1 w-full border-gray-700 overflow-x-auto sm:rounded-lg px-6">
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

  return {
    props: { data },
  };
}
