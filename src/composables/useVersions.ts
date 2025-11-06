/**
 * Composable for managing game versions
 * Provides reactive state and methods for version operations
 */

import { ref, onMounted } from 'vue'
import { versionService } from '../services/versionService'
import type { GameVersion } from '../types'

export function useVersions(gameCode?: string) {
  const versions = ref<GameVersion[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchVersions = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await versionService.getVersions(gameCode)
      versions.value = Array.isArray(data) ? data : []
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to fetch versions')
      console.error('Failed to fetch versions:', err)
    } finally {
      loading.value = false
    }
  }

  // Read-only: no add/edit/remove

  onMounted(() => {
    fetchVersions()
  })

  return {
    versions,
    loading,
    error,
    fetchVersions,
  }
}

