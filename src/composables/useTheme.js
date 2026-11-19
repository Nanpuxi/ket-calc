import { ref, watchEffect } from 'vue'
import { getSettings, saveSettings } from '../utils/storage'

const theme = ref(getSettings().theme || 'system')

function apply(t) {
  if (typeof document === 'undefined') return
  const dark =
    t === 'dark' ||
    (t === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

export function useTheme() {
  watchEffect(() => apply(theme.value))

  const setTheme = t => {
    theme.value = t
    saveSettings({ theme: t })
  }

  return { theme, setTheme }
}
