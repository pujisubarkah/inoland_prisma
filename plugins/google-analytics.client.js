export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const gaId = runtimeConfig.public.googleAnalyticsId
  
  // Skip in development
  if (process.dev) {
    return
  }

  // Add Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', gaId)
})
