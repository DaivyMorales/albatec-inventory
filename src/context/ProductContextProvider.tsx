import axios from "axios";
import { ReactNode, createContext, useState } from "react";

interface ProductContextProps {
  children: ReactNode;
}

interface IProduct {
  Codigo: number;
  Descripcion: string;
  Presentacion: string;
  _id: string;
  createdAt: string;
  updateAt: string;
}

interface IContext {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  fieldOn: string;
  setFieldOn: React.Dispatch<React.SetStateAction<string>>;
  updateProduct: (Codigo: number, body: object) => Promise<void>;
}

export const productContext = createContext<IContext>({
  products: [],
  setProducts: () => {},
  fieldOn: "n",
  setFieldOn: () => {},
  updateProduct: async () => {},
});

export const ProductContextProvider = ({ children }: ProductContextProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [fieldOn, setFieldOn] = useState<string>("n");

  const updateProduct = async (Codigo: number, body: object) => {
    try {
      const response = await axios.put(`/api/product/${Codigo}`, body);
      setProducts(
        products.map((product) => {
          if (product.Codigo === Codigo) {
            return response.data;
          } else {
            return product;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <productContext.Provider
      value={{ products, setProducts, fieldOn, setFieldOn, updateProduct }}
    >
      {children}
    </productContext.Provider>
  );
};
