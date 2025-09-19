'use client'

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { User, Phone, Mail, ShoppingBag, Clock, Users, TrendingUp, Calendar } from "lucide-react";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  lastPurchase: string | null;
  lastAccess: string | null;
  created_at?: string;
};

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<{ clients: Client[] }>("http://localhost:3001/admin/clients", {
          withCredentials: true, // garante envio de cookie
        });

        setClients(res.data.clients);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const axiosErr = err as AxiosError<{ message: string }>;
          if (axiosErr.response?.status === 401) {
            setError("Não autorizado. Faça login novamente.");
          } else {
            setError("Erro ao buscar clientes");
          }
          console.error("Erro Axios:", axiosErr.response?.data || axiosErr.message);
        } else {
          setError("Erro inesperado");
          console.error("Erro desconhecido:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase()) ||
    client.phone.includes(search)
  );

  const totalClientes = clients.length;
  const totalCompras = clients.reduce((acc, c) => acc + (c.totalPurchases || 0), 0);
  const clientesAtivos = clients.filter(c => c.lastAccess !== null).length;
  const mediaCompras = totalClientes > 0 ? (totalCompras / totalClientes).toFixed(1) : "0";
  const novosClientesMes = clients.filter(c => {
    if (!c.created_at) return false;
    const created = new Date(c.created_at);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  return (
    <section className="p-6 space-y-6">
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <Users className="text-indigo-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Total de Clientes</p>
            <p className="text-2xl font-bold text-gray-900">{totalClientes}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <ShoppingBag className="text-green-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Total de Compras</p>
            <p className="text-2xl font-bold text-gray-900">{totalCompras}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <Clock className="text-orange-500" size={32} />
          <div>
            <p className="text-sm text-gray-500">Clientes Ativos</p>
            <p className="text-2xl font-bold text-gray-900">{clientesAtivos}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <TrendingUp className="text-purple-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Média de Compras</p>
            <p className="text-2xl font-bold text-gray-900">{mediaCompras}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <Calendar className="text-red-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Novos no Mês</p>
            <p className="text-2xl font-bold text-gray-900">{novosClientesMes}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-50">Lista de Clientes</h2>
        <input
          type="text"
          placeholder="Pesquisar por nome, email ou telefone..."
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-80"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center py-10">Carregando...</p>
      ) : filteredClients.length === 0 ? (
        <p className="text-center py-10">Nenhum cliente encontrado.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Compras</th>
                <th>Última Compra</th>
                <th>Último Acesso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-900">
              {filteredClients.map((client, index) => (
                <tr
                  key={client.id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition-colors`}
                >
                  <td className="px-4 py-3 flex items-center gap-2">
                    <User className="text-indigo-500" size={18} /> {client.name}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Mail className="text-green-500" size={16} /> {client.email}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Phone className="text-blue-500" size={16} /> {client.phone}
                  </td>
                  <td className="px-4 py-3 text-center font-medium">{client.totalPurchases}</td>
                  <td className="px-4 py-3 text-center">{formatDate(client.lastPurchase)}</td>
                  <td className="px-4 py-3 text-center">{formatDate(client.lastAccess)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
