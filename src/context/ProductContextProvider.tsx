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
}

export const productContext = createContext<IContext>({
  products: [],
  setProducts: async () => {},
});

export const ProductContextProvider = ({ children }: ProductContextProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  console.log(products);

  return (
    <productContext.Provider value={{ products, setProducts }}>
      {children}
    </productContext.Provider>
  );
};
