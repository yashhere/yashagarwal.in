import { useEffect, useState } from "react"

type ClockHook = () => [any, any]

function getISTTime() {
  var localTime = new Date()
  var currentOffset = localTime.getTimezoneOffset()
  var ISTOffset = 330 // IST offset UTC +5:30
  var ISTTime = new Date(
    localTime.getTime() + (ISTOffset + currentOffset) * 60000
  )

  return ISTTime
}

const useClock: ClockHook = () => {
  const [currentTime, setCurrentTime] = useState(getISTTime())
  const [timing, setTiming] = useState({
    updateSeconds: {},
    updateMinutes: {},
    updateHours: {},
  })

  const updateTime = () => {
    setCurrentTime(getISTTime())
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

  return [timing, currentTime]
}

export default useClock
