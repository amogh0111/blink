import { useEffect, useRef } from 'react'

function LandmarkCanvas({ videoRef, results }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!results || !canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (results.faceLandmarks) {
      for (const landmarks of results.faceLandmarks) {
        for (const point of landmarks) {
          const x = point.x * canvas.width
          const y = point.y * canvas.height

          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, 2 * Math.PI)
          ctx.fillStyle = 'rgba(167, 139, 250, 0.8)'
          ctx.fill()
        }
      }
    }
  }, [results, videoRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full scale-x-[-1]"
    />
  )
}

export default LandmarkCanvas