"use client";

import {
  ErrorMessage,
  Field,
  FieldArray,
  Formik,
  Form as FormikForm,
} from "formik";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { saveClient } from "./actions";

// Função para validação dos campos do formulário
const validationSchema = Yup.object().shape({
  name: Yup.string().required("O nome da cor é obrigatório"),
  cpf: Yup.string().required("O CPF da cor é obrigatório"),
  enable: Yup.boolean().default(true),
  addresses: Yup.array()
    .min(1, "O cliente deve ter pelo menos um endereço")
    .of(
      Yup.object().shape({
        street: Yup.string().required("A rua da cor é obrigatória"),
        number: Yup.number().required("O número da cor é obrigatório"),
        city: Yup.string().required("A cidade da cor é obrigatória"),
        state: Yup.string().required("O estado da cor é obrigatório"),
        zipCode: Yup.string().required("O Código Postal da cor é obrigatório"),
        country: Yup.string().required("O país da cor é obrigatório"),
      })
    ),
});

const initialValues = {
  name: "",
  cpf: "",
  enable: true,
  addresses: [
    {
      street: "",
      number: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Brasil",
    },
  ],
};

export default function Form() {
  const [client, setClient] = useState<
    | {
        id?: string;
        name: string;
        cpf: string;
        active: boolean;
        addresses: {
          street: string;
          number: string;
          city: string;
          state: string;
          zipCode: string;
          country: string;
        }[];
      }
    | undefined
  >();
  const params = useParams();
  const id = params.id || undefined;
  const navigate = useRouter();

  if (id && !client) {
    fetch(`http://localhost:3000/clients/${id}`)
      .then((response) => response.json())
      .then((data) => setClient(data))
      .catch((error) => console.error("Erro ao buscar cliente:", error));
  }

  const handleCEPChange = (
    cep: string,
    index: number,
    addressList: any[],
    setAddressFieldValue: any
  ) => {
    console.log(cep);

    if (cep.length === 8 && /^\d+$/.test(cep)) {
      // Faz a requisição para a API ViaCEP
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          if (!data.erro) {
            const newAdrress = {
              street: data.logradouro,
              number: "",
              city: data.localidade,
              state: data.uf,
              zipCode: data.cep,
              country: "Brasil",
            };

            addressList[index] = newAdrress;
            setAddressFieldValue("addresses", addressList);
          }
        })
        .catch((error) => console.error("Erro ao buscar endereço:", error));
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Formulário de cliente</h1>

      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <Formik
            initialValues={{ ...initialValues, ...client }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              saveClient(values)
                .then(() => {
                  resetForm();
                  /*   alert("Cor salva com sucesso!"); */
                  setClient(undefined);
                  navigate.push("/clientes");
                })
                .catch((error) =>
                  console.error("Erro ao salvar cliente:", error)
                );
            }}
          >
            {({ values, setFieldValue, handleChange, errors, touched }) => (
              <FormikForm>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1">
                    Nome:
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cpf" className="block mb-1">
                    CPF:
                  </label>
                  <Field
                    type="text"
                    id="cpf"
                    name="cpf"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="cpf"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="enable" className="flex items-center">
                    <Field
                      type="checkbox"
                      id="enable"
                      name="enable"
                      className="mr-2"
                    />
                    Ativado
                  </label>
                </div>
                <FieldArray name="addresses">
                  {({ push, remove }) => (
                    <>
                      {values.addresses.map((_, index) => (
                        <div key={index} className="border rounded-md p-3 mb-4">
                          <div className="mb-2">
                            <label
                              htmlFor={`addresses.${index}.zipCode`}
                              className="block mb-1"
                            >
                              Código Postal:
                            </label>
                            <Field
                              type="text"
                              id={`addresses.${index}.zipCode`}
                              name={`addresses.${index}.zipCode`}
                              className="w-full px-3 py-2 border rounded-md"
                              onChange={(e: any) => {
                                handleChange(e);
                                handleCEPChange(
                                  e.target.value,
                                  index,
                                  values.addresses,
                                  setFieldValue
                                );
                              }}
                            />
                            <ErrorMessage
                              name={`addresses.${index}.zipCode`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor={`addresses.${index}.street`}
                              className="block mb-1"
                            >
                              Rua:
                            </label>
                            <Field
                              type="text"
                              id={`addresses.${index}.street`}
                              name={`addresses.${index}.street`}
                              className="w-full px-3 py-2 border rounded-md"
                            />
                            <ErrorMessage
                              name={`addresses.${index}.street`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor={`addresses.${index}.number`}
                              className="block mb-1"
                            >
                              Número:
                            </label>
                            <Field
                              type="text"
                              id={`addresses.${index}.number`}
                              name={`addresses.${index}.number`}
                              className="w-full px-3 py-2 border rounded-md"
                            />
                            <ErrorMessage
                              name={`addresses.${index}.number`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor={`addresses.${index}.city`}
                              className="block mb-1"
                            >
                              Cidade:
                            </label>
                            <Field
                              type="text"
                              id={`addresses.${index}.city`}
                              name={`addresses.${index}.city`}
                              className="w-full px-3 py-2 border rounded-md"
                            />
                            <ErrorMessage
                              name={`addresses.${index}.city`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor={`addresses.${index}.state`}
                              className="block mb-1"
                            >
                              Estado:
                            </label>
                            <Field
                              type="text"
                              id={`addresses.${index}.state`}
                              name={`addresses.${index}.state`}
                              className="w-full px-3 py-2 border rounded-md"
                            />
                            <ErrorMessage
                              name={`addresses.${index}.state`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="mb-2">
                            <label
                              htmlFor={`addresses.${index}.country`}
                              className="block mb-1"
                            >
                              País:
                            </label>
                            <Field
                              type="text"
                              id={`addresses.${index}.country`}
                              name={`addresses.${index}.country`}
                              className="w-full px-3 py-2 border rounded-md"
                            />
                            <ErrorMessage
                              name={`addresses.${index}.country`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 font-semibold"
                          >
                            Remover Endereço
                          </button>
                        </div>
                      ))}
                      {touched.addresses && values.addresses.length === 0 && (
                        <div className="text-red-500">
                          O cliente precisa ter pelo menos um endereço
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            street: "",
                            number: "",
                            city: "",
                            state: "",
                            zipCode: "",
                            country: "Brasil",
                          })
                        }
                        className="text-blue-500 font-semibold"
                      >
                        Adicionar Endereço
                      </button>
                    </>
                  )}
                </FieldArray>
                <br />
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
