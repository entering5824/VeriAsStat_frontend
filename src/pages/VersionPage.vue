<template>
  <div>

    <!-- Main content -->
    <main>
      <div class="sort-toolbar">
          <v-select
            v-model="sortMode"
            :items="sortOptions"
            hide-details
            density="comfortable"
            variant="outlined"
            class="sort-select"
            label="Sort"
          />
        </div>
      <div v-if="currentView === 'home'" class="h-full version-page">

        <!-- Sort toolbar (home view) -->

        <GameColumn
          :game="'GI'"
          :color="GAME_CFG.genshin.color"
          :title="GAME_CFG.genshin.name"
          :subtitle="GAME_CFG.genshin.subtitle"
          :versions="visibleVersionData.GI || []"
        />

        <GameColumn
          :game="'HSR'"
          :color="GAME_CFG.hsr.color"
          :title="GAME_CFG.hsr.name"
          :subtitle="GAME_CFG.hsr.subtitle"
          :versions="visibleVersionData.HSR || []"
        />

        <GameColumn
          :game="'ZZZ'"
          :color="GAME_CFG.zzz.color"
          :title="GAME_CFG.zzz.name"
          :subtitle="GAME_CFG.zzz.subtitle"
          :versions="visibleVersionData.ZZZ || []"
        />
      </div>

      <div v-else-if="currentView === 'game' && selectedGame" >
        <v-tabs v-model="activeTab" background-color="transparent" grow>
          <v-tab value="versions">Versions</v-tab>
        </v-tabs>

        <div class="game-toolbar">
          <div>
            <h2>{{ GAME_CFG[selectedGameType].name }} - {{ activeTab === 'versions' ? 'Game Versions' : 'Character Builds' }}</h2>
            <div class="game-subtitle">{{ activeTab === 'versions' ? 'Track updates and releases' : 'Manage your character configurations' }}</div>
          </div>
          <div class="toolbar-actions">
            <v-select
              v-model="sortMode"
              :items="sortOptions"
              hide-details
              density="comfortable"
              variant="outlined"
              class="sort-select"
              label="Sort"
            />
          </div>
        </div>

        <div v-if="activeTab === 'versions'" class="game-grid-versions">
          <div v-for="v in sortedGameVersions" :key="v._id || v.id">
            <VersionCard :version="v" :color="GAME_CFG[selectedGameType].color" />
          </div>
        </div>

          <div v-else class="builds-section" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import GameColumn from '../components/game/GameColumn.vue'
import VersionCard from '../components/version/VersionCard.vue'
import { useVersionPage } from '../composables/useVersionPage'
import { GAMES as GAME_CFG } from '../config/games'

const {
  currentView,
  selectedGame,
  selectedGameType,
  activeTab,
  sortMode,
  sortOptions,
  visibleVersionData,
  sortedGameVersions
} = useVersionPage()

// Read-only: no modal/editing state
</script>
