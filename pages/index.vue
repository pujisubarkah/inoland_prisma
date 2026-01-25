<script setup>
definePageMeta({
  layout: "default"
})

const { t } = useI18n()

// Set page title
useHead({
  title: t('homeTitle'),
  meta: [
    { name: 'description', 
    content: t('homeMetaDesc') }
  ]
})

import BeritaSection from '~/components/Berita_slider.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-gray-100 to-cyan-100">    <!-- Animated Title Section -->
    <section class="py-8 sm:py-12 relative overflow-hidden" style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #1d4ed8 50%, #2563eb 75%, #3b82f6 100%);">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-pattern"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 relative">
        <!-- Main Title with Animation -->
        <div class="text-center mb-8 sm:mb-12">
          <div class="relative inline-block mb-4 sm:mb-6">
            <!-- INOLAND Title with Mascot -->
            <div class="flex items-center justify-center gap-3 sm:gap-6 mb-3 sm:mb-4">
              <img src="/ino.png" alt="Inoland Mascot" class="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain animate-bounce" />
              <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-200 tracking-tight">
                INOLAND
              </h1>
              <img src="/ino.png" alt="Inoland Mascot" class="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain animate-bounce animation-delay-300" />
            </div>
            
            <!-- Scrolling Everyone Can Innovate -->
            <div class="overflow-hidden w-full max-w-sm sm:max-w-2xl md:max-w-4xl mx-auto h-10 sm:h-12 flex items-center bg-white/10 rounded-full backdrop-blur-sm border border-white/20 relative">
              <div class="marquee-container">
                <span class="marquee-text text-lg sm:text-xl md:text-2xl font-bold text-cyan-200">
                  {{ t('everyoneCanInnovate') }} • {{ t('everyoneCanInnovate') }} • {{ t('everyoneCanInnovate') }} • {{ t('everyoneCanInnovate') }} • 
                </span>
              </div>
              <!-- Centered underline -->
              <div class="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <p class="text-base sm:text-lg md:text-xl text-blue-100 font-light max-w-2xl sm:max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600 px-4 sm:px-0">
            {{ t('labDesc') }}
          </p>
        </div>

        <!-- Three Feature Boxes - More Compact -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto px-2 sm:px-0">
          <!-- Box 1: Ide Berharga -->
          <div class="group bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-800 sm:col-span-2 md:col-span-1">
            <div class="text-center">
              <div class="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-xl sm:text-2xl group-hover:rotate-12 transition-transform duration-300">
                💡
              </div>
              <h3 class="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-200 transition-colors">
                {{ t('valuableIdea') }}
              </h3>
              <p class="text-blue-100 leading-relaxed text-xs sm:text-sm">
                {{ t('valuableIdeaDesc') }}
              </p>
            </div>
          </div>

          <!-- Box 2: Laboratorium Inovasi -->
          <div class="group bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-1000 sm:col-span-2 md:col-span-1">
            <div class="text-center">
              <div class="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-xl sm:text-2xl group-hover:rotate-12 transition-transform duration-300">
                🔬
              </div>
              <h3 class="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 group-hover:text-purple-200 transition-colors">
                {{ t('innovationLab') }}
              </h3>
              <p class="text-blue-100 leading-relaxed text-xs sm:text-sm">
                {{ t('innovationLabDesc') }}
              </p>
            </div>
          </div>

          <!-- Box 3: Aksi Nyata -->
          <div class="group bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-1200 sm:col-span-2 md:col-span-1">
            <div class="text-center">
              <div class="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-xl sm:text-2xl group-hover:rotate-12 transition-transform duration-300">
                🌱
              </div>
              <h3 class="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 group-hover:text-green-200 transition-colors">
                {{ t('realAction') }}
              </h3>
              <p class="text-blue-100 leading-relaxed text-xs sm:text-sm">
                {{ t('realActionDesc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section><!-- video Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-6">
        <VideoBeranda />
      </div>
    </section>

    <!-- Separator -->
    <section class="py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div class="container mx-auto px-6">
        <div class="flex items-center justify-center">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-blue-400"></div>
          <div class="mx-6 flex items-center space-x-2">
            <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div class="w-2 h-2 bg-blue-300 rounded-full animate-pulse animation-delay-300"></div>
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse animation-delay-600"></div>
          </div>
          <div class="flex-1 h-px bg-gradient-to-r from-blue-400 via-blue-300 to-transparent"></div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ t('innovationMap') }}</h2>
          <p class="text-gray-600">{{ t('mapDesc') }}</p>
        </div>
        <ClientOnly>
          <LeafletMap />
          <template #fallback>
            <div class="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">{{ t('loadingMap') }}</p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <!-- Berita Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-6">
        <BeritaSection />
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <StatsGrid />
      </div>
    </section>

 

 

    <!-- Carousel Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <ClientOnly>
          <Carousel />
          <template #fallback>
            <div class="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">{{ t('loadingCarousel') }}</p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Background pattern */
.bg-pattern {
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0);
  background-size: 30px 30px;
}

/* Marquee animation for scrolling text */
.marquee-container {
  display: flex;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.marquee-text {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 20s linear infinite;
  transform: translateX(100%);
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Bounce animation for mascots */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -15px, 0);
  }
  70% {
    transform: translate3d(0, -8px, 0);
  }
  90% {
    transform: translate3d(0, -3px, 0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Animation keyframes */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation classes */
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-1200 {
  animation-delay: 1.2s;
}

/* Glass effect enhancement */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Custom gradient text */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

.text-transparent {
  color: transparent;
}

/* Pulse animation for the underline */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) scaleX(1);
  }
  50% {
    opacity: 0.7;
    transform: translateX(-50%) scaleX(1.1);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Hover effects for boxes */
.group:hover .group-hover\:rotate-12 {
  transform: rotate(12deg);
}

.group:hover .group-hover\:text-cyan-200 {
  color: rgb(165 243 252);
}

.group:hover .group-hover\:text-purple-200 {
  color: rgb(196 181 253);
}

.group:hover .group-hover\:text-green-200 {
  color: rgb(187 247 208);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .animate-fade-in-up {
    animation-delay: 0.2s;
  }
  
  .animation-delay-300 {
    animation-delay: 0.4s;
  }
  
  .animation-delay-600 {
    animation-delay: 0.6s;
  }
  
  .animation-delay-800 {
    animation-delay: 0.8s;
  }
  
  .animation-delay-1000 {
    animation-delay: 1s;
  }
  
  .animation-delay-1200 {
    animation-delay: 1.2s;
  }
}

/* Legacy styles cleanup */
.animated-title {
  position: relative;
  overflow: hidden;
}
.animate-gradient {
  background: linear-gradient(90deg, #22c55e, #84cc16, #4ade80, #22c55e);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-move 3s linear infinite, floatUpDown 2s ease-in-out infinite, marqueeMove 8s linear infinite;
  display: inline-block;
  white-space: nowrap;
}

@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes floatUpDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes marqueeMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(-40%); }
}

.marquee-text {
  display: inline-block;
  min-width: 100%;
  white-space: nowrap;
  animation: marqueeMove 10s linear infinite;
}

.hero-text {
  text-shadow:
    2px 2px 6px #000,
    0px 0px 2px #000;
  line-height: 1.7;
  letter-spacing: 0.2px;
}

.hero-text-box {
  background: rgba(0,0,0,0.18);
  /* Untuk mobile, background lebih gelap agar teks tetap terbaca */
}

@media (max-width: 640px) {
  .hero-text-box {
    background: rgba(0,0,0,0.32);
  }
}
</style>