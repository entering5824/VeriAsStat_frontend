/**
 * Static Data Service
 * Load data from public/data/ folder using fetch
 */

import type { Character } from '../types/character'

export interface GameVersion {
  _id: string
  game: 'GI' | 'HSR' | 'ZZZ'
  version: string
  release_date: string
  description: string
  characters_rateup: Array<{ name: string; rarity: string }>
  event_region_main: string | null
  status: string
}

// Data URLs
const CHARACTERS_URL = '/data/characters.json'
const VERSIONS_URL = '/data/versions.json'

// Cache để tránh load lại nhiều lần
let charactersCache: Character[] | null = null
let versionsCache: GameVersion[] | null = null

/**
 * Load characters data from public/data/characters.json
 */
export const loadCharacters = async (): Promise<Character[]> => {
  if (charactersCache) {
    return charactersCache
  }

  try {
    const response = await fetch(CHARACTERS_URL)
    if (!response.ok) {
      throw new Error(`Failed to load characters: ${response.statusText}`)
    }
    charactersCache = await response.json()
    return charactersCache as Character[]
  } catch (error) {
    console.error('Error loading characters:', error)
    throw error
  }
}

/**
 * Load versions data from public/data/versions.json
 */
export const loadVersions = async (): Promise<GameVersion[]> => {
  if (versionsCache) {
    return versionsCache
  }

  try {
    const response = await fetch(VERSIONS_URL)
    if (!response.ok) {
      throw new Error(`Failed to load versions: ${response.statusText}`)
    }
    versionsCache = await response.json()
    return versionsCache as GameVersion[]
  } catch (error) {
    console.error('Error loading versions:', error)
    throw error
  }
}

/**
 * Clear cache - useful for development or when data is updated
 */
export const clearCache = () => {
  charactersCache = null
  versionsCache = null
}

/**
 * Get characters by game
 */
export const getCharactersByGame = async (game?: string): Promise<Character[]> => {
  const characters = await loadCharacters()
  if (!game) return characters
  return characters.filter(char => char.game === game)
}

/**
 * Get character by ID
 */
export const getCharacterById = async (id: string): Promise<Character | undefined> => {
  const characters = await loadCharacters()
  return characters.find(char => char._id === id)
}

/**
 * Get versions by game
 */
export const getVersionsByGame = async (game?: string): Promise<GameVersion[]> => {
  const versions = await loadVersions()
  if (!game) return versions
  return versions.filter(ver => ver.game === game)
}

/**
 * Get version by ID
 */
export const getVersionById = async (id: string): Promise<GameVersion | undefined> => {
  const versions = await loadVersions()
  return versions.find(ver => ver._id === id)
}
