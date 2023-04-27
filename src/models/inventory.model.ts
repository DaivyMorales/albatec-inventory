import { Schema, model, models } from "mongoose";

type TInventory = {
  Codigo: number;
  Descripcion: string;
  Lote: string;
  Almacen: string;
  Cantidad: number;
  Conteo: number;
  Saldo: number;
  Formula: number;
};

const inventorySchema = new Schema<TInventory>(
  {
    Codigo: {
      type: Number,
      trim: true,
    },
    Descripcion: {
      type: String,
      trim: true,
    },
    Lote: {
      type: String,
      trim: true,
    },
    Almacen: {
      type: String,
      trim: true,
    },
    Cantidad: {
      type: Number,
      trim: true,
    },
    Conteo: {
      type: Number,
      trim: true,
    },
    Saldo: {
      type: Number,
      trim: true,
    },
    Formula: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Inventory ||
  model<TInventory>("Inventory", inventorySchema);
