/**
 * Type definitions for Character system
 */

import type { GameKey } from './index'

export type GameType = GameKey

/**
 * Graduation stats structure - chứa tất cả stats của 3 game
 */
export interface GraduationStats {
  // Common stats (tất cả game)
  hp?: number
  atk?: number
  def?: number
  critRate?: number
  critDmg?: number

  // Genshin Impact specific
  em?: number              // Elemental Mastery
  er?: number              // Energy Recharge
  healBonus?: number       // Healing Bonus
  shieldStrength?: number  // Shield Strength
  elementalDmgBonus?: number // Elemental DMG Bonus

  // Honkai: Star Rail specific
  spd?: number             // Speed
  effectHitRate?: number   // Effect Hit Rate
  effectRes?: number       // Effect RES
  breakEffect?: number     // Break Effect
  energyRegen?: number     // Energy Regen Rate

  // Zenless Zone Zero specific
  impact?: number          // Impact
  penRatio?: number        // Pen Ratio
  skillPower?: number      // Skill Power
  anomalyProficiency?: number // Anomaly Proficiency
  anomalyMastery?: number  // Anomaly Mastery
  anomalyRate?: number     // Anomaly Rate
  anomalyDmg?: number      // Anomaly DMG
}

/**
 * Character model
 */
export interface Character {
  _id?: string
  id?: string
  name: string
  game: GameType
  element?: string
  rarity?: number
  imageUrlIcon?: string    // Firebase Storage public URL for icon
  imageUrlSplash?: string  // Firebase Storage public URL for splash
  // Backward-compat (will be removed):
  iconPath?: string
  splashPath?: string
  graduationStats?: GraduationStats
  createdAt?: string
  updatedAt?: string
}

/**
 * Stat row for displaying in UI
 */
export interface StatRow {
  label: string
  value: string | number
}

/**
 * Character form data (for create/edit)
 */
export interface CharacterFormData extends Omit<Character, '_id' | 'createdAt' | 'updatedAt'> {
  // Form-specific fields nếu cần
}
