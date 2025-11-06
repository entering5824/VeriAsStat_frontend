<template>
  <div class="hero-carousel">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="slide"
      :class="{ active: current === index }"
    >
      <img :src="slide.image" alt="banner" class="slide-bg" />
      <div class="overlay"></div>
      <div class="content">
        <div class="game-info">
          <img :src="slide.icon" alt="icon" class="game-icon" />
          <span class="game-name">{{ slide.category }}</span>
        </div>
        <h2 class="title">{{ slide.title }}</h2>
        <p class="desc">{{ slide.description }}</p>
        <button class="btn">Xem thêm</button>
      </div>
    </div>

    <div class="thumbnails">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="thumb"
        :class="{ active: current === i }"
        @click="current = i"
      >
        <img :src="slide.image" alt="" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const slides = [
    {
    image: '/images/gi.jpeg',
    icon: '/images/gi_icon.jpeg',
    category: 'Genshin Impact',
    title: 'Thế giới mở kỳ ảo với nguyên tố và phiêu lưu bất tận',
    description: 'Khám phá lục địa Teyvat, điều khiển nhiều nhân vật và khai thác sức mạnh nguyên tố trong cuộc hành trình tìm kiếm người thân thất lạc.'
  },
  {
    image: '/images/hsr.jpg',
    icon: '/images/hsr_icon.png',
    category: 'Honkai: Star Rail',
    title: 'Cuộc phiêu lưu vũ trụ trên con tàu Astral Express',
    description: 'Bước vào hành trình xuyên ngân hà, chiến đấu theo lượt cùng những người bạn để khám phá bí ẩn của Stellaron.'
  },

  {
    image: '/images/zzz.jpg',
    icon: '/images/zzz_icon.png',
    category: 'Zenless Zone Zero',
    title: 'Hành động nhịp độ cao giữa thế giới hậu tận thế',
    description: 'Trở thành Proxy tại thành phố New Eridu, chiến đấu phong cách và khám phá những khu vực đầy hỗn loạn gọi là Hollows.'
  }
]

const current = ref(0)

// Tự động chuyển slide
onMounted(() => {
  setInterval(() => {
    current.value = (current.value + 1) % slides.length
  }, 7000)
})
</script>


