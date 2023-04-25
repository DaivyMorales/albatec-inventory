import React from "react";

export default function inventoryCard() {
  return (
    <tr className="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
      >
        Apple MacBook Pro 17"
      </th>
      <td className="px-6 py-4">Silver</td>
      <td className="px-6 py-4">Laptop</td>
      <td className="px-6 py-4">$2999</td>
      <td className="px-6 py-4">
        <a href="#" className="font-medium text-white hover:underline">
          Edit
        </a>
      </td>
    </tr>
  );
}
