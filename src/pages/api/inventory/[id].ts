import { NextApiRequest, NextApiResponse } from "next";
import Inventory from "../../../models/inventory.model";

export default async function idPredict(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const productFound = await Inventory.findById(id);

        if (!productFound) return res.status(404).json("Product not found");

        return res.status(200).json(productFound);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "PUT":
      try {
        const product = await Inventory.findByIdAndUpdate(id, body, {
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
        const deletedProduct = await Inventory.findByIdAndRemove(id);

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
