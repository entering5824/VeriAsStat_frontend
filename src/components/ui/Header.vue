<template>
  <header class="floating-header">
    <div class="header-container">
      <div class="liquid-glass-bar">
        <!-- Logo Section -->
        <div class="logo-section">
          <div class="logo-wrapper">
            <img src="/genshin-impact.svg" alt="App Logo" class="logo" />
          </div>
          <h1 class="app-title">VeriAsStat</h1>
        </div>
        
        <!-- Navigation Items -->
        <nav class="nav-items">
          <RouterLink class="nav-item" to="/">
            <span class="nav-text">Home</span>
          </RouterLink>
          <RouterLink class="nav-item" to="/versions">
            <span class="nav-text">Versions</span>
          </RouterLink>
          <RouterLink class="nav-item" to="/characters">
            <span class="nav-text">Characters</span>
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped src="../../assets/styles/components/HeaderFloating.css"></style>


