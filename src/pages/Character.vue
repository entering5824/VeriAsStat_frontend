<!-- 
  Component: Character Page
  
  Chức năng: Trang quản lý danh sách nhân vật
  - Hiển thị grid 8 cột
  - Filter theo game (GI/HSR/ZZZ)
  - Navigate đến create/edit page
-->
<template>
  <div class="character-page">
    <!-- Hero Header -->
    <div class="page-hero">
      <div class="hero-content">
        <h1 class="hero-title">Character Catalog</h1>
        <p class="hero-subtitle">Danh sách nhân vật (read-only)</p>
      </div>
    </div>

    <!-- Game Filter -->
    <div class="filter-toolbar">
      <button
        v-for="g in GAMES"
        :key="g"
        class="filter-btn"
        :class="{ active: selectedGame === g }"
        @click="changeGame(g)"
      >
        {{ g }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">Loading...</div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">{{ error }}</div>

    <!-- Character Grid Component -->
    <Character_Grid 
      v-else
      :characters="characters"
      @refresh="loadCharacters"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCharacters } from '../composables/useCharacters'
import { API_GAMES as GAMES } from '../config/games'
import Character_Grid from '../components/character/Character_Grid.vue'

export default defineComponent({
  name: 'CharacterPage',
  components: { Character_Grid },
  setup() {
    const {
      characters,
      loading,
      error,
      selectedGame,
      loadCharacters,
      changeGame,
    } = useCharacters()

    return {
      // Constants
      GAMES,
      
      // State
      characters,
      loading,
      error,
      selectedGame,
      
      // Actions
      loadCharacters,
      changeGame,
    }
  }
})
</script>

<style scoped src="../assets/styles/pages/Character.css"></style>
