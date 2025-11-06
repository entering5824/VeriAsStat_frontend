<template>
  <div class="home-page">
  <!-- Subtle animated background removed: FloatingParticles disabled -->

    <!-- Hero Carousel -->
    <HeroCarousel />

    <!-- Games Grid Section -->
    <section class="games-section">
      <div class="section-header">
        <h2 class="section-title">Games</h2>
        <p class="section-subtitle">Explore versions across all titles</p>
      </div>
      <v-row class="games-row">
        <v-col 
          v-for="g in gameList" 
          :key="g.id" 
          cols="12" sm="6" md="4"
        >
          <div class="game-card-wrapper">
            <GameCard
              :game="g"
              :versionCount="versions.filter(v => v.game === toApiGameCode(g.id as any)).length"
              :buildCount="0"
              @click="selectGame(g.id)"
            />
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- Upcoming Versions Section - GameColumn style -->
    <section class="upcoming-section">
      <div class="section-header">
        <h2 class="section-title">Upcoming Updates</h2>
        <p class="section-subtitle">Next versions for each game</p>
      </div>
      <div class="upcoming-grid">
        <GameColumn
          v-for="game in ['GI', 'HSR', 'ZZZ']"
          :key="game"
          :game="game"
          :color="getGameColor(game)"
          :title="getGameName(game)"
          :subtitle="'Next release'"
          :versions="getUpcomingVersions(game)"
          :hide-add-button="true"
          @edit="onEdit"
          @delete="onDelete"
        />
      </div>
    </section>


  </div>
  
</template>

<script setup lang="ts">
import GameCard from '../components/game/GameCard.vue'
import GameColumn from '../components/game/GameColumn.vue'
import HeroCarousel from '../components/ui/HeroCarousel.vue'
import { useHome } from '../composables/useHome'
import { toApiGameCode } from '../config/games'

const {
  versions,
  gameList,
  getUpcomingVersions,
  selectGame,
  onEdit,
  onDelete,
  getGameName,
  getGameColor
} = useHome()
</script>

 
