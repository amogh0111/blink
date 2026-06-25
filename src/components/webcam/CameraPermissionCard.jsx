function CameraPermissionCard({ status, onStart }) {
  const isRequesting = status === 'requesting'

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/20 text-2xl">
        📷
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-white">Camera access needed</h2>
        <p className="max-w-xs text-sm leading-relaxed text-white/50">
          Blink uses your webcam to detect blinks in real time. Your video is processed
          locally — nothing is uploaded.
        </p>
      </div>

      <button
        onClick={onStart}
        disabled={isRequesting}
        className="rounded-lg bg-violet-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-violet-400 disabled:opacity-50"
      >
        {isRequesting ? 'Requesting…' : 'Enable camera'}
      </button>

      <p className="text-xs text-white/30">🔒 Video never leaves your device</p>
    </div>
  )
}

export default CameraPermissionCard