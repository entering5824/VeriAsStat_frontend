/**
 * Character Image Upload Composable
 * Handles image upload functionality for character creation/editing
 */

import { ref, reactive } from 'vue'
import { uploadService } from '../services/uploadService'

export interface ImageUploadState {
  icon: {
    file: File | null
    previewUrl: string
    uploadedUrl: string
    uploading: boolean
    error: string
  }
  splash: {
    file: File | null
    previewUrl: string
    uploadedUrl: string
    uploading: boolean
    error: string
  }
}

export function useCharacterImageUpload() {
  const uploadState = reactive<ImageUploadState>({
    icon: {
      file: null,
      previewUrl: '',
      uploadedUrl: '',
      uploading: false,
      error: ''
    },
    splash: {
      file: null,
      previewUrl: '',
      uploadedUrl: '',
      uploading: false,
      error: ''
    }
  })

  const uploadInProgress = ref(false)

  /**
   * Set icon file and create preview
   */
  const setIconFile = (file: File | null) => {
    uploadState.icon.file = file
    uploadState.icon.error = ''
    
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        uploadState.icon.previewUrl = e.target?.result as string
      }
      reader.readAsDataURL(file)
    } else {
      uploadState.icon.previewUrl = ''
    }
  }

  /**
   * Set splash file and create preview
   */
  const setSplashFile = (file: File | null) => {
    uploadState.splash.file = file
    uploadState.splash.error = ''
    
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        uploadState.splash.previewUrl = e.target?.result as string
      }
      reader.readAsDataURL(file)
    } else {
      uploadState.splash.previewUrl = ''
    }
  }

  /**
   * Upload images to backend
   */
  const uploadImages = async (characterName: string, game: string, saveToDb: boolean = false) => {
    if (!uploadState.icon.file && !uploadState.splash.file) {
      throw new Error('At least one image is required')
    }

    uploadInProgress.value = true
    uploadState.icon.uploading = !!uploadState.icon.file
    uploadState.splash.uploading = !!uploadState.splash.file

    try {
      const result = await uploadService.uploadCharacterImages(
        characterName,
        game,
        uploadState.icon.file || undefined,
        uploadState.splash.file || undefined,
        saveToDb
      )

      if (result.success) {
        if (result.imageUrlIcon) {
          uploadState.icon.uploadedUrl = result.imageUrlIcon
        }
        if (result.imageUrlSplash) {
          uploadState.splash.uploadedUrl = result.imageUrlSplash
        }
        
        return result
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Upload failed'
      
      if (uploadState.icon.file) {
        uploadState.icon.error = errorMessage
      }
      if (uploadState.splash.file) {
        uploadState.splash.error = errorMessage
      }
      
      throw error
    } finally {
      uploadState.icon.uploading = false
      uploadState.splash.uploading = false
      uploadInProgress.value = false
    }
  }

  /**
   * Clear icon file
   */
  const clearIcon = () => {
    uploadState.icon.file = null
    uploadState.icon.previewUrl = ''
    uploadState.icon.uploadedUrl = ''
    uploadState.icon.error = ''
  }

  /**
   * Clear splash file
   */
  const clearSplash = () => {
    uploadState.splash.file = null
    uploadState.splash.previewUrl = ''
    uploadState.splash.uploadedUrl = ''
    uploadState.splash.error = ''
  }

  /**
   * Clear all files
   */
  const clearAll = () => {
    clearIcon()
    clearSplash()
  }

  /**
   * Check if ready to upload
   */
  const canUpload = () => {
    return (uploadState.icon.file || uploadState.splash.file) && !uploadInProgress.value
  }

  /**
   * Get uploaded URLs for form submission
   */
  const getUploadedUrls = () => {
    return {
      imageUrlIcon: uploadState.icon.uploadedUrl || '',
      imageUrlSplash: uploadState.splash.uploadedUrl || ''
    }
  }

  return {
    uploadState,
    uploadInProgress,
    setIconFile,
    setSplashFile,
    uploadImages,
    clearIcon,
    clearSplash,
    clearAll,
    canUpload,
    getUploadedUrls
  }
}