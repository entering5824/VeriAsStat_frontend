/**
 * Character Service
 * Handles character data from static JSON files in public/data/
 */

import { getCharactersByGame, getCharacterById } from './staticDataService'
import type { Character } from '../types/character'

class CharacterService {
  /**
   * Get all characters, optionally filtered by game
   */
  async getCharacters(game?: string): Promise<Character[]> {
    return await getCharactersByGame(game)
  }

  /**
   * Get a single character by ID
   */
  async getCharacter(id: string): Promise<Character> {
    const character = await getCharacterById(id)
    if (!character) {
      throw new Error(`Character with ID ${id} not found`)
    }
    return character
  }

  // Note: This is now read-only service using static JSON data
  // All character data is managed via JSON files in public/data/
}

export const characterService = new CharacterService()

