import { Schema, model, models } from "mongoose";

type TInventory = {
  Codigo: number;
  Descripcion: string;
  Lote: string;
  Almacen: string;
  Cantidad: number;
  // Formulas: number;
  // product?: string;
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
    // Formulas: {
    //   type: Number,
    //   trim: true,
    // },
    // product: {
    //   type: String,
    //   ref: "Product",
    //   validate: {
    //     validator: function (code: number) {
    //       if (code === undefined || code === null) {
    //         // El campo es opcional y no se debe validar
    //         return true;
    //       } else {
    //         // El campo es obligatorio y se debe validar
    //         return Product.findOne({ code })
    //           .then((product) => !!product)
    //           .catch(() => false);
    //       }
    //     },
    //     message: "The product doesn't exists!",
    //   },
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Inventory ||
  model<TInventory>("Inventory", inventorySchema);