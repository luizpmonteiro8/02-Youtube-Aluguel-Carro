"use client";

import { deleteColor } from "./actions";

export function RemoveButton({ id }: { id: number }) {
  const deleteColorWithId = deleteColor.bind(null, id);

  return (
    <form action={deleteColorWithId} className="inline">
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Excluir
      </button>
    </form>
  );
}
