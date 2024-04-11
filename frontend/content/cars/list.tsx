import Link from "next/link";
import { RemoveButton } from "./removeButton";

async function getCars() {
  const cars = await fetch("http://localhost:3000/cars");

  return cars.json();
}

export default async function List() {
  const cars = await getCars();
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de carros</h1>
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
              Ano
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Disponível
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Cor
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
          {cars.map(
            (car: {
              id: number;
              name: string;
              year: number;
              available: boolean;
              color: { id: number; name: string };
            }) => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap">{car.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {car.available ? "Disponível" : "Indisponível"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {car.color.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/carros/${car.id}`}
                    className="bg-primary hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Editar
                  </Link>
                  <RemoveButton id={car.id} />
                </td>
              </tr>
            )
          )}
          {cars.length === 0 && (
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
