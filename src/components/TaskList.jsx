import TaskItem from './TaskItem'

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length) {
    return <div className="text-center text-gray-500">No tasks yet. Add your first task above.</div>
  }
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onUpdate={onUpdate} onDelete={onDelete} />)
      )}
    </div>
  )
}
