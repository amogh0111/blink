import useWebcam from '../../hooks/useWebcam'
import useFaceLandmarker from '../../hooks/useFaceLandmarker'
import useDetectionLoop from '../../hooks/useDetectionLoop'
import useBlinkDetector from '../../hooks/useBlinkDetector'
import CameraPermissionCard from './CameraPermissionCard'
import WebcamFeed from './WebcamFeed'
import ErrorCard from './ErrorCard'
import StatusRow from './StatusRow'

function WebcamSection() {
  const { videoRef, streamRef, status, error, start, stop } = useWebcam()
  const { landmarkerRef, isReady: isModelReady } = useFaceLandmarker()

  const isActive = status === 'active'

  const results = useDetectionLoop(videoRef, landmarkerRef, isModelReady, isActive)
  const { blinkCount } = useBlinkDetector(results)

  const showPermission = status === 'idle' || status === 'requesting'
  const showFeed = status === 'active'
  const showError = status === 'denied' || status === 'error'

  return (
    <section className="flex flex-col items-center gap-4 px-4 pb-16">
      {showPermission && <CameraPermissionCard status={status} onStart={start} />}
      {showFeed && (
        <WebcamFeed
          videoRef={videoRef}
          streamRef={streamRef}
          results={results}
          blinkCount={blinkCount}
          onStop={stop}
        />
      )}
      {showError && <ErrorCard message={error} onRetry={start} />}
      <StatusRow status={status} isModelReady={isModelReady} blinkCount={blinkCount} />
    </section>
  )
}

export default WebcamSection