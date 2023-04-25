import { Schema, model, models } from "mongoose";

type TProduct = {
  Codigo: number;
  Descripcion: string;
  Presentacion: number;
};

const productSchema = new Schema<TProduct>(
  {
    Codigo: {
      type: Number,
      trim: true,
    },
    Descripcion: {
      type: String,
      trim: true,
    },
    Presentacion: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Product || model<TProduct>("Product", productSchema);
