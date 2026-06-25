import { useRef } from 'react'
import WebcamSection from '../components/webcam/WebcamSection'

function Nav() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/80 px-8 py-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-violet-500" />
        <span className="text-lg font-semibold tracking-tight text-white">Blink</span>
      </div>
      <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-violet-400">
        Beta
      </span>
    </nav>
  )
}

function Hero({ onStart }) {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-16 text-center">
      <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
        Computer Vision · In Your Browser
      </p>
      <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tighter text-white">
        Detect blinks.{' '}
        <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          In real time.
        </span>
      </h1>
      <p className="max-w-md text-base leading-relaxed text-white/50">
        Blink uses MediaPipe face landmarks to track your eye movements — entirely
        in the browser, with no data sent to any server.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onStart}
          className="rounded-lg bg-violet-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-violet-400"
        >
          Try it now →
        </button>
        <button className="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-medium text-white/50 transition hover:border-white/20 hover:text-white">
          Learn how it works
        </button>
      </div>
    </div>
  )
}

function HomePage() {
  const cameraRef = useRef(null)

  const scrollToCamera = () => {
    cameraRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-black">
      <Nav />
      <Hero onStart={scrollToCamera} />
      <div ref={cameraRef}>
        <WebcamSection />
      </div>
    </div>
  )
}

export default HomePage