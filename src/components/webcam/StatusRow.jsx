const pills = [
  { label: 'Camera' },
  { label: 'MediaPipe' },
  { label: 'Detection' },
]

function StatusRow({ status }) {
  return (
    <div className="flex gap-2">
      {pills.map((pill) => {
        const isActive = pill.label === 'Camera' && status === 'active'
        return (
          <div
            key={pill.label}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${
              isActive
                ? 'border-green-400/25 bg-green-400/10 text-green-400'
                : 'border-white/10 bg-white/5 text-white/30'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {pill.label}
          </div>
        )
      })}
    </div>
  )
}

export default StatusRow