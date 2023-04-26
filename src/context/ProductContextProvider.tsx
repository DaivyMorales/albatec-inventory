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
  createProduct: (values: object | undefined) => Promise<void>;
  columnOn: boolean;
  setColumnOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const productContext = createContext<IContext>({
  products: [],
  setProducts: () => {},
  fieldOn: "n",
  setFieldOn: () => {},
  updateProduct: async () => {},
  createProduct: async () => {},
  columnOn: false,
  setColumnOn: () => {},
});

export const ProductContextProvider = ({ children }: ProductContextProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [fieldOn, setFieldOn] = useState<string>("n");
  const [columnOn, setColumnOn] = useState<boolean>(false);

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

  const createProduct = async (values: object | undefined) => {
    try {
      const response = await axios.post("/api/product", values);
      setProducts([response.data, ...products]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <productContext.Provider
      value={{
        products,
        setProducts,
        fieldOn,
        setFieldOn,
        updateProduct,
        createProduct,
        columnOn,
        setColumnOn,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
