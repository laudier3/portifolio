'use client'

import { useState } from 'react'
import Sidebar from '@/app/(private)/components/Sidebar'
import {
  Menu,
  DollarSign,
  ThumbsUp,
  Share2,
  Star,
  UserPlus,
  ShoppingCart,
  TrendingUp,
  Activity
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts'

// Gráfico de vendas
const chartData = [
  { name: 'Jan', sales: 400 },
  { name: 'Fev', sales: 300 },
  { name: 'Mar', sales: 500 },
  { name: 'Abr', sales: 600 },
  { name: 'Mai', sales: 350 },
  { name: 'Jun', sales: 700 },
  { name: 'Jul', sales: 950 },
  { name: 'Ago', sales: 1100 },
  { name: 'Set', sales: 1700 },
  { name: 'Otu', sales: 2300 },
  { name: 'Nov', sales: 3000 },
]

// Usuários ativos
const usersData = [
  { name: 'Jan', users: 200 },
  { name: 'Fev', users: 500 },
  { name: 'Mar', users: 700 },
  { name: 'Abr', users: 900 },
  { name: 'Mai', users: 600 },
  { name: 'Jun', users: 1200 },
  { name: 'Jul', users: 1500 },
]

// Conversões
const conversionData = [
  { name: 'Semana 1', conversions: 50 },
  { name: 'Semana 2', conversions: 75 },
  { name: 'Semana 3', conversions: 120 },
  { name: 'Semana 4', conversions: 90 },
]

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)


  // utils/cookies.ts
  /*function deleteCookie(name: string) {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
  }*/

  return (
    <div className="flex min-h-screen bg-[#f9fafb] md:ms-60">
      {/* Sidebar */}
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Topbar (Mobile) */}
        <header className="bg-white shadow-sm p-4 flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="text-gray-700"
          >
            <Menu size={28} />
          </button>
          <h1 className="ml-4 text-xl font-semibold tracking-tight text-gray-800">
            Dashboard
          </h1>
        </header>
        

        <main className="p-6 space-y-8">
          <div className="flex justify-end">
            <button
              onClick={async () => {
                setLoading(true)
                setModalVisible(true)

                try {
                  // chama backend para limpar o cookie
                  await fetch('http://localhost:3001/logout', {
                    method: 'POST',
                    credentials: 'include', // envia cookies para o backend
                  })
                } catch (err) {
                  console.error("Erro ao deslogar:", err)
                }

                // delay de 3 segundos para mostrar modal
                setTimeout(() => {
                  setLoading(false)
                  setModalVisible(false)
                  window.location.href = '/' // redireciona para home
                }, 3000)
              }}
              disabled={loading}
              className={`mb-4 px-4 py-2 rounded text-white transition ${
                loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {loading ? 'Saindo...' : 'Sair'}
            </button>

            {modalVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center gap-4">
                  <svg
                    className="animate-spin h-8 w-8 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <p className="text-gray-700 font-medium">Saindo da conta...</p>
                </div>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Painel Geral</h1>
           
          {/* Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Earnings"
              value="$628"
              icon={<DollarSign className="text-emerald-500" size={20} />}
            />
            <StatCard
              title="Shares"
              value="2434"
              icon={<Share2 className="text-blue-500" size={20} />}
            />
            <StatCard
              title="Likes"
              value="1259"
              icon={<ThumbsUp className="text-pink-500" size={20} />}
            />
            <StatCard
              title="Rating"
              value="8.5"
              icon={<Star className="text-yellow-500" size={20} />}
            />
            <StatCard
              title="Novos Usuários"
              value="342"
              icon={<UserPlus className="text-purple-500" size={20} />}
            />
            <StatCard
              title="Pedidos"
              value="128"
              icon={<ShoppingCart className="text-orange-500" size={20} />}
            />
            <StatCard
              title="Taxa de Conversão"
              value="4.7%"
              icon={<TrendingUp className="text-green-600" size={20} />}
            />
             <StatCard
              title="Taxa de Probabilidade"
              value="8.7%"
              icon={<Activity className="text-blue-300" size={20} />}
            />
          </section>

          {/* Gráfico de Vendas */}
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Vendas Mensais
              </h2>
              <span className="text-sm text-gray-500">Atualizado agora</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#6366f1' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Gráfico de Usuários Ativos */}
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Usuários Ativos
              </h2>
              <span className="text-sm text-gray-500">Últimos meses</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usersData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="users" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Gráfico de Conversões */}
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Conversões</h2>
              <span className="text-sm text-gray-500">Últimas semanas</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={conversionData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="conversions"
                    stroke="#3b82f6"
                    fill="#93c5fd"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

// Card moderno com ícone
function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
      </div>
    </div>
  )
}
