<template>
  <div class="carousel-container">
    <div 
      class="carousel-wrapper"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
    >
      <div 
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="(item, index) in news" 
          :key="item.id" 
          class="carousel-slide"
        >          <img
            :src="item.image_url"
            :alt="item.title"
            class="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[600px] object-cover rounded-xl shadow-xl"
            @error="handleImageError"
          />
          <div class="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 bg-black bg-opacity-60 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg backdrop-blur-sm">
            <h3 class="text-sm sm:text-base md:text-lg font-semibold line-clamp-2">{{ item.title }}</h3>
          </div>
        </div>
      </div>
      
      <!-- Navigation Arrows (Desktop) -->
      <button 
        class="carousel-arrow prev"
        @click="prevSlide"
        :disabled="currentIndex === 0"
      >
        ‹
      </button>
      <button 
        class="carousel-arrow next"
        @click="nextSlide"
        :disabled="currentIndex === news.length - 1"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const news = [
  {
    id: 1,
    image_url: "/Khalilurrahman.jpg"
  },
  {
    id: 2,
    image_url: "/herwin.jpg"
  },
  {
    id: 3,
    image_url: "/sutarmiji.jpg"
  }
]

const currentIndex = ref(0)
const isAutoPlay = ref(true)
let autoPlayInterval = null

// Touch/Mouse events
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const threshold = 50 // minimum swipe distance

const handleTouchStart = (e) => {
  startX.value = e.touches[0].clientX
  isDragging.value = true
  pauseAutoPlay()
}

const handleTouchMove = (e) => {
  if (!isDragging.value) return
  currentX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  
  const diffX = startX.value - currentX.value
  
  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
  
  isDragging.value = false
  resumeAutoPlay()
}

// Mouse events for desktop
const handleMouseDown = (e) => {
  startX.value = e.clientX
  isDragging.value = true
  pauseAutoPlay()
}

const handleMouseMove = (e) => {
  if (!isDragging.value) return
  currentX.value = e.clientX
}

const handleMouseUp = () => {
  if (!isDragging.value) return
  
  const diffX = startX.value - currentX.value
  
  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
  
  isDragging.value = false
  resumeAutoPlay()
}

const nextSlide = () => {
  if (currentIndex.value < news.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // Loop back to first
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = news.length - 1 // Loop to last
  }
}

const goToSlide = (index) => {
  currentIndex.value = index
  pauseAutoPlay()
  setTimeout(resumeAutoPlay, 3000) // Resume after 3 seconds
}

const startAutoPlay = () => {
  if (!isAutoPlay.value) return
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 4000)
}

const pauseAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

const resumeAutoPlay = () => {
  setTimeout(() => {
    if (isAutoPlay.value) {
      startAutoPlay()
    }
  }, 2000)
}

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/800x600/gray/white?text=Image+Not+Found'
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  pauseAutoPlay()
})
</script>

<style scoped>
.carousel-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.carousel-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  cursor: grab;
  user-select: none;
}

.carousel-wrapper:active {
  cursor: grabbing;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
}

.carousel-slide {
  min-width: 100%;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

@media (min-width: 640px) {
  .carousel-slide img {
    height: 350px;
  }
}

@media (min-width: 768px) {
  .carousel-slide img {
    height: 400px;
  }
}

@media (min-width: 1024px) {
  .carousel-slide img {
    height: 600px;
  }
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
  padding: 0 1rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(75, 85, 99, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  touch-action: manipulation;
}

@media (min-width: 640px) {
  .carousel-dots {
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .dot {
    width: 12px;
    height: 12px;
  }
}

.dot.active {
  background: #4F46E5;
  transform: scale(1.2);
}

.dot:hover {
  background: #6366F1;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: none;
  touch-action: manipulation;
}

@media (min-width: 640px) {
  .carousel-arrow {
    width: 45px;
    height: 45px;
    font-size: 22px;
  }
}

@media (min-width: 768px) {
  .carousel-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
}

.carousel-arrow:hover:not(:disabled) {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
}

.carousel-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-arrow.prev {
  left: 10px;
}

.carousel-arrow.next {
  right: 10px;
}

@media (min-width: 640px) {
  .carousel-arrow.prev {
    left: 15px;
  }
  
  .carousel-arrow.next {
    right: 15px;
  }
}

@media (min-width: 768px) {
  .carousel-arrow.prev {
    left: 20px;
  }
  
  .carousel-arrow.next {
    right: 20px;
  }
}

/* Mobile touch optimization */
@media (max-width: 767px) {
  .carousel-wrapper {
    touch-action: pan-y pinch-zoom;
  }
  
  .carousel-container {
    padding: 0 0.5rem;
  }
}
</style>