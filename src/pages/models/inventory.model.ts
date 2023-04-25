import { Schema, model, models } from "mongoose";
import Product from "./product.model";

type TInventory = {
  lot: string;
  winery: string;
  inventory: number;
  product?: string;
};

const inventorySchema = new Schema<TInventory>(
  {
    lot: {
      type: String,
      trim: true,
    },
    winery: {
      type: String,
      trim: true,
    },
    inventory: {
      type: Number,
      trim: true,
    },
    product: {
      type: String,
      ref: "Product",
      validate: {
        validator: function (code: number) {
          if (code === undefined || code === null) {
            // El campo es opcional y no se debe validar
            return true;
          } else {
            // El campo es obligatorio y se debe validar
            return Product.findOne({ code })
              .then((product) => !!product)
              .catch(() => false);
          }
        },
        message: "The product doesn't exists!",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Inventory ||
  model<TInventory>("Inventory", inventorySchema);
