/**
 * Audio Composable
 * Handles background music playback with user interaction and visibility change handling
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useAudio(audioPath: string, options: { volume?: number; loop?: boolean } = {}) {
  const audio = ref<HTMLAudioElement | null>(null)
  const { volume = 0.1, loop = false } = options

  const handleVisibility = () => {
    if (!audio.value) return
    if (document.hidden) {
      audio.value.pause()
    } else {
      audio.value.play().catch(() => {})
    }
  }

  const startMusic = () => {
    audio.value?.play().catch(err => console.log('Autoplay blocked:', err))
    window.removeEventListener('click', startMusic)
    window.removeEventListener('keydown', startMusic)
    window.removeEventListener('scroll', startMusic)
  }

  onMounted(() => {
    // Create audio element
    audio.value = new Audio(audioPath)
    audio.value.loop = loop
    audio.value.volume = volume

    // Listen for first user interaction
    window.addEventListener('click', startMusic)
    window.addEventListener('keydown', startMusic)
    window.addEventListener('scroll', startMusic)

    // Handle visibility changes
    document.addEventListener('visibilitychange', handleVisibility)
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibility)
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }
  })

  return {
    audio
  }
}

