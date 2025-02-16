export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="mb-4 border rounded-lg shadow-sm p-4">
      <div className="flex flex-row items-center justify-between pb-2 border-b">
        <h2 className="text-sm font-medium">{task.title}</h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded hover:bg-gray-200" onClick={() => onEdit(task)}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 11l3.536-3.536m0 0L18.768 5.232a2.5 2.5 0 113.536 3.536l-9.25 9.25H6v-6.25l9.25-9.25z" />
            </svg>
          </button>
          <button className="p-2 rounded hover:bg-gray-200" onClick={() => onDelete(task._id)}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">{task.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 4h10M5 11h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
            </svg>
            <span className="text-xs text-gray-600">{format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
          </div>
          <span className={`px-2 py-1 rounded text-white ${task.status === 'pending' ? 'bg-yellow-500' : task.status === 'progress' ? 'bg-blue-500' : 'bg-green-500'}`}>
            {task.status}
          </span>
        </div>
      </div>
    </div>
  )
}
