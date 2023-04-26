import { productContext } from "@/context/ProductContextProvider";
import { GetServerSidePropsContext } from "next";
import { useContext, useEffect } from "react";

interface IProduct {
  Codigo: number;
  Descripcion: string;
  Presentacion: string;
}

interface MyProps {
  data: IProduct[];
}

export default function TableProduct({ data }: MyProps) {
  const { products, setProducts } = useContext(productContext);

  useEffect(() => {
    setProducts(data);
  }, []);

  return <div>Product</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch("https://albatec-inventory.vercel.app/api/product");
  const data = await res.json();

  return {
    props: { data },
  };
}
