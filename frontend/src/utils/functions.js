export const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = Math.floor(timeInSeconds % 60)

    // Add leading zeros to minutes and seconds if less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

    // If there are hours, display as hh:mm:ss, otherwise mm:ss
    return hours > 0
        ? `${hours}:${formattedMinutes}:${formattedSeconds}`
        : `${formattedMinutes}:${formattedSeconds}`
}

export const convertTime = (time) => {
    const minutes = time.split(':')[0]
    const seconds = time.split(':')[1]

    const minsToSeconds = parseInt(minutes) * 60

    return minsToSeconds + parseInt(seconds)
}
