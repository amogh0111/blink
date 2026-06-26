import { useEffect, useRef, useState } from 'react'

const BLINK_THRESHOLD = 0.40  // score above this = eye is closed
const MIN_BLINK_FRAMES = 1    // must be closed for at least 2 frames to count
const GAZE_THRESHOLD = 0.4  // if looking sideways this much, ignore blink

function useBlinkDetector(results) {
  const [blinkCount, setBlinkCount] = useState(0)
  const isClosedRef = useRef(false)
  const closedFramesRef = useRef(0)

  useEffect(() => {
    if (!results?.faceBlendshapes?.[0]) return

    const blendshapes = results.faceBlendshapes[0].categories
    const leftBlink = blendshapes.find(b => b.categoryName === 'eyeBlinkLeft')?.score ?? 0
    const rightBlink = blendshapes.find(b => b.categoryName === 'eyeBlinkRight')?.score ?? 0
    const avgBlink = (leftBlink + rightBlink) / 2

    const lookOutLeft = blendshapes.find(b => b.categoryName === 'eyeLookOutLeft')?.score ?? 0
    const lookOutRight = blendshapes.find(b => b.categoryName === 'eyeLookOutRight')?.score ?? 0
    const lookInLeft = blendshapes.find(b => b.categoryName === 'eyeLookInLeft')?.score ?? 0
    const lookInRight = blendshapes.find(b => b.categoryName === 'eyeLookInRight')?.score ?? 0
    const isLookingSideways = Math.max(lookOutLeft, lookOutRight, lookInLeft, lookInRight) > GAZE_THRESHOLD

    if (isLookingSideways) return

    if (avgBlink > BLINK_THRESHOLD) {
      closedFramesRef.current += 1
      isClosedRef.current = true
    } else {
      if (isClosedRef.current && closedFramesRef.current >= MIN_BLINK_FRAMES) {
        setBlinkCount(prev => prev + 1)
      }
      isClosedRef.current = false
      closedFramesRef.current = 0
    }
  }, [results])

  return { blinkCount }
}

export default useBlinkDetector