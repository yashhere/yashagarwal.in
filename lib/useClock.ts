import { useEffect, useState } from "react"

const useClock: any = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [timing, setTiming] = useState({
    updateSeconds: {},
    updateMinutes: {},
    updateHours: {},
  })

  const updateTime = () => {
    setCurrentTime(new Date())
  }

  useEffect(() => {
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setTiming({
      updateSeconds: {
        transform: `rotate(${currentTime.getSeconds() * 6}deg)`,
      },
      updateMinutes: {
        transform: `rotate(${currentTime.getMinutes() * 6}deg)`,
      },
      updateHours: {
        transform: `rotate(${
          currentTime.getHours() * 30 + currentTime.getMinutes() / 2
        }deg)`,
      },
    })
  }, [currentTime])

  return timing
}

export default useClock
