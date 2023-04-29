import { createContext, ReactNode, useState } from "react";
import axios from "axios";

interface InventoryContextProps {
  children: ReactNode;
}

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

interface IContext {
  inventoryContent: IInventory[];
  setInventoryContent: React.Dispatch<React.SetStateAction<IInventory[]>>;
  deleteAllInventory: () => Promise<void>;
  updateInventory: (id: string, body: object) => Promise<void>;
}

export const inventoryContext = createContext<IContext>({
  inventoryContent: [],
  setInventoryContent: () => {},
  deleteAllInventory: async () => {},
  updateInventory: async () => {},
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

  const updateInventory = async (id: string, body: object) => {
    try {
      const response = await axios.put(`/api/inventory/${id}`, body);
      setInventoryContent(
        inventoryContent.map((inventory) => {
          if (inventory._id === id) {
            return response.data;
          } else {
            return inventory;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <inventoryContext.Provider
      value={{
        inventoryContent,
        setInventoryContent,
        deleteAllInventory,
        updateInventory,
      }}
    >
      {children}
    </inventoryContext.Provider>
  );
};
