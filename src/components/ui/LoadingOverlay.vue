<template>
  <transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-container">
        <img src="/images/loading.png" alt="Loading..." class="loading-image">
        <div class="loading-spinner"></div>
        <p class="loading-text">Đang tải...</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useLoading } from '../../composables/useLoading'

const { isLoading } = useLoading()
</script>

<style scoped src="../../assets/styles/components/LoadingOverlay.css"></style>


