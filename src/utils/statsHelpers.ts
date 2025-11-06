/**
 * Utils: Stats formatting
 * 
 * Helpers để format và display stats
 */

import { PERCENT_STATS } from '../config/games'

/**
 * Format stat value - thêm % nếu cần
 */
export function formatStatValue(
  statKey: string, 
  value: number | string | undefined
): string {
  if (value === undefined || value === null || value === '') {
    return '-'
  }
  
  const isPercent = PERCENT_STATS.includes(statKey)
  return isPercent ? `${value}%` : String(value)
}

/**
 * Parse stat value từ input (remove % nếu có)
 */
export function parseStatValue(value: string): number | undefined {
  if (!value || value.trim() === '') return undefined
  
  const cleaned = value.replace('%', '').trim()
  const num = parseFloat(cleaned)
  
  return isNaN(num) ? undefined : num
}

/**
 * Check xem stat có giá trị không
 */
export function hasStatValue(value: any): boolean {
  return value !== undefined && value !== null && value !== ''
}

/**
 * Round số đến 1 chữ số thập phân
 */
export function roundStat(value: number): number {
  return Math.round(value * 10) / 10
}
