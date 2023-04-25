import { dbConnect } from "../../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";
// import Product from "../../models/product.model";
import Inventory from "../../models/inventory.model";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const inventory = await Inventory.find();
        return res.status(200).json(inventory);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }

    case "POST":
      try {
        const { lot, winery, inventory, product } = body;

        const newInventory = new Inventory({
          lot,
          winery,
          inventory,
          product,
        });
        const inventorySaved = await newInventory.save();

        return res.status(200).json(inventorySaved);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }

    default:
      return res.status(400).json({ msg: "That method isn't supported!" });
  }
}
