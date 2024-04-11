"use client";

import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { saveColor } from "./actions";

// Função para validação dos campos do formulário
const validationSchema = Yup.object().shape({
  name: Yup.string().required("O nome da cor é obrigatório"),
});

export default function Form() {
  const [colors, setColors] = useState<
    { id: string; name: string } | undefined
  >();
  const params = useParams();
  const id = params.id || undefined;
  const navigate = useRouter();

  if (id && !colors) {
    fetch(`http://localhost:3000/colors/${id}`)
      .then((response) => response.json())
      .then((data) => setColors(data))
      .catch((error) => console.error("Erro ao buscar cor:", error));
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Formulário de cores</h1>

      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          {/* Formulário para cadastrar e editar cores */}
          <Formik
            initialValues={{ ...{ id: "", name: "" }, ...colors }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              saveColor(values)
                .then(() => {
                  resetForm();
                  /*   alert("Cor salva com sucesso!"); */
                  setColors(undefined);
                  navigate.push("/cores");
                })
                .catch((error) => console.error("Erro ao salvar cor:", error));
            }}
          >
            {({ errors, touched }) => (
              <FormikForm>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome da Cor:
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                  {id ? "Editar" : "Salvar"}
                </button>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
