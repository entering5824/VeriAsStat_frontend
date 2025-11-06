/**
 * Game Configuration
 * Centralized configuration for all games, their properties, and stat labels
 */

import type { GameType as CharacterGameType } from '../types/character'

// Game type for internal use (lowercase)
export type GameType = 'genshin' | 'hsr' | 'zzz'

// Game type for API (uppercase)
export type ApiGameCode = 'GI' | 'HSR' | 'ZZZ'

export interface Game {
  id: GameType
  name: string
  subtitle: string
  color: string
  apiCode: ApiGameCode
}

export const GAMES: Record<GameType, Game> = {
  genshin: {
    id: 'genshin',
    name: 'Genshin Impact',
    subtitle: 'Action RPG',
    color: '#f78d60',
    apiCode: 'GI'
  },
  hsr: {
    id: 'hsr',
    name: 'Honkai: Star Rail',
    subtitle: 'Turn-based RPG',
    color: '#f75270',
    apiCode: 'HSR'
  },
  zzz: {
    id: 'zzz',
    name: 'Zenless Zone Zero',
    subtitle: 'Urban action',
    color: '#ffdbb6',
    apiCode: 'ZZZ'
  }
}

export const GAME_LIST: Game[] = Object.values(GAMES)
export const GAME_ORDER: GameType[] = ['genshin', 'hsr', 'zzz']

// API code mappings
export const GAME_CODE: Record<GameType, ApiGameCode> = {
  genshin: 'GI',
  hsr: 'HSR',
  zzz: 'ZZZ',
}

export const CODE_TO_GAME: Record<ApiGameCode, GameType> = {
  GI: 'genshin',
  HSR: 'hsr',
  ZZZ: 'zzz',
}

// API game codes array (for character types)
export const API_GAMES: CharacterGameType[] = ['GI', 'HSR', 'ZZZ']

// Game display names (for API codes)
export const GAME_NAMES: Record<CharacterGameType, string> = {
  GI: 'Genshin Impact',
  HSR: 'Honkai: Star Rail',
  ZZZ: 'Zenless Zone Zero',
}

// Stat labels for each game
export const GAME_STAT_LABELS: Record<CharacterGameType, Record<string, string>> = {
  GI: {
    hp: 'HP',
    atk: 'ATK',
    def: 'DEF',
    em: 'Elemental Mastery',
    critRate: 'CRIT Rate',
    critDmg: 'CRIT DMG',
    er: 'Energy Recharge',
    healBonus: 'Healing Bonus',
    shieldStrength: 'Shield Strength',
    elementalDmgBonus: 'Elemental DMG Bonus',
  },
  HSR: {
    hp: 'HP',
    atk: 'ATK',
    def: 'DEF',
    spd: 'SPD',
    critRate: 'CRIT Rate',
    critDmg: 'CRIT DMG',
    effectHitRate: 'Effect Hit Rate',
    effectRes: 'Effect RES',
    breakEffect: 'Break Effect',
    energyRegen: 'Energy Regen Rate',
    elementalDmgBonus: 'DMG Bonus (Elemental)',
  },
  ZZZ: {
    hp: 'HP',
    atk: 'ATK',
    def: 'DEF',
    impact: 'Impact',
    penRatio: 'Pen Ratio',
    critRate: 'Crit Rate',
    critDmg: 'Crit DMG',
    energyRegen: 'Energy Regen',
    skillPower: 'Skill Power',
    anomalyProficiency: 'Anomaly Proficiency',
    anomalyMastery: 'Anomaly Mastery',
    anomalyRate: 'Anomaly Rate',
    anomalyDmg: 'Anomaly DMG',
  },
}

// Stat fields that are percentages
export const PERCENT_STATS = [
  'critRate',
  'critDmg',
  'er',
  'healBonus',
  'shieldStrength',
  'elementalDmgBonus',
  'effectHitRate',
  'effectRes',
  'breakEffect',
  'energyRegen',
  'penRatio',
  'skillPower',
  'anomalyMastery',
  'anomalyRate',
  'anomalyDmg',
]

// Default graduation stats object (all fields)
export const DEFAULT_GRADUATION_STATS = {
  hp: undefined,
  atk: undefined,
  def: undefined,
  critRate: undefined,
  critDmg: undefined,
  em: undefined,
  er: undefined,
  healBonus: undefined,
  shieldStrength: undefined,
  elementalDmgBonus: undefined,
  spd: undefined,
  effectHitRate: undefined,
  effectRes: undefined,
  breakEffect: undefined,
  energyRegen: undefined,
  impact: undefined,
  penRatio: undefined,
  skillPower: undefined,
  anomalyProficiency: undefined,
  anomalyMastery: undefined,
  anomalyRate: undefined,
  anomalyDmg: undefined,
}

// Utility functions
export const toApiGameCode = (id: GameType): ApiGameCode => GAME_CODE[id]
export const fromApiGameCode = (code: string): GameType | null => CODE_TO_GAME[code as ApiGameCode] ?? null


