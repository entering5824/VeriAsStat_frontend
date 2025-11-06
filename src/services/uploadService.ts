/**
 * Upload Service
 * Handles file uploads to Firebase/Cloudinary via backend API
 * Note: Currently in frontend-only mode - uploads are disabled
 */

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
      // In frontend-only mode, simulate upload functionality
      // This would normally connect to a real backend API
      console.warn('Upload functionality is disabled in frontend-only mode')
      
      // Simulate progress
      if (onProgress) {
        onProgress({ loaded: 50, total: 100, percentage: 50 })
        await new Promise(resolve => setTimeout(resolve, 500))
        onProgress({ loaded: 100, total: 100, percentage: 100 })
      }

      return {
        success: false,
        error: 'Upload functionality is not available in frontend-only mode. Please connect to a backend server to enable uploads.'
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
    // In frontend-only mode, return mock data
    return { 
      service: 'frontend-only', 
      ready: false,
      message: 'Upload functionality requires backend connection'
    }
  }
}

export const uploadService = new UploadService()


