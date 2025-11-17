import { useState } from 'react'
import { Check, Pencil, Trash2 } from 'lucide-react'

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [notes, setNotes] = useState(task.notes || '')

  const save = async () => {
    await onUpdate(task.id, { title, notes })
    setEditing(false)
  }

  const toggle = async () => {
    await onUpdate(task.id, { completed: !task.completed })
  }

  return (
    <div className="flex items-start justify-between rounded-lg border border-gray-200 p-3">
      <div className="flex items-start gap-3">
        <input type="checkbox" checked={task.completed} onChange={toggle} className="mt-1 h-5 w-5" />
        {editing ? (
          <div className="flex flex-col gap-2">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-md border px-2 py-1" />
            <input value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-md border px-2 py-1 text-sm text-gray-600" />
          </div>
        ) : (
          <div>
            <div className="font-medium text-gray-800">
              {task.title}
            </div>
            {task.notes && <div className="text-sm text-gray-500">{task.notes}</div>}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {editing ? (
          <button onClick={save} className="rounded-md bg-green-600 p-2 text-white hover:bg-green-700">
            <Check size={16} />
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="rounded-md bg-gray-100 p-2 text-gray-700 hover:bg-gray-200">
            <Pencil size={16} />
          </button>
        )}
        <button onClick={() => onDelete(task.id)} className="rounded-md bg-red-600 p-2 text-white hover:bg-red-700">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
