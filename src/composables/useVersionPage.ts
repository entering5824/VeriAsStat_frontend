/**
 * Version Page Composable
 * Handles version page logic: fetching, sorting, filtering, and CRUD operations
 */

import { ref, reactive, computed, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { GAME_ORDER, toApiGameCode, fromApiGameCode } from '../config/games'
import type { GameVersion } from '../types'

export type SortMode = 'ver-asc' | 'ver-desc' | 'date-desc' | 'date-asc' | 'az' | 'za'

export function useVersionPage() {
  // const router = useRouter()
  
  const versionData: Record<string, GameVersion[]> = reactive({ GI: [], HSR: [], ZZZ: [] })
  const buildData: Record<string, any[]> = reactive({ GI: [], HSR: [], ZZZ: [] })
  
  const loading = ref(false)
  const currentView = ref<'home' | 'game'>('home')
  const selectedGame = ref<string | null>(null)
  const activeTab = ref<string>('versions')
  const sortMode = ref<SortMode>('ver-asc')

  const selectedGameType = computed(() => fromApiGameCode(selectedGame.value || 'GI') || 'genshin')

  const sortOptions = [
    { title: 'Version: Low → High', value: 'ver-asc' },
    { title: 'Version: High → Low', value: 'ver-desc' },
    { title: 'Date: Newest', value: 'date-desc' },
    { title: 'Date: Oldest', value: 'date-asc' },
    { title: 'Name: A → Z', value: 'az' },
    { title: 'Name: Z → A', value: 'za' }
  ]

  /**
   * Fetch versions for all games
   */
  const fetchVersions = async () => {
    loading.value = true
    const games = GAME_ORDER.map(toApiGameCode)
    
    for (const game of games) {
      try {
        const { versionService } = await import('../services/versionService')
        const data = await versionService.getVersions(game)
        versionData[game] = Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load versions for', game, err)
        versionData[game] = []
      }
    }
    
    loading.value = false
  }

  /**
   * Helper functions for sorting
   */
  // accept undefined because array indexing may produce undefined in TS strict check
  const toTime = (v?: GameVersion) => new Date(v?.release_date || v?.releaseDate || 0).getTime() || 0
  const toName = (v?: GameVersion) => String(v?.version || '').toLowerCase()
  
  const parseVer = (s: string) => (s?.match(/\d+/g) || []).map(n => parseInt(n, 10))
  const cmpVer = (va: number[], vb: number[]) => {
    const len = Math.max(va.length, vb.length)
    for (let i = 0; i < len; i++) {
      const a = va[i] ?? 0
      const b = vb[i] ?? 0
      if (a !== b) return a - b
    }
    return 0
  }

  const compare = (a: GameVersion, b: GameVersion) => {
    switch (sortMode.value) {
      case 'ver-asc': 
        return cmpVer(parseVer(String(a?.version || '')), parseVer(String(b?.version || '')))
      case 'ver-desc': 
        return cmpVer(parseVer(String(b?.version || '')), parseVer(String(a?.version || '')))
      case 'az': 
        return toName(a).localeCompare(toName(b))
      case 'za': 
        return toName(b).localeCompare(toName(a))
      case 'date-asc': 
        return toTime(a) - toTime(b)
      case 'date-desc':
      default: 
        return toTime(b) - toTime(a)
    }
  }

  /**
   * Get visible version data (from closest version to today, then sorted)
   */
  const visibleVersionData = computed(() => {
    const out: Record<string, GameVersion[]> = { GI: [], HSR: [], ZZZ: [] }
    const now = Date.now()
    const games = GAME_ORDER.map(toApiGameCode)
    
    for (const code of games) {
      const arr = Array.isArray(versionData[code]) ? versionData[code] : []
      
      // Sort all versions by date ascending first
      const sorted = [...arr].sort((a, b) => toTime(a) - toTime(b))
      
      if (sorted.length === 0) {
        out[code] = []
        continue
      }
      
      // Find the closest version to today
      let closestIndex = 0
      let minDiff = Math.abs(toTime(sorted[0]) - now)
      
      for (let i = 1; i < sorted.length; i++) {
        const diff = Math.abs(toTime(sorted[i]) - now)
        if (diff < minDiff) {
          minDiff = diff
          closestIndex = i
        }
      }
      
      // Return from closest version to end, then apply user's selected sort
      const fromClosest = sorted.slice(closestIndex)
      out[code] = fromClosest.sort(compare)
    }
    
    return out
  })

  /**
   * Get sorted game versions for selected game
   */
  const sortedGameVersions = computed(() => {
    const g = selectedGame.value
    const arr = g ? (versionData[g] || []) : []
    
    // Sort all versions by date ascending first
    const sorted = [...arr].sort((a, b) => toTime(a) - toTime(b))
    
    // If there are no versions, return an empty array
    if (sorted.length === 0) return []

    // Find the closest version to today
    const now = Date.now()
    let closestIndex = 0
    let minDiff = Math.abs(toTime(sorted[0]) - now)
    
    for (let i = 1; i < sorted.length; i++) {
      const diff = Math.abs(toTime(sorted[i]) - now)
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = i
      }
    }
    
    // Return from closest version to end, then apply user's selected sort
    const fromClosest = sorted.slice(closestIndex)
    return fromClosest.sort(compare)
  })

  /**
   * Get builds for selected game
   */
  const gameBuilds = computed(() => {
    return selectedGame.value ? (buildData[selectedGame.value] || []) : []
  })

  /**
   * Navigation handlers
   */
  // Read-only: no create/edit navigation

  /**
   * CRUD operations
   */
  // Read-only: no delete/edit for versions or builds

  onMounted(() => {
    fetchVersions()
  })

  return {
    versionData,
    buildData,
    loading,
    currentView,
    selectedGame,
    selectedGameType,
    activeTab,
    sortMode,
    sortOptions,
    visibleVersionData,
    sortedGameVersions,
    gameBuilds,
    fetchVersions,
    
  }
}

