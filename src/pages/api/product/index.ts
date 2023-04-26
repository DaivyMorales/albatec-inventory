import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/db";
import Product from "../../../models/product.model";

export default async function indexPredict(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.find().sort({ createdAt: "desc" });
        return res.status(200).json(product);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "POST":
      try {
        const { Codigo, Descripcion, Presentacion } = body;

        const newProduct = new Product({
          Codigo,
          Descripcion,
          Presentacion,
        });
        
        // const insertedData = await Product.insertMany(req.body);

        const productSaved = await newProduct.save();

        return res.status(200).json(productSaved);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    default:
      res.status(400).json("Invalid method!");
      break;
  }
}
