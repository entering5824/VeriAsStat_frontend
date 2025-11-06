<!-- 
  Component: Character Item Card
  
  Chức năng: Thẻ nhân vật hiển thị trong grid
  - Icon 25x25px
  - Hover popup với stats
  - Click để edit
-->
<template>
  <div class="character-item-wrap" @click="$emit('edit')">
    <!-- Card cố định chiều cao -->
    <div class="character-item-card">
      <!-- Icon 25x25px -->
      <img
        :src="iconUrl"
        :alt="character.name"
        class="char-icon"
        @error="handleIconError"
      />
      <!-- Tên nhân vật -->
      <div class="char-name">{{ character.name }}</div>
    </div>

    <!-- Hover popup hiển thị stats -->
    <div class="hover-popup">
      <div class="popup-header">
        <img 
          v-if="splashUrl" 
          :src="splashUrl" 
          class="splash-thumb" 
          :alt="`${character.name} splash`" 
          @error="handleSplashError" 
        />
        <span class="popup-title">{{ character.name }}</span>
      </div>
      <div class="popup-body">
        <table class="stats-table" v-if="hasStats">
          <tbody>
            <tr v-for="row in statRows" :key="row.label">
              <td class="stat-label">{{ row.label }}</td>
              <td class="stat-value">{{ row.value }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Fallback nếu không có stats -->
        <div v-else class="no-stats">
          Chưa có thông tin graduation stats
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import type { Character } from '../../types/character'
import { useCharacterStats } from '../../composables/useCharacterStats'
import { getCharacterIconUrl, getCharacterSplashUrl, getFallbackIconUrl } from '../../utils/characterHelpers'

export default defineComponent({
  name: 'CharacterItem',
  props: {
    character: {
      type: Object as PropType<Character>,
      required: true
    }
  },
  emits: ['edit'],
  setup(props) {
    // Sử dụng composable để xử lý stats
    const { hasStats, statRows } = useCharacterStats(props.character)

    // Image URLs
    const iconUrl = computed(() => getCharacterIconUrl(props.character))
    const splashUrl = computed(() => getCharacterSplashUrl(props.character))
    
    /**
     * Handle icon load error - fallback to splash hoặc placeholder
     */
    const handleIconError = (event: Event) => {
      const target = event.target as HTMLImageElement
      const splash = splashUrl.value
      
      if (splash && target.src !== splash) {
        target.src = splash
      } else {
        target.src = getFallbackIconUrl()
      }
    }

    /**
     * Handle splash load error - ẩn ảnh đi
     */
    const handleSplashError = (event: Event) => {
      const target = event.target as HTMLImageElement
      target.style.display = 'none'
    }

    return { 
      hasStats, 
      statRows,
      iconUrl, 
      splashUrl, 
      handleIconError, 
      handleSplashError,
    }
  }
})
</script>

<style scoped src="../../assets/styles/components/CharacterItem.css"></style>
