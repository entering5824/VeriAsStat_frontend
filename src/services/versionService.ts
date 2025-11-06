/**
 * Version Service
 * Handles version data from static JSON files in public/data/
 */

import { getVersionsByGame, getVersionById } from './staticDataService'
import type { GameVersion } from './staticDataService'

class VersionService {
  /**
   * Get all versions, optionally filtered by game
   */
  async getVersions(game?: string): Promise<GameVersion[]> {
    return await getVersionsByGame(game)
  }

  /**
   * Get a single version by ID
   */
  async getVersion(id: string): Promise<GameVersion> {
    const version = await getVersionById(id)
    if (!version) {
      throw new Error(`Version with ID ${id} not found`)
    }
    return version
  }

  // Note: This is now read-only service using static JSON data
  // All version data is managed via JSON files in public/data/
}

export const versionService = new VersionService()

