"use client";

import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { getColors, saveCar } from "./actions";

// Função para validação dos campos do formulário
const validationSchema = Yup.object().shape({
  name: Yup.string().required("O nome da carro é obrigatório"),
  year: Yup.number()
    .min(1950, "O ano do carro deve ser maior que 1950")
    .max(2100, "O ano do carro deve ser menor que 2100")
    .required("O ano do carro é obrigatório"),
  available: Yup.boolean().required("O disponível da carro é obrigatório"),
  colorId: Yup.number()
    .min(1, "A cor do carro é obrigatório")
    .required("A cor do carro é obrigatório"),
});

export default function Form() {
  const [cars, setCars] = useState<
    | {
        id: string;
        name: string;
        year: number;
        available: boolean;
        colorId: number;
      }
    | undefined
  >();
  const [colors, setColors] = useState<{ id: number; name: string }[]>();
  const params = useParams();
  const id = params.id || undefined;
  const navigate = useRouter();

  if (id && !cars) {
    fetch(`http://localhost:3000/cars/${id}`)
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Erro ao buscar carro:", error));
  }
  console.log(cars);

  useEffect(() => {
    getColors().then((data) => setColors(data));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Formulário de carros</h1>

      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          {/* Formulário para cadastrar e editar cores */}
          <Formik
            initialValues={{
              ...{ id: "", name: "", year: 0, available: true, colorId: 0 },
              ...cars,
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              saveCar(values)
                .then(() => {
                  resetForm();
                  /*   alert("Carro salva com sucesso!"); */
                  setCars(undefined);
                  navigate.push("/carros");
                })
                .catch((error) =>
                  console.error("Erro ao salvar carro:", error)
                );
            }}
          >
            {({ values, setFieldValue, errors, touched }) => {
              console.log(values);

              return (
                <FormikForm>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nome do carro:
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
                  <div className="mb-4">
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ano:
                    </label>
                    <Field
                      type="text"
                      id="year"
                      name="year"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="year"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Disponível:
                    </label>
                    <select
                      id="available"
                      name="available"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      value={values.available ? "Disponível" : "Indisponível"}
                      onChange={({ target }) => {
                        const value =
                          target.value === "Disponível" ? true : false;
                        setFieldValue("available", value);
                      }}
                    >
                      <option value="Disponível">Disponível</option>
                      <option value="Indisponível">Indisponível</option>
                    </select>
                    <ErrorMessage
                      name="available"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="colorId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Carro:
                    </label>
                    <select
                      id="colorId"
                      name="colorId"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      value={Number(values.colorId)}
                      onChange={({ target }) => {
                        setFieldValue("colorId", target.value);
                      }}
                    >
                      <option value="">Selecione uma carro</option>
                      {colors?.map((color) => (
                        <option key={color.id} value={color.id}>
                          {color.name}
                        </option>
                      ))}
                    </select>

                    <ErrorMessage
                      name="colorId"
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
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
