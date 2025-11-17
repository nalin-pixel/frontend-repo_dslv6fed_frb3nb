import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      const data = await api('/api/tasks')
      setTasks(data)
    } catch (e) {
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const addTask = async (payload) => {
    try {
      const newTask = await api('/api/tasks', { method: 'POST', body: JSON.stringify(payload) })
      setTasks((prev) => [newTask, ...prev])
    } catch (e) {
      setError('Failed to add task')
    }
  }

  const updateTask = async (id, payload) => {
    try {
      const updated = await api(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (e) {
      setError('Failed to update task')
    }
  }

  const deleteTask = async (id) => {
    try {
      await api(`/api/tasks/${id}`, { method: 'DELETE' })
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (e) {
      setError('Failed to delete task')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
          <p className="text-gray-600">Add, edit, and check off what you need to do</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <TaskForm onAdd={addTask} />
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}
      </div>
    </div>
  )
}

export default App
