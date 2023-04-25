import { Schema, model, models } from "mongoose";

type TProduct = {
  code: number;
  description: string;
  presentation: number;
};

const productSchema = new Schema<TProduct>(
  {
    code: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    presentation: {
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
