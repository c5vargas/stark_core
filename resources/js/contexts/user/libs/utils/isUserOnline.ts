export const isUserOnline = (lastLogin?: string | null, minutesThreshold = 5) => {
  if (!lastLogin) return false
  const last = new Date(lastLogin).getTime()
  const now = Date.now()
  const diffMinutes = (now - last) / 1000 / 60
  return diffMinutes <= minutesThreshold
}
