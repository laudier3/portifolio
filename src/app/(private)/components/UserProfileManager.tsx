'use client'

import { useEffect, useState } from 'react'
import {
  User2,
  Mail,
  Phone,
  MapPin,
  Save,
  Image,
  Calendar,
  Shield,
  Upload
} from 'lucide-react'
import { api } from '../../lib/api'

interface User {
  name: string
  email: string
  phone: string
  image: string
  age: string
  access: string
}

function InputField({
  icon,
  label,
  name,
  value,
  editable,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  name: string
  value: string
  editable: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
        <div className="mr-2 text-gray-500">{icon}</div>
        {editable ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent outline-none text-gray-800"
          />
        ) : (
          <span className="text-gray-700">{value}</span>
        )}
      </div>
    </div>
  )
}

function TextareaField({
  icon,
  label,
  name,
  value,
  editable,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  name: string
  value: string
  editable: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <div className="flex items-start border rounded-md px-3 py-2 bg-gray-50">
        <div className="mr-2 mt-1 text-gray-500">{icon}</div>
        {editable ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent outline-none text-gray-800 resize-none"
            rows={3}
          />
        ) : (
          <p className="text-gray-700">{value}</p>
        )}
      </div>
    </div>
  )
}

const defaultUser: User = {
  name: '',
  email: '',
  phone: '',
  age: '',
  access: '',
  image: ''
}

export default function UserProfileManager() {
  const [user, setUser] = useState<User>(defaultUser)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/admin')

        const userData = response.data

        console.log('Usuário carregado:', userData)

        const formattedUser: User = {
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          image: userData.image || '',
          age: String(userData.age || ''),
          access: userData.access || '',
        }

        setUser(formattedUser)
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        setError('Falha ao carregar os dados do usuário.')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        image: reader.result as string
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      await api.put('/user', user)
      setSuccess('Perfil atualizado com sucesso!')
      setEditing(false)
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      setError('Erro ao salvar as alterações.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Carregando perfil...</div>
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 text-gray-800">
        <User2 size={24} />
        <h2 className="text-2xl font-bold">Perfil do Usuário</h2>
      </div>

      {/* Upload de Imagem */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Foto de Perfil</label>
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover border"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <Image size={24} />
            </div>
          )}
          {editing && (
            <label className="flex items-center gap-2 cursor-pointer text-sm text-cyan-600 hover:underline">
              <Upload size={16} />
              <span>Selecionar imagem</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <InputField
          icon={<User2 size={18} />}
          label="Nome"
          name="name"
          value={user.name}
          editable={editing}
          onChange={handleChange}
        />

        <InputField
          icon={<Mail size={18} />}
          label="Email"
          name="email"
          value={user.email}
          editable={editing}
          onChange={handleChange}
        />

        <InputField
          icon={<Phone size={18} />}
          label="Telefone"
          name="phone"
          value={user.phone}
          editable={editing}
          onChange={handleChange}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Idade"
          name="age"
          value={user.age}
          editable={editing}
          onChange={handleChange}
        />

        <InputField
          icon={<Shield size={18} />}
          label="Acesso"
          name="access"
          value={user.access}
          editable={false}
          onChange={handleChange}
        />
      </div>

      {error && (
        <p className="text-red-500 text-center text-sm">{error}</p>
      )}

      {success && (
        <p className="text-green-600 text-center text-sm">{success}</p>
      )}

      <div className="flex justify-end gap-4">
        {editing ? (
          <>
            <button
              onClick={() => {
                setEditing(false)
                setError(null)
                setSuccess(null)
              }}
              disabled={saving}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 flex items-center gap-2"
            >
              <Save size={16} />
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Editar Perfil
          </button>
        )}
      </div>
    </div>
  )
}
