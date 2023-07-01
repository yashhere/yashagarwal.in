export const ReadingTime = ({
  minutes,
  words,
}: {
  minutes: number
  words: number
}) => {
  return (
    <span>
      {words.toLocaleString()} words ({minutes.toLocaleString()} minutes)
    </span>
  )
}
