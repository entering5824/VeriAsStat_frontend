<template>
  <div class="app-container">
    <!-- Loading Overlay -->
    <LoadingOverlay />
    
    <!-- Header for all pages -->
    <Header />
    
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- AI Chatbot Widget -->
   <!-- <ChatWidget /> tắt chat widget, chỉ thể chạy local vì này chỉ là read only, không gọi API được-->
    <!-- Global Footer inside app root -->
    <AppFooter />
  </div>
</template>

<script setup>
import Header from './components/ui/Header.vue'
import ChatWidget from './components/ui/ChatWidget.vue'
import LoadingOverlay from './components/ui/LoadingOverlay.vue'
import AppFooter from './components/ui/AppFooter.vue'
import { useAudio } from './composables/useAudio'

// Initialize background audio
useAudio('/Cyrene_Theme_Music.mp3', { volume: 0.1, loop: false })
</script>
