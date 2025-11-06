<template>
  <div>
    <v-card class="version-card" outlined>
      <div class="version-card-inner">
        <!-- Header with version badge and status -->
        <div class="version-header">
          <div class="version-badge" :style="color ? { background: color } : {}">
            v{{ version.version }}
          </div>
          <div v-if="version.status" class="status-badge" :class="`status-${version.status}`">
            {{ version.status }}
          </div>
          <div class="actions">
            <v-btn icon="mdi-pencil" size="small" variant="text" @click="$emit('edit', version)" />
            <v-btn icon="mdi-delete" size="small" variant="text" color="error" @click="$emit('delete', version._id || version.id)" />
          </div>
        </div>

        <!-- Date and Region info -->
        <div class="version-meta">
          <div class="version-date">
            <v-icon size="small">mdi-calendar</v-icon>
            <span>{{ formatDate(version.release_date || version.releaseDate) }}</span>
          </div>
          <div v-if="version.event_region_main" class="version-region">
            <v-icon size="small">mdi-map-marker</v-icon>
            <span>{{ version.event_region_main }}</span>
          </div>
        </div>

        <!-- Characters Rate-up Section -->
        <div v-if="version.characters_rateup && version.characters_rateup.length > 0" class="characters-section">
          <div class="section-title">Rate-up Characters</div>
          <div class="characters-grid">
            <div 
              v-for="char in version.characters_rateup" 
              :key="char.name" 
              class="character-item"
              @mouseenter="(e) => showSplashArt(char.name, e)"
              @mouseleave="hideSplashArt"
            >
              <div class="character-avatar">
                <img 
                  :src="getCharacterImage(char.name)" 
                  :alt="char.name"
                  @error="handleImageError"
                  loading="lazy"
                />
                <div class="rarity-star" :class="`rarity-${char.rarity?.charAt(0) || '5'}`">
                  {{ formatRarity(char.rarity) }}
                </div>
              </div>
              <div class="character-info">
                <div class="character-name">{{ char.name }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description - Collapsible for long text -->
        <div class="version-desc" :class="{ 'desc-expanded': showFullDesc }">
          <div class="desc-content" @click="toggleDesc">
            {{ version.description }}
          </div>
          <button v-if="isDescLong" class="expand-toggle" @click="toggleDesc">
            {{ showFullDesc ? 'Show less' : 'Show more' }}
          </button>
        </div>
      </div>
    </v-card>

    <!-- Splash Art Viewer -->
    <ImageFull 
      :show="showFullImage" 
      :character-name="selectedCharacter"
      :position="popupPosition"
      @close="hideSplashArt"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import type { PropType } from 'vue'
import ImageFull from '../ui/ImageFull.vue'

export default defineComponent({
  components: {
    ImageFull
  },
  props: {
    version: { type: Object as PropType<any>, required: true },
    color: { type: String, default: '' }
  },
  setup(props) {
    const showFullImage = ref(false)
    const selectedCharacter = ref('')
    const popupPosition = ref({ x: 0, y: 0 })
    const showFullDesc = ref(false)

    const isDescLong = ref(false)

    // Check if description is long (more than ~150 chars)
    const checkDescLength = () => {
      const desc = props.version?.description || ''
      isDescLong.value = desc.length > 150
    }

    // Re-check on mount and when version changes
    watchEffect(() => {
      checkDescLength()
    })

    const toggleDesc = () => {
      if (isDescLong.value) {
        showFullDesc.value = !showFullDesc.value
      }
    }

    const showSplashArt = (characterName: string, event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      
      // Position popup to the right of the item
      const xPos = rect.right + 15
      const yPos = Math.max(20, rect.top + (rect.height / 2) - 250)
      
      popupPosition.value = {
        x: xPos,
        y: yPos
      }
      
      selectedCharacter.value = characterName
      showFullImage.value = true
    }

    const hideSplashArt = () => {
      showFullImage.value = false
    }

    const formatDate = (input?: string) => {
      if (!input) return 'N/A'
      const d = new Date(input)
      const t = d.getTime()
      if (isNaN(t)) return 'N/A'
      const dd = String(d.getDate()).padStart(2, '0')
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      const yyyy = d.getFullYear()
      return `${dd}/${mm}/${yyyy}`
    }

    const formatRarity = (rarity?: string) => {
      if (!rarity) return '★5'
      // Convert "5" → "★5", "5(rerun)" → "★5", etc.
      const match = rarity.match(/^(\d)/)
      return match ? `★${match[1]}` : rarity
    }

    const getCharacterImage = (name: string) => {
      // Remove rarity info like "5★", "(rerun)" from the name
      const cleanName = name.replace(/\s*\d+★.*$/i, '').replace(/\s*\(.*?\)\s*/g, '').trim()
      // Convert character name to lowercase and replace spaces with underscores
      const sanitizedName = cleanName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
      // Use game-specific path: /images/characters/{game}/{character_name}.png
      const game = props.version.game || 'GI'
      return `/images/characters/${game}/${sanitizedName}.png`
    }

    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement
      // Hide broken image icon
      img.style.display = 'none'
    }

    return { 
      formatDate, 
      formatRarity,
      getCharacterImage, 
      handleImageError,
      showFullImage,
      selectedCharacter,
      popupPosition,
      showSplashArt,
      hideSplashArt,
      showFullDesc,
      isDescLong,
      toggleDesc
    }
  }
})
</script>

