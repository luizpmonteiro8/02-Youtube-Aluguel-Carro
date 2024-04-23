"use client";

import { deleteRent } from "./actions";

export function RemoveButton({ id }: { id: number }) {
  const deleteRentWithId = deleteRent.bind(null, id);

  return (
    <form action={deleteRentWithId} className="inline">
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Excluir
      </button>
    </form>
  );
}
