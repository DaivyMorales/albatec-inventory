interface IProduct {
  Codigo: number;
  Descripcion: string;
  Presentacion: string;
  _id: string;
  createdAt: string;
  updateAt: string;
}

interface MyProps {
  product: IProduct;
}

export default function CardProduct({ product }: MyProps) {
  return (
    <tr className="text-xs border-b border-gray-700">
      <th
        scope="row"
        className="px-3 py-4 whitespace-nowrap"
      >
        {product.Codigo}
      </th>
      <td className="px-3 py-4">{product.Descripcion}</td>
      <td className="px-3 py-4">{product.Presentacion}</td>
    </tr>
  );
}
