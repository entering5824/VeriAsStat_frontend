/**
 * Utils: Character helpers
 * 
 * Các helper functions để xử lý character data
 */

import type { Character } from '../types/character'

/**
 * Tạo icon URL từ character name và game
 */
export function getCharacterIconUrl(character: Character): string {
  if ((character as any).imageUrlIcon) return (character as any).imageUrlIcon as string
  if ((character as any).iconPath) return (character as any).iconPath as string
  return '/images/placeholder/character.png'
}

/**
 * Tạo splash art URL từ character
 */
export function getCharacterSplashUrl(character: Character): string {
  if ((character as any).imageUrlSplash) return (character as any).imageUrlSplash as string
  if ((character as any).splashPath) return (character as any).splashPath as string
  return '/images/placeholder/character.png'
}

/**
 * Get fallback icon (placeholder)
 */
export function getFallbackIconUrl(): string {
  return '/images/placeholder/character.png'
}

/**
 * Validate character form data
 */
export function validateCharacterData(data: Partial<Character>): string[] {
  const errors: string[] = []
  
  if (!data.name || data.name.trim() === '') {
    errors.push('Character name is required')
  }
  
  if (!data.game) {
    errors.push('Game selection is required')
  }
  
  return errors
}
