<template>
  <v-card class="game-card neon-border clickable" outlined @click="$emit('click')">
    <v-card-text>
      <div class="game-top d-flex align-center justify-space-between">
        <div>
          <div class="game-name" :style="{ color: game.color }">{{ game.name }}</div>
          <div class="game-sub muted">{{ game.subtitle || '' }}</div>
        </div>
        <div class="counts text-right">
          <div class="pill">Versions: {{ versionCount }}</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameCard',
  props: {
    game: { type: Object as any, required: true },
    versionCount: { type: Number, default: 0 },
    buildCount: { type: Number, default: 0 }
  }
})
</script>

