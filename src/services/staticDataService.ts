/**
 * Static Data Service
 * Load data from public/data/ folder using fetch
 */

import type { Character } from '../types/character'
import type { GameVersion } from '../types'

// Re-export for compatibility with versionService imports
export type { GameVersion }

// Data URLs
const CHARACTERS_URL = '/data/characters.json'
const VERSIONS_URL = '/data/versions.json'

// Simple in-memory caches
let charactersCache: Character[] | null = null
let versionsCache: GameVersion[] | null = null

/**
 * Load characters data from public/data/characters.json
 */
export const loadCharacters = async (): Promise<Character[]> => {
  if (charactersCache) return charactersCache

  const response = await fetch(CHARACTERS_URL, { cache: 'no-cache' })
  if (!response.ok) return []
  const data = await response.json()
  charactersCache = Array.isArray(data) ? (data as Character[]) : []
  return charactersCache
}

/**
 * Load versions data from public/data/versions.json
 */
export const loadVersions = async (): Promise<GameVersion[]> => {
  if (versionsCache) return versionsCache

  const response = await fetch(VERSIONS_URL, { cache: 'no-cache' })
  if (!response.ok) return []
  const data = await response.json()
  versionsCache = Array.isArray(data) ? (data as GameVersion[]) : []
  return versionsCache
}

/**
 * Clear caches
 */
export const clearCache = () => {
  charactersCache = null
  versionsCache = null
}

/** Characters helpers **/
export const getCharactersByGame = async (game?: string): Promise<Character[]> => {
  const characters = await loadCharacters()
  if (!game) return characters
  return characters.filter((c: any) => (c.game || '') === game)
}

export const getCharacterById = async (id: string): Promise<Character | undefined> => {
  const characters = await loadCharacters()
  const sid = String(id)
  return characters.find((c: any) => String((c as any)._id || (c as any).id) === sid)
}

/** Versions helpers **/
export const getVersionsByGame = async (game?: string): Promise<GameVersion[]> => {
  const versions = await loadVersions()
  if (!game) return versions
  const code = (game || '').toUpperCase()
  return versions.filter((v: any) => (v.game || '').toUpperCase() === code)
}

export const getVersionById = async (id: string): Promise<GameVersion | undefined> => {
  const versions = await loadVersions()
  const sid = String(id)
  return versions.find((v: any) => String((v as any)._id || (v as any).id) === sid)
}
