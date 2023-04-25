interface IInventory {
  Codigo: string;
  Descripcion: string;
  Lote: string;
  Almacen: number;
  Cantidad: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface MyProps {
  inventory: IInventory;
}

export default function InventoryCard({ inventory }: MyProps) {
  return (
    <tr className="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
      >
        {inventory.Codigo}
      </th>
      <td className="px-6 py-4">{inventory.Descripcion}</td>
      <td className="px-6 py-4">{inventory.Lote}</td>
      <td className="px-6 py-4">{inventory.Almacen}</td>
      <td className="px-6 py-4">{inventory.Cantidad}</td>
    </tr>
  );
}
