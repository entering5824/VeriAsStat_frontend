/**
 * Upload Service
 * Handles file uploads to Firebase/Cloudinary via backend API
 */

import { api } from '../utils/api'

export interface UploadCharacterImagesResult {
  success: boolean
  imageUrlIcon?: string
  imageUrlSplash?: string
  error?: string
  results?: {
    icon?: boolean
    splash?: boolean
    imageUrlIcon?: string
    imageUrlSplash?: string
  }
  characterId?: string
  uploadService?: 'firebase' | 'cloudinary'
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export interface UploadOptions {
  characterName: string
  game: string
  displayName?: string
  saveToDb?: boolean
}

class UploadService {
  /**
   * Upload character images (icon and splash art) to Firebase/Cloudinary
   * @param characterName - Character name (used for file naming)
   * @param game - Game code (GI, HSR, ZZZ)
   * @param iconFile - Icon image file
   * @param splashFile - Splash art image file
   * @param saveToDb - Whether to save character to database
   * @param onProgress - Optional progress callback
   */
  async uploadCharacterImages(
    characterName: string,
    game: string,
    iconFile?: File,
    splashFile?: File,
    saveToDb: boolean = false,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadCharacterImagesResult> {
    const formData = new FormData()
    formData.append('characterName', characterName)
    formData.append('game', game)
    
    if (iconFile) {
      formData.append('icon', iconFile)
    }
    if (splashFile) {
      formData.append('splash', splashFile)
    }
    if (saveToDb) {
      formData.append('saveToDb', 'true')
    }

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress({
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              percentage
            })
          }
        }
      })

      if (response.data.success) {
        return {
          success: true,
          imageUrlIcon: response.data.imageUrlIcon || response.data.results?.imageUrlIcon,
          imageUrlSplash: response.data.imageUrlSplash || response.data.results?.imageUrlSplash,
          results: response.data,
          characterId: response.data.characterId,
          uploadService: response.data.uploadService
        }
      } else {
        return {
          success: false,
          error: response.data.error || 'Upload failed'
        }
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Unknown error occurred'
      }
    }
  }

  /**
   * Validate image file before upload
   */
  validateImageFile(file: File, maxSizeMB: number = 10): string | null {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    
    if (!allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed: ${allowedTypes.join(', ')}`
    }
    
    const maxBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxBytes) {
      return `File too large. Max size: ${maxSizeMB}MB (current: ${(file.size / 1024 / 1024).toFixed(2)}MB)`
    }
    
    return null
  }

  /**
   * Get upload service information
   */
  async getUploadInfo() {
    try {
      const response = await api.get('/upload-info')
      return response.data
    } catch (error) {
      console.error('Failed to get upload info:', error)
      return { service: 'firebase', ready: false }
    }
  }
}

export const uploadService = new UploadService()


