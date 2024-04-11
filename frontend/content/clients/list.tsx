import Link from "next/link";
import { RemoveButton } from "./removeButton";

async function getClients() {
  const clients = await fetch("http://localhost:3000/clients");

  return clients.json();
}

export default async function List() {
  const clients = await getClients();
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de clientes</h1>
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
              Cpf
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ativo
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Endereços
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
          {clients.map(
            (client: {
              id: number;
              name: string;
              cpf: string;
              enable: boolean;
              addresses: {
                id: number;
                street: string;
                number: number;
                city: string;
                state: string;
                zipCode: string;
                country: string;
              }[];
            }) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">{client.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.cpf}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {client.enable ? "Sim" : "Não"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {client.addresses.map((address) => (
                    <div key={address.id}>
                      {address.street}, {address.number}, {address.city},{" "}
                      {address.state}, {address.zipCode}, {address.country}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/clientes/${client.id}`}
                    className="bg-primary hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Editar
                  </Link>
                  <RemoveButton id={client.id} />
                </td>
              </tr>
            )
          )}
          {clients.length === 0 && (
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
