import { Schema, model, models } from "mongoose";

type TInventory = {
  name: string;
  age: number;
};

const inventorySchema = new Schema<TInventory>(
  {
    name: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Test || model<TInventory>("Inventory", inventorySchema);
