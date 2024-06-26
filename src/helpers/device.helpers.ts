export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
}

export const isIOS = () => {
  const ua = navigator.userAgent

  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

export const isAndroid = () => {
  const ua = navigator.userAgent

  return /android/i.test(ua)
}
