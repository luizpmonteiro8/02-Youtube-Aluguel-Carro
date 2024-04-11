"use server";

import { revalidatePath } from "next/cache";

export async function saveClient(client: {
  id?: string;
  name: string;
  cpf: string;
  enable: boolean;
  addresses: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }[];
}) {
  const method = client.id ? "PATCH" : "POST";
  const url = client.id
    ? `http://localhost:3000/clients/${client.id}`
    : "http://localhost:3000/clients";

  // Envia requisição para API
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      client.id
        ? {
            id: Number(client.id),
            name: client.name,
            cpf: client.cpf,
            enable: client.enable,
            addresses: client.addresses.map((address) => ({
              street: address.street,
              number: Number(address.number),
              city: address.city,
              state: address.state,
              zipCode: address.zipCode,
              country: address.country,
            })),
          }
        : {
            name: client.name,
            cpf: client.cpf,
            enable: client.enable,
            addresses: client.addresses.map((address) => ({
              street: address.street,
              number: Number(address.number),
              city: address.city,
              state: address.state,
              zipCode: address.zipCode,
              country: address.country,
            })),
          }
    ),
  });

  const data = await response.json();

  revalidatePath("/clientes");
  return data;
}

export async function deleteClient(id: number) {
  const response = await fetch(`http://localhost:3000/clients/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  console.log(data);

  revalidatePath("/clientes");
  return {};
}
