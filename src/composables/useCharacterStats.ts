/**
 * Composable: Xử lý stats của nhân vật
 * 
 * Chức năng:
 * - Kiểm tra nhân vật có stats hay không
 * - Format stats theo từng game (GI, HSR, ZZZ)
 * - Render stat rows cho UI
 */

import { computed } from 'vue'
import type { Character, StatRow, GameType } from '../types/character'

export function useCharacterStats(character: Character) {
  /**
   * Check xem character có graduation stats không
   */
  const hasStats = computed(() => {
    const stats = character.graduationStats || {}
    // Check if graduationStats object exists and has at least one numeric property
    return stats && Object.keys(stats).length > 0 && Object.values(stats).some(v => typeof v === 'number')
  })

  /**
   * Format value với % nếu là stat dạng rate
   */
  const formatStatValue = (value: any, isPercent = false): string | number => {
    // Allow 0 as a valid value
    if (value === undefined || value === null || value === '') return ''
    if (typeof value === 'number') {
      return isPercent ? `${value}%` : value
    }
    return isPercent ? `${value}%` : value
  }

  /**
   * Build stat rows theo game type
   */
  const statRows = computed((): StatRow[] => {
    const game: GameType = character.game || 'GI'
    const stats = character.graduationStats || {}
    const rows: StatRow[] = []

    const pushIf = (label: string, val: any, isPercent = false) => {
      // Allow 0 as a valid value, only skip undefined, null, or empty string
      if (typeof val === 'number' || (val !== undefined && val !== null && val !== '')) {
        rows.push({ 
          label, 
          value: formatStatValue(val, isPercent) 
        })
      }
    }

    // Common stats (all games)
    pushIf('HP', stats.hp)
    pushIf('ATK', stats.atk)
    pushIf('DEF', stats.def)

    // Game-specific stats
    if (game === 'GI') {
      pushIf('Elemental Mastery', stats.em)
      pushIf('CRIT Rate', stats.critRate, true)
      pushIf('CRIT DMG', stats.critDmg, true)
      pushIf('Energy Recharge', stats.er, true)
      pushIf('Healing Bonus', stats.healBonus, true)
      pushIf('Shield Strength', stats.shieldStrength, true)
      pushIf('Elemental DMG Bonus', stats.elementalDmgBonus, true)
    } 
    else if (game === 'HSR') {
      pushIf('SPD', stats.spd)
      pushIf('CRIT Rate', stats.critRate, true)
      pushIf('CRIT DMG', stats.critDmg, true)
      pushIf('Effect Hit Rate', stats.effectHitRate, true)
      pushIf('Effect RES', stats.effectRes, true)
      pushIf('Break Effect', stats.breakEffect, true)
      pushIf('Energy Regen Rate', stats.energyRegen, true)
    } 
    else if (game === 'ZZZ') {
      pushIf('Impact', stats.impact)
      pushIf('Pen Ratio', stats.penRatio, true)
      pushIf('CRIT Rate', stats.critRate, true)
      pushIf('CRIT DMG', stats.critDmg, true)
      pushIf('Energy Regen', stats.energyRegen, true)
      pushIf('Skill Power', stats.skillPower, true)
      pushIf('Anomaly Proficiency', stats.anomalyProficiency)
      pushIf('Anomaly Mastery', stats.anomalyMastery, true)
      pushIf('Anomaly Rate', stats.anomalyRate, true)
      pushIf('Anomaly DMG', stats.anomalyDmg, true)
    }

    return rows
  })

  return {
    hasStats,
    statRows,
    formatStatValue,
  }
}
