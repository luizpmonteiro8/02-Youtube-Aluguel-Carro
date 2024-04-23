import Link from "next/link";
import { RemoveButton } from "./removeButton";

async function getRents(): Promise<
  {
    id: number;
    dayValue: number;
    startDate: string;
    endDate: string;
    total: number;
    car: { id: number; name: string; color: { id: number; name: string } };
    client: { id: number; name: string };
  }[]
> {
  const rents = await fetch("http://localhost:3000/rents");

  return rents.json();
}

export default async function List() {
  const rents = await getRents();

  const formatDate = (date: string) => {
    const d = new Date(date);
    d.setHours(d.getHours() + 3);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de aluguel</h1>
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
              Cliente
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Carro
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Data inicial
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Data final
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Valor dia
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Valor total
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
          {rents.map((rent) => (
            <tr key={rent.id}>
              <td className="px-6 py-4 whitespace-nowrap">{rent.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {rent.client.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{rent.car.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(rent.startDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(rent.endDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {rent.dayValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {rent.total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/aluguel/${rent.id}`}
                  className="bg-primary hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Editar
                </Link>
                <RemoveButton id={rent.id} />
              </td>
            </tr>
          ))}
          {rents.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 whitespace-nowrap text-center"
              >
                Nenhum aluguel encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
