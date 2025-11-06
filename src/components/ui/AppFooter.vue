<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">VeriAsStat</h3>
        <p class="footer-desc">Track game versions and character builds across Genshin Impact, Honkai: Star Rail, and Zenless Zone Zero.</p>
      </div>
      
      <div class="footer-section">
        <h4 class="section-title">Games</h4>
        <ul class="footer-links">
          <li><a href="#" @click.prevent="navigate('genshin')">Genshin Impact</a></li>
          <li><a href="#" @click.prevent="navigate('hsr')">Honkai: Star Rail</a></li>
          <li><a href="#" @click.prevent="navigate('zzz')">Zenless Zone Zero</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4 class="section-title">Resources</h4>
        <ul class="footer-links">
          <li><a href="/versions">All Versions</a></li>
          <li><a href="https://github.com/entering5824" target="_blank">GitHub</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">© 2025 VeriAsStat. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigate = (game: string) => {
  router.push({ path: '/versions', query: { game } })
}
</script>

<style scoped src="../../assets/styles/components/AppFooter.css"></style>


