import { useState, useRef, useCallback, useEffect } from 'react'

function useWebcam() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | requesting | active | denied | error
  const [error, setError] = useState(null)

  const start = useCallback(async () => {
    setStatus('requesting')
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setStatus('active')
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setStatus('denied')
        setError('Camera access was denied. Please allow camera permissions and try again.')
      } else {
        setStatus('error')
        setError('Could not access the camera: ' + err.message)
      }
    }
  }, [])

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setStatus('idle')
    setError(null)
  }, [])

  // Cleanup when component unmounts
  useEffect(() => {
    return () => stop()
  }, [stop])

  return { videoRef, streamRef, status, error, start, stop }
}

export default useWebcam