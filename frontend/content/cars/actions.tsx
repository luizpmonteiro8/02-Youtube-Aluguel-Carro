"use server";

import { revalidatePath } from "next/cache";

export async function getColors(): Promise<{ id: number; name: string }[]> {
  const colors = await fetch("http://localhost:3000/colors");
  return colors.json();
}

export async function saveCar(car: {
  id?: string;
  name: string;
  year: number;
  available: boolean;
  colorId: number;
}) {
  const method = car.id ? "PATCH" : "POST";
  const url = car.id
    ? `http://localhost:3000/cars/${car.id}`
    : "http://localhost:3000/cars";

  // Envia requisição para API
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      car.id
        ? {
            id: Number(car.id),
            name: car.name,
            year: Number(car.year),
            available: car.available,
            colorId: Number(car.colorId),
          }
        : {
            name: car.name,
            year: Number(car.year),
            available: car.available,
            colorId: Number(car.colorId),
          }
    ),
  });

  const data = await response.json();

  revalidatePath("/carros");
  return data;
}

export async function deleteCar(id: number) {
  await fetch(`http://localhost:3000/cars/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/carros");
  return {};
}
