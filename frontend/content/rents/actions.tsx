"use server";

import { revalidatePath } from "next/cache";

export async function getCars(): Promise<{ id: number; name: string }[]> {
  const cars = await fetch("http://localhost:3000/cars");
  return cars.json();
}

export async function getClients(): Promise<{ id: number; name: string }[]> {
  const clients = await fetch("http://localhost:3000/clients");
  return clients.json();
}

export async function saveRent(rent: {
  id?: string;
  dayValue: number;
  startDate: string;
  endDate: string;
  carId: number;
  clientId: number;
}) {
  const method = rent.id ? "PATCH" : "POST";
  const url = rent.id
    ? `http://localhost:3000/rents/${rent.id}`
    : "http://localhost:3000/rents";

  // Envia requisição para API
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      rent.id
        ? {
            id: Number(rent.id),
            dayValue: Number(rent.dayValue),
            startDate: rent.startDate,
            endDate: rent.endDate,
            carId: Number(rent.carId),
            clientId: Number(rent.clientId),
          }
        : {
            dayValue: Number(rent.dayValue),
            startDate: rent.startDate,
            endDate: rent.endDate,
            carId: Number(rent.carId),
            clientId: Number(rent.clientId),
          }
    ),
  });
  console.log({
    dayValue: rent.dayValue,
    startDate: rent.startDate,
    endDate: rent.endDate,
    carId: rent.carId,
    clientId: rent.clientId,
  });

  const data = await response.json();
  revalidatePath("/aluguel");
  return data;
}

export async function deleteRent(id: number) {
  await fetch(`http://localhost:3000/rents/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/aluguel");
  return {};
}
