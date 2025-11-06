<!-- 
  Component: Character Grid
  
  Chức năng: Lưới hiển thị danh sách nhân vật
  - Grid 8 cột responsive
  - Empty state khi không có nhân vật
  - Emit edit event khi click vào item
-->
<template>
  <div class="character-grid-container">
    <!-- Grid 8 cột -->
    <div class="character-grid">
      <Character_Item
        v-for="char in characters"
        :key="char._id"
        :character="char"
        @edit="$emit('edit', char._id)"
      />
    </div>

    <!-- Empty state nếu không có nhân vật -->
    <div v-if="!characters || characters.length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <p class="empty-text">Chưa có nhân vật nào. Hãy thêm nhân vật đầu tiên!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Character } from '../../types/character'
import Character_Item from './Character_Item.vue'

export default defineComponent({
  name: 'CharacterGrid',
  components: { Character_Item },
  props: {
    characters: {
      type: Array as PropType<Character[]>,
      required: true
    }
  },
  emits: ['edit', 'refresh']
})
</script>

<style scoped src="../../assets/styles/components/CharacterGrid.css"></style>
