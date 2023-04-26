import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/product.model";

export default async function idPredict(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { Codigo },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const productFound = await Product.find({ Codigo });

        if (!productFound) return res.status(404).json("Product not found");

        return res.status(200).json(productFound);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "PUT":
      try {
        const product = await Product.findOneAndUpdate({ Codigo }, body, {
          new: true,
        });

        if (!product) return res.status(404).json("Product not found");

        return res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "DELETE":
      try {
        const deletedProduct = await Product.findOneAndRemove({
          Codigo,
        });

        if (!deletedProduct) return res.status(404).json("Product not found");

        return res.status(200).json("Product deleted successfully");
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
