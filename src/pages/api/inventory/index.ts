// import { NextApiRequest, NextApiResponse } from "next";
// import { dbConnect } from "../../../utils/db";
// // import Test from "../../../models/test.model";

// export default async function indexInventory(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await dbConnect();

//   // res.json("Hola desde test");

//   const { method, body } = req;

//   switch (method) {
//     case "GET":
//       try {
//         const test = await Test.find();
//         return res.status(200).json(test);
//       } catch (error) {
//         if (error instanceof Error) {
//           res.status(500).json({ error: error.message });
//         } else {
//           res.status(500).json({ error: "Ha ocurrido un error." });
//         }
//       }
//       break;

//     case "POST":
//       try {
//         const { name, age } = body;

//         const newTest = new Test({
//           name,
//           age,
//         });

//         const testSaved = await newTest.save();

//         return res.status(200).json(testSaved);
//       } catch (error) {
//         if (error instanceof Error) {
//           res.status(500).json({ error: error.message });
//         } else {
//           res.status(500).json({ error: "Ha ocurrido un error." });
//         }
//       }
//       break;

//     case "DELETE":
//       try {
//         const testDeleted = await Test.deleteMany();

//         if (!testDeleted) return res.status(404).json("Test not found");

//         return res.status(200).json("Test deleted successfully");
//       } catch (error) {
//         if (error instanceof Error) {
//           res.status(500).json({ error: error.message });
//         } else {
//           res.status(500).json({ error: "Ha ocurrido un error." });
//         }
//       }
//       break;

//     default:
//       res.status(400).json("Invalid method!");
//       break;
//   }
// }
