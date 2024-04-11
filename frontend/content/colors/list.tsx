import Link from "next/link";
import { RemoveButton } from "./removeButton";

async function getColors() {
  const colors = await fetch("http://localhost:3000/colors");

  return colors.json();
}

export default async function List() {
  const colors = await getColors();
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de cores</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {colors.map((color: { id: number; name: string }) => (
            <tr key={color.id}>
              <td className="px-6 py-4 whitespace-nowrap">{color.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{color.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/cores/${color.id}`}
                  className="bg-primary hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Editar
                </Link>
                <RemoveButton id={color.id} />
              </td>
            </tr>
          ))}
          {colors.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 whitespace-nowrap text-center"
              >
                Nenhuma cor encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
