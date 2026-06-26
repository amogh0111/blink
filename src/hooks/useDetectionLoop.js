import { useEffect, useRef, useState } from 'react'

function useDetectionLoop(videoRef, landmarkerRef, isModelReady, isActive) {
  const [results, setResults] = useState(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!isModelReady || !isActive) return

    const video = videoRef.current
    if (!video) return

    let lastTimestamp = -1

    function detect(timestamp) {
      if (video.readyState >= 2 && timestamp !== lastTimestamp) {
        const detectionResults = landmarkerRef.current.detectForVideo(video, timestamp)
        setResults(detectionResults)
        lastTimestamp = timestamp
      }
      animationRef.current = requestAnimationFrame(detect)
    }

    animationRef.current = requestAnimationFrame(detect)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isModelReady, isActive, videoRef, landmarkerRef])

  return results
}

export default useDetectionLoop