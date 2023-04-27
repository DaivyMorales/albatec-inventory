import { createContext, ReactNode, useState } from "react";
import axios from "axios";

interface InventoryContextProps {
  children: ReactNode;
}

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

interface IContext {
  inventoryContent: IInventory[];
  setInventoryContent: React.Dispatch<React.SetStateAction<IInventory[]>>;
  deleteAllInventory: () => Promise<void>;
}

export const inventoryContext = createContext<IContext>({
  inventoryContent: [],
  setInventoryContent: () => {},
  deleteAllInventory: async () => {},
});

export const InventoryContextProvider = ({
  children,
}: InventoryContextProps) => {
  const [inventoryContent, setInventoryContent] = useState<IInventory[]>([]);

  const deleteAllInventory = async () => {
    try {
      await axios.delete("/api/inventory");
      setInventoryContent([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <inventoryContext.Provider
      value={{ inventoryContent, setInventoryContent, deleteAllInventory }}
    >
      {children}
    </inventoryContext.Provider>
  );
};
