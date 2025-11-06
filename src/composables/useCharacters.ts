/**
 * Composable: Quản lý danh sách nhân vật
 * 
 * Chức năng:
 * - Load danh sách nhân vật theo game
 * - Filter theo game (GI, HSR, ZZZ)
 * - Navigation đến trang create/edit
 */

import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { characterService } from '../services/characterService'
import type { GameType } from '../types/character'

export function useCharacters() {
  const characters = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedGame = ref<GameType>('GI')

  /**
   * Load danh sách nhân vật từ API
   */
  const loadCharacters = async (game?: GameType) => {
    loading.value = true
    error.value = null
    
    try {
      const gameFilter = game || selectedGame.value
      const data = await characterService.getCharacters(gameFilter)
      characters.value = data
    } catch (err) {
      error.value = 'Failed to load characters'
      console.error('Load characters error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Thay đổi game filter và reload
   */
  const changeGame = (game: GameType) => {
    if (selectedGame.value !== game) {
      selectedGame.value = game
      loadCharacters(game)
    }
  }

  /**
   * Navigate đến trang tạo nhân vật mới
   */
  // Read-only: no create/edit navigation

  // Auto load on mount
  onMounted(() => loadCharacters())

  return {
    // State
    characters,
    loading,
    error,
    selectedGame,
    
    // Actions
    loadCharacters,
    changeGame,
    
  }
}
