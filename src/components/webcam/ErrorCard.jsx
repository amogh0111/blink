function ErrorCard({ message, onRetry }) {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-3">
      <div className="w-full rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
        ⚠️ {message}
      </div>
      <button
        onClick={onRetry}
        className="rounded-lg border border-white/10 px-5 py-2 text-sm text-white/50 transition hover:border-white/20 hover:text-white"
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorCard