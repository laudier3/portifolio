'use client'

import { useState } from "react";
import { api } from "@/app/lib/api"; // importa a instância

type CompraForm = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  code_compra: string;
  city: string;
  cep: string;
  street: string;
  state: string;
  number: string;
  district: string;
  apartment_or_house: string;
};

export default function FormCompra({ userId }: { userId: string }) {
  const [form, setForm] = useState<CompraForm>({
    userId,
    name: "",
    email: "",
    phone: "",
    code_compra: "",
    city: "",
    cep: "",
    street: "",
    state: "",
    number: "",
    district: "",
    apartment_or_house: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await api.post("/compra", form); // usa a instância
      setMessage(res.data.message);
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(err.message);
      else setMessage("Erro inesperado");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fields: { name: keyof CompraForm; label: string }[] = [
    { name: "name", label: "Nome" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Telefone" },
    { name: "code_compra", label: "Código da Compra" },
    { name: "city", label: "Cidade" },
    { name: "cep", label: "CEP" },
    { name: "street", label: "Rua" },
    { name: "number", label: "Número" },
    { name: "district", label: "Bairro" },
    { name: "apartment_or_house", label: "Apartamento/Casa" },
    { name: "state", label: "Estado" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 mt-5 bg-white rounded-xl shadow-md max-w-lg mx-auto text-gray-900"
    >
      {message && (
        <p className="text-red-500 font-semibold text-center">{message}</p>
      )}

      {fields.map((field) => (
        <input
          key={field.name}
          name={field.name}
          placeholder={field.label}
          value={form[field.name]}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-3 rounded w-full disabled:opacity-50 hover:bg-indigo-700 transition"
      >
        {loading ? "Processando..." : "Finalizar Compra"}
      </button>
    </form>
  );
}
