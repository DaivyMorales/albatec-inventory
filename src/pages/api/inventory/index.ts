import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/db";
import Inventory from "../../../models/inventory.model";

export default async function indexInventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
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
      break;

    case "POST":
      try {
        const insertedData = await Inventory.insertMany(req.body);
        return res.status(200).json(insertedData);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "DELETE":
      try {
        const inventoryDeleted = await Inventory.deleteMany();

        if (!inventoryDeleted)
          return res.status(404).json("inventory not found");

        return res.status(200).json("inventory deleted successfully");
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
