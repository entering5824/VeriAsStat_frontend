/**
 * Game Config Composable
 * Provides game-related utilities and configuration
 */

import { /* computed */ } from 'vue'
import { GAME_LIST, GAMES, toApiGameCode, fromApiGameCode } from '../config/games'

export function useGameConfig() {
  /**
   * Get game name by code
   */
  const getGameName = (gameCode: string): string => {
    const gameMap: Record<string, string> = {
      'GI': 'Genshin Impact',
      'HSR': 'Honkai: Star Rail',
      'ZZZ': 'Zenless Zone Zero'
    }
    return gameMap[gameCode] || gameCode
  }

  /**
   * Get game color by code
   */
  const getGameColor = (gameCode: string): string => {
    const colorMap: Record<string, string> = {
      'GI': '#f78d60',
      'HSR': '#f75270',
      'ZZZ': '#ffdbb6'
    }
    return colorMap[gameCode] || '#8b5cf6'
  }

  /**
   * Get game icon path by code
   */
  const getGameIcon = (gameCode: string): string => {
    const iconMap: Record<string, string> = {
      'GI': '/images/gi_icon.jpeg',
      'HSR': '/images/hsr_icon.png',
      'ZZZ': '/images/zzz_icon.png'
    }
    return iconMap[gameCode] || '/images/gi_icon.jpeg'
  }

  return {
    gameList: GAME_LIST,
    games: GAMES,
    toApiGameCode,
    fromApiGameCode,
    getGameName,
    getGameColor,
    getGameIcon
  }
}

