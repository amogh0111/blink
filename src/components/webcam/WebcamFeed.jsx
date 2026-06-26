import { useEffect } from 'react'
import LandmarkCanvas from './LandmarkCanvas'
import BlinkCounter from './BlinkCounter'

function WebcamFeed({ videoRef, streamRef, results, blinkCount, onStop }) {
  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [videoRef, streamRef])

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full scale-x-[-1] rounded-2xl"
        />

        <LandmarkCanvas videoRef={videoRef} results={results} />

        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          Live
        </div>

        <button
          onClick={onStop}
          className="absolute right-3 top-3 rounded-lg border border-red-400/30 bg-red-400/15 px-3 py-1 text-xs font-medium text-red-400 transition hover:bg-red-400/25"
        >
          ■ Stop
        </button>
      </div>

      <BlinkCounter count={blinkCount} />
    </div>
  )
}

export default WebcamFeed