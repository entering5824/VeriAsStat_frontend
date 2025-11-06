/**
 * Home Page Composable
 * Handles home page logic: fetching versions, filtering, and navigation
 */

import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { versionService } from '../services/versionService'
import { useGameConfig } from './useGameConfig'
import type { GameVersion } from '../types'

export function useHome() {
  const router = useRouter()
  const { gameList, toApiGameCode, getGameName, getGameColor } = useGameConfig()
  
  const versions = ref<GameVersion[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch all versions
   */
  const fetchVersions = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await versionService.getVersions()
      versions.value = data
    } catch (e) {
      error.value = 'Failed to fetch versions'
      console.error('Failed to fetch versions', e)
      versions.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Navigate to game versions page
   */
  const selectGame = (id: string) => {
    router.push({ 
      path: '/versions', 
      query: { game: toApiGameCode(id as any) } 
    })
  }

  /**
   * Get upcoming versions for a specific game
   */
  const getUpcomingVersions = (game: string): GameVersion[] => {
    const gameVersions = versions.value.filter(v => v.game === game)
    const now = new Date().getTime()
    
    // Filter future versions only (leak or confirmed) and release date > now
    const upcoming = gameVersions.filter(v => {
      const releaseDate = new Date(v.release_date || 0).getTime()
      const isFuture = releaseDate > now
      const isUpcoming = v.status === 'leak' || v.status === 'confirmed'
      return isFuture && isUpcoming
    })
    
    // Sort by date (earliest first)
    const sorted = upcoming.sort((a, b) => {
      const dateA = new Date(a.release_date || 0).getTime()
      const dateB = new Date(b.release_date || 0).getTime()
      return dateA - dateB
    })
    
    // Return first upcoming version for this game
    return sorted.slice(0, 1)
  }

  /**
   * Navigate to edit version
   */
  const onEdit = (v: GameVersion) => {
    router.push({ 
      path: '/versions', 
      query: { id: v._id || (v as any).id } 
    })
  }

  /**
   * Navigate to delete version
   */
  const onDelete = (id: string) => {
    router.push({ 
      path: '/versions', 
      query: { delete: id } 
    })
  }

  /**
   * Get version count for a game
   */
  const getVersionCount = computed(() => {
    return (gameId: string) => {
      const gameCode = toApiGameCode(gameId as any)
      return versions.value.filter(v => v.game === gameCode).length
    }
  })

  onMounted(() => {
    fetchVersions()
  })

  return {
    versions,
    loading,
    error,
    gameList,
    selectGame,
    getUpcomingVersions,
    onEdit,
    onDelete,
    getVersionCount,
    getGameName,
    getGameColor
  }
}

