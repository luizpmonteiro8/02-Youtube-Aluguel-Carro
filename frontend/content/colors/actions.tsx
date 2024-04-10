"use server";

import { revalidatePath } from "next/cache";

export async function saveColor(color: { id?: string; name: string }) {
  const method = color.id ? "PATCH" : "POST";
  const url = color.id
    ? `http://localhost:3000/colors/${color.id}`
    : "http://localhost:3000/colors";

  // Envia requisição para API
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      color.id
        ? { id: Number(color.id), name: color.name }
        : { name: color.name }
    ),
  });

  const data = await response.json();
  revalidatePath("/cores");
  return data;
}

export async function deleteColor(id: number) {
  await fetch(`http://localhost:3000/colors/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/cores");
  return {};
}
