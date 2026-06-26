import { useEffect, useRef } from 'react'

function LandmarkCanvas({ videoRef, landmarkerRef, isReady }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!isReady) return

    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d')
    let lastTimestamp = 0

    function draw(timestamp) {
      if (video.readyState < 2) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }

      // Match canvas size to video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Only run detection if frame has changed
      if (timestamp !== lastTimestamp) {
        const results = landmarkerRef.current.detectForVideo(video, timestamp)
        lastTimestamp = timestamp

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (results.faceLandmarks) {
          for (const landmarks of results.faceLandmarks) {
            for (const point of landmarks) {
              const x = point.x * canvas.width
              const y = point.y * canvas.height

              ctx.beginPath()
              ctx.arc(x, y, 1.5, 0, 2 * Math.PI)
              ctx.fillStyle = 'rgba(167, 139, 250, 0.8)' // violet
              ctx.fill()
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isReady, videoRef, landmarkerRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full scale-x-[-1]"
    />
  )
}

export default LandmarkCanvas