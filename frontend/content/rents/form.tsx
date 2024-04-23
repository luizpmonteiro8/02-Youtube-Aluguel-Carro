"use client";

import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { getCars, getClients, saveRent } from "./actions";

// Função para validação dos campos do formulário
const validationSchema = Yup.object().shape({
  dayValue: Yup.number().required("O campo valor por dia é obrigatório"),
  startDate: Yup.string().required("O campo data inicial é obrigatório"),
  endDate: Yup.string()
    .required("O campo data final é obrigatório")
    .test(
      "is-greater-than-start",
      "A data final deve ser maior que a data inicial",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) {
          return true;
        }
        const start = new Date(startDate);
        const end = new Date(value);
        return end > start;
      }
    ),
  carId: Yup.number().required("O campo carro é obrigatório"),
  clientId: Yup.number().required("O campo cliente é obrigatório"),
});

export default function Form() {
  const [rents, setRents] = useState<
    { id: string; name: string } | undefined
  >();
  const params = useParams();
  const id = params.id || undefined;
  const navigate = useRouter();

  const [cars, setCars] = useState<{ id: number; name: string }[]>();
  const [clients, setClients] = useState<{ id: number; name: string }[]>();

  if (id && !rents) {
    fetch(`http://localhost:3000/rents/${id}`)
      .then((response) => response.json())
      .then((data) => setRents(data))
      .catch((error) => console.error("Erro ao buscar aluguel:", error));
  }

  useEffect(() => {
    getCars().then((data) => setCars(data));
    getClients().then((data) => setClients(data));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Formulário de aluguel</h1>

      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          {/* Formulário para cadastrar e editar cores */}
          <Formik
            initialValues={{
              ...{
                id: "",
                dayValue: 0,
                startDate: "",
                endDate: "",
                carId: 0,
                clientId: 0,
              },
              ...rents,
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              saveRent(values)
                .then(() => {
                  resetForm();
                  /*   alert("Cor salva com sucesso!"); */
                  setRents(undefined);
                  navigate.push("/aluguel");
                })
                .catch((error) =>
                  console.error("Erro ao salvar aluguel:", error)
                );
            }}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <FormikForm>
                <div className="mb-4">
                  <label
                    htmlFor="dayValue"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Valor do dia:
                  </label>
                  <Field
                    type="text"
                    id="dayValue"
                    name="dayValue"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="dayValue"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data inicial:
                  </label>
                  <Field
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data final:
                  </label>
                  <Field
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="carId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Carro:
                  </label>
                  <select
                    id="carId"
                    name="carId"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    value={Number(values.carId)}
                    onChange={({ target }) => {
                      setFieldValue("carId", target.value);
                    }}
                  >
                    <option value="">Selecione uma carro</option>
                    {cars?.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.name}
                      </option>
                    ))}
                  </select>

                  <ErrorMessage
                    name="carId"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="clientId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cliente:
                  </label>
                  <select
                    id="clientId"
                    name="clientId"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    value={Number(values.clientId)}
                    onChange={({ target }) => {
                      setFieldValue("clientId", target.value);
                    }}
                  >
                    <option value="">Selecione uma cliente</option>
                    {clients?.map((client) => (
                      <option key={"client" + client.id} value={client.id}>
                        {client.name}
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
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
