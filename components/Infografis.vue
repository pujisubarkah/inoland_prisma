<!-- components/Infografis.vue -->
<template>  <div class="carousel-container">
    <h1 class="font-poppins font-bold text-2xl md:text-3xl text-center my-4 md:my-5 px-4">
      INFOGRAFIS INOVASI
    </h1>
    <hr class="w-20 md:w-24 h-0.5 bg-gradient-to-r from-blue-700 via-black to-blue-700 mx-auto mb-6 md:mb-8 border-none" />
    
    <!-- Search and Filter Section -->
    <div v-if="!loading && !error && images.length > 0" class="max-w-4xl mx-auto px-3 md:px-4 mb-6 md:mb-8">
      <div class="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
        <div class="flex flex-col gap-3 md:gap-4">
          <!-- Search Input -->
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Cari infografis..." 
              class="w-full pl-9 md:pl-10 pr-4 py-3 text-sm md:text-base border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <!-- Filter Dropdown -->
            <div class="relative flex-1 sm:flex-none">
              <select 
                v-model="selectedFilter"
                class="w-full sm:w-auto appearance-none bg-white border border-gray-200 rounded-lg md:rounded-xl px-4 py-3 pr-8 text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="">Semua Kategori</option>
                <option v-for="category in availableCategories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
            
            <!-- Results count -->
            <div class="text-xs md:text-sm text-gray-600 text-center sm:text-left">
              {{ filteredImages.length }} dari {{ images.length }} infografis
            </div>
          </div>
        </div>
      </div>
    </div>      <!-- Loading State dengan animasi yang lebih menarik -->
    <div v-if="loading" class="flex flex-col justify-center items-center py-16 md:py-20 px-4">
      <div class="relative">
        <!-- Animated circles -->
        <div class="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-blue-200"></div>
        <div class="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0" style="animation-duration: 2s;"></div>
        <div class="animate-ping rounded-full h-3 w-3 md:h-4 md:w-4 bg-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div class="mt-4 md:mt-6 text-center">
        <h3 class="text-base md:text-lg font-semibold text-gray-700 mb-2">Memuat Infografis</h3>
        <p class="text-gray-500 text-xs md:text-sm">Mohon tunggu sebentar...</p>
        <div class="flex justify-center mt-3 space-x-1">
          <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
          <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
          <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
        </div>
      </div>
    </div>    <!-- Error State dengan desain yang lebih menarik -->
    <div v-else-if="error" class="text-center py-16 md:py-20 max-w-md mx-auto px-4">
      <div class="bg-gradient-to-br from-red-50 to-pink-50 p-6 md:p-8 rounded-xl md:rounded-2xl border border-red-100 shadow-lg">
        <!-- Error Icon -->
        <div class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
          <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        
        <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-3">Oops! Terjadi Kesalahan</h3>
        <p class="text-red-600 mb-2 font-medium text-sm md:text-base">{{ error }}</p>
        <div class="text-xs text-gray-600 mb-4 md:mb-6 p-2 md:p-3 bg-gray-50 rounded-lg border text-left">{{ errorDetails }}</div>
        
        <button 
          @click="fetchImages"
          class="inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg md:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Coba Lagi
        </button>
      </div>
    </div>    <!-- Empty State dengan desain yang lebih menarik -->
    <div v-else-if="images.length === 0" class="text-center py-16 md:py-20 max-w-lg mx-auto px-4">
      <div class="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 md:p-8 rounded-xl md:rounded-2xl border border-orange-100 shadow-lg">
        <!-- Empty Icon -->
        <div class="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
          <svg class="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        
        <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-3">Belum Ada Infografis</h3>
        <p class="text-orange-600 mb-3 md:mb-4 text-sm md:text-base">Saat ini belum ada infografis yang tersedia untuk ditampilkan.</p>
        <p class="text-xs md:text-sm text-gray-600">Silakan kembali lagi nanti atau hubungi administrator untuk informasi lebih lanjut.</p>
        
        <button 
          @click="fetchImages"
          class="mt-4 md:mt-6 inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-orange-500 to-yellow-600 text-white rounded-lg md:rounded-xl hover:from-orange-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Muat Ulang
        </button>
      </div>
    </div>    <!-- Image Gallery -->
    <div v-else-if="images.length > 0" class="max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6">
      <!-- No results from search/filter -->
      <div v-if="filteredImages.length === 0" class="text-center py-12 md:py-16">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-xl md:rounded-2xl border border-blue-100 shadow-lg max-w-md mx-auto">
          <div class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-3">Tidak Ditemukan</h3>
          <p class="text-blue-600 mb-3 md:mb-4 text-sm md:text-base">Tidak ada infografis yang sesuai dengan pencarian Anda.</p>
          <button 
            @click="() => { searchQuery = ''; selectedFilter = '' }"
            class="inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg md:rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Reset Filter
          </button>
        </div>
      </div>

      <!-- Grid dengan breakpoints yang lebih halus -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6"><div 
          v-for="(image, index) in filteredImages" 
          :key="image.id"
          class="bg-white rounded-lg md:rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden cursor-pointer group transition-all duration-500 ease-out transform hover:-translate-y-1 hover:scale-[1.02] hover:border-blue-200 touch-target"
          @click="openModal(image)"
        >
          <!-- Image Container dengan aspect ratio yang konsisten -->
          <div class="relative aspect-[4/5] bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"><!-- Image -->
            <img 
              :src="image.link" 
              :alt="image.nama || `Infografis ${index + 1}`"
              class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              :class="{
                'opacity-0 scale-95': !imageStates[image.id]?.loaded && !imageStates[image.id]?.error,
                'opacity-100 scale-100': imageStates[image.id]?.loaded
              }"
              @load="() => handleImageLoad(image.id)"
              @error="() => handleImageError(image.id)"
              loading="lazy"
            />            <!-- Loading State dengan desain yang lebih menarik -->
            <div 
              v-if="!imageStates[image.id]?.loaded && !imageStates[image.id]?.error"
              class="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex items-center justify-center"
            >
              <div class="text-center text-white p-2 md:p-4">
                <div class="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg class="w-6 h-6 md:w-8 md:h-8 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                  </svg>
                </div>
                <div class="flex justify-center items-center space-x-1 mb-1 md:mb-2">
                  <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                  <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                  <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                </div>
                <p class="text-xs font-medium opacity-90 hidden sm:block">Memuat gambar...</p>
              </div>
            </div>            <!-- Error State dengan desain yang lebih baik -->
            <div 
              v-if="imageStates[image.id]?.error"
              class="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-500 to-red-600 flex items-center justify-center"
            >
              <div class="text-center text-white p-2 md:p-4">
                <div class="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg class="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>
                  </svg>
                </div>
                <p class="text-xs md:text-sm font-medium opacity-90">Gagal memuat</p>
                <p class="text-xs opacity-70 mt-1 hidden sm:block">Klik untuk coba lagi</p>
              </div>
            </div>            <!-- Hover Overlay dengan efek yang lebih smooth -->
            <div 
              v-if="imageStates[image.id]?.loaded"
              class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
            >
              <div class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <div class="bg-white bg-opacity-20 backdrop-blur-md rounded-full p-3 md:p-4 shadow-lg">
                  <svg class="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <p class="text-white text-xs md:text-sm mt-2 md:mt-3 text-center font-semibold drop-shadow-lg hidden sm:block">Lihat Detail</p>
              </div>
            </div>
          </div>          <!-- Image Info Card dengan desain yang lebih menarik -->
          <div class="p-3 md:p-4 bg-gradient-to-t from-gray-50 to-white">
            <h3 class="font-semibold text-gray-800 mb-2 md:mb-3 line-clamp-2 text-xs md:text-sm lg:text-base leading-tight group-hover:text-blue-600 transition-colors duration-300">
              {{ image.nama || 'Infografis' }}
            </h3>
            
            <!-- Stats dan Action dalam satu baris -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2 md:space-x-3 text-xs text-gray-500">
                <!-- View indicator -->
                <div class="flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  <span class="hidden sm:inline">Lihat</span>
                </div>
                
                <!-- Size indicator jika tersedia -->
                <div v-if="image.file_size" class="flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
                  </svg>
                  <span class="hidden sm:inline">{{ formatFileSize(image.file_size) }}</span>
                </div>
              </div>
              
              <!-- Action Button -->
              <div class="group-hover:bg-blue-50 group-hover:text-blue-600 p-1.5 md:p-2 rounded-lg transition-colors duration-300">
                <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    <!-- Modal dengan animasi yang lebih halus -->
    <Transition name="modal" appear>
      <div 
        v-if="showModal" 
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2 sm:p-4"
        @click="closeModal"
      >
        <!-- Modal Container dengan animasi -->
        <div 
          class="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden transform transition-all duration-300"
          @click.stop
        >
        <!-- Toolbar -->
        <div class="absolute top-2 right-2 md:top-4 md:right-4 z-20">
          <div class="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2 flex items-center space-x-2 md:space-x-3">
            <!-- Zoom Controls -->
            <div class="flex items-center space-x-1 md:space-x-2">
              <button 
                @click="zoomOut"
                :disabled="zoomLevel <= 0.5"
                class="text-white hover:text-gray-300 disabled:text-gray-500 transition-colors p-1 rounded-lg hover:bg-white hover:bg-opacity-10 disabled:cursor-not-allowed"
                title="Perkecil"
              >
                <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9"/>
                </svg>
              </button>
              
              <span class="text-white text-xs md:text-sm font-medium min-w-8 md:min-w-12 text-center">
                {{ Math.round(zoomLevel * 100) }}%
              </span>
              
              <button 
                @click="zoomIn"
                :disabled="zoomLevel >= 3"
                class="text-white hover:text-gray-300 disabled:text-gray-500 transition-colors p-1 rounded-lg hover:bg-white hover:bg-opacity-10 disabled:cursor-not-allowed"
                title="Perbesar"
              >
                <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v6m3-3H9"/>
                </svg>
              </button>
              
              <button 
                @click="resetZoom"
                class="text-white hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-white hover:bg-opacity-10"
                title="Reset Zoom"
              >
                <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </button>
            </div>
            
            <!-- Download Button -->
            <button 
              @click="downloadImage"
              class="text-white hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-white hover:bg-opacity-10"
              title="Download"
            >
              <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </button>
            
            <!-- Close Button -->
            <button 
              @click="closeModal"
              class="text-white hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-white hover:bg-opacity-10"
              title="Tutup (ESC)"
            >
              <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Image Container -->
        <div 
          ref="modalContainer"
          class="relative overflow-auto max-h-[60vh] md:max-h-[70vh] bg-gray-50"
          @wheel="handleWheel"
        >
          <div 
            class="flex items-center justify-center p-2 md:p-4"
            :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }"
          >
            <img 
              ref="modalImage"
              :src="selectedImage?.link" 
              :alt="selectedImage?.nama"
              class="max-w-full max-h-full h-auto rounded-lg shadow-lg cursor-move"
              :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }"
              @mousedown="startDrag"
              @mousemove="onDrag"
              @mouseup="endDrag"
              @mouseleave="endDrag"
              @click.stop
              @dragstart.prevent
              style="max-height: 50vh; object-fit: contain;"
            />
            
            <!-- Loading overlay for modal image -->
            <div 
              v-if="modalImageLoading"
              class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg"
            >
              <div class="text-gray-600 text-center">
                <div class="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-2 border-blue-600 border-t-transparent mx-auto mb-2 md:mb-3"></div>
                <p class="text-sm md:text-base">Memuat gambar...</p>
              </div>
            </div>
          </div>
        </div>        <!-- Image Info -->
        <div class="p-4 md:p-6 bg-white border-t border-gray-100">
          <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-2">{{ selectedImage?.nama || 'Infografis' }}</h3>
          <div class="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-gray-600">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
              </svg>
              {{ selectedImage?.jenis_dokumen || 'Infografis' }}
            </div>
            <div v-if="selectedImage?.created_at" class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
              </svg>
              {{ formatDate(selectedImage.created_at) }}
            </div>
          </div>
        </div>

        <!-- Zoom Hint -->
        <div v-if="zoomLevel > 1" class="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <div class="bg-blue-600 bg-opacity-90 text-white text-xs px-2 md:px-3 py-1.5 md:py-2 rounded-lg shadow-lg">
            💡 <span class="hidden sm:inline">Scroll untuk zoom • Drag untuk menggeser</span><span class="sm:hidden">Zoom aktif</span>
          </div>
        </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'

// Reactive state
const images = ref([])
const loading = ref(false)
const error = ref('')
const errorDetails = ref('')
const showModal = ref(false)
const selectedImage = ref(null)
const modalImageLoading = ref(false)

// Search and filter state
const searchQuery = ref('')
const selectedFilter = ref('')

// Zoom and Pan states
const zoomLevel = ref(1)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const dragOffset = ref({ x: 0, y: 0 })

// Refs
const modalContainer = ref(null)
const modalImage = ref(null)

// Track individual image states
const imageStates = reactive({})

// Computed properties
const availableCategories = computed(() => {
  const categories = images.value
    .map(img => img.jenis_dokumen)
    .filter(cat => cat && cat.trim())
    .filter((cat, index, arr) => arr.indexOf(cat) === index)
  return categories.sort()
})

const filteredImages = computed(() => {
  let filtered = images.value

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(img => 
      (img.nama && img.nama.toLowerCase().includes(query)) ||
      (img.jenis_dokumen && img.jenis_dokumen.toLowerCase().includes(query))
    )
  }

  // Filter by category
  if (selectedFilter.value) {
    filtered = filtered.filter(img => img.jenis_dokumen === selectedFilter.value)
  }

  return filtered
})

// Initialize image state
const initImageState = (imageId) => {
  imageStates[imageId] = {
    loaded: false,
    error: false
  }
}

// Methods
const fetchImages = async () => {
  loading.value = true
  error.value = ''
  errorDetails.value = ''
  
  try {
    console.log('[Infografis] Fetching data from /api/infografis')
    
    const response = await $fetch('/api/infografis', {
      timeout: 15000,
      retry: 1
    })
    
    console.log('[Infografis] API Response received')
    
    // Validasi response
    if (!response) {
      throw new Error('Response kosong dari server')
    }
    
    if (response.success !== true) {
      throw new Error(`API error: ${response.message || 'Unknown error'}`)
    }
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Data tidak ditemukan atau format tidak valid')
    }
    
    // Filter item yang valid
    const validItems = response.data.filter(item => {
      const isValid = item && 
                     item.id && 
                     item.link && 
                     typeof item.link === 'string' && 
                     item.link.trim().length > 0
      
      if (!isValid) {
        console.warn('[Infografis] Invalid item:', item)
      }
      
      return isValid
    })
    
    console.log(`[Infografis] Loaded ${validItems.length} valid images`)
    
    images.value = validItems
    
    // Initialize image states
    validItems.forEach(image => {
      initImageState(image.id)
    })
    
    if (validItems.length === 0) {
      error.value = 'Tidak ada item valid ditemukan'
      errorDetails.value = `Total items: ${response.data.length}, Valid: 0`
    }
    
  } catch (err) {
    console.error('[Infografis] Fetch error:', err)
    
    error.value = 'Gagal memuat infografis'
    errorDetails.value = `Error: ${err.message}\nStatus: ${err.status || 'unknown'}`
    
    // Specific error handling
    if (err.status === 404) {
      error.value = 'API endpoint tidak ditemukan'
    } else if (err.status === 500) {
      error.value = 'Server error'
    } else if (err.name === 'FetchError') {
      error.value = 'Gagal terhubung ke server'
    }
  } finally {
    loading.value = false
  }
}

const handleImageLoad = (imageId) => {
  console.log('[Infografis] ✅ Image loaded:', imageId)
  
  if (imageStates[imageId]) {
    imageStates[imageId].loaded = true
    imageStates[imageId].error = false
  }
}

const handleImageError = (imageId) => {
  console.error('[Infografis] ❌ Image failed to load:', imageId)
  
  if (imageStates[imageId]) {
    imageStates[imageId].loaded = false
    imageStates[imageId].error = true
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return ''
  }
}

const formatFileSize = (bytes) => {
  if (!bytes) return ''
  
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  
  if (i === 0) return `${bytes} ${sizes[i]}`
  
  const size = (bytes / Math.pow(1024, i)).toFixed(1)
  return `${size} ${sizes[i]}`
}

// Modal methods dengan lazy loading
const openModal = (image) => {
  selectedImage.value = image
  showModal.value = true
  modalImageLoading.value = true
  zoomLevel.value = 1
  dragOffset.value = { x: 0, y: 0 }
  
  document.body.style.overflow = 'hidden'
  
  // Preload image untuk modal
  const img = new Image()
  img.onload = () => {
    modalImageLoading.value = false
  }
  img.onerror = () => {
    modalImageLoading.value = false
  }
  img.src = image.link
}

const closeModal = () => {
  showModal.value = false
  selectedImage.value = null
  modalImageLoading.value = false
  zoomLevel.value = 1
  dragOffset.value = { x: 0, y: 0 }
  isDragging.value = false
  document.body.style.overflow = 'auto'
}

// Zoom methods
const zoomIn = () => {
  if (zoomLevel.value < 3) {
    zoomLevel.value = Math.min(3, zoomLevel.value + 0.25)
  }
}

const zoomOut = () => {
  if (zoomLevel.value > 0.5) {
    zoomLevel.value = Math.max(0.5, zoomLevel.value - 0.25)
  }
}

const resetZoom = () => {
  zoomLevel.value = 1
  dragOffset.value = { x: 0, y: 0 }
  if (modalContainer.value) {
    modalContainer.value.scrollTop = 0
    modalContainer.value.scrollLeft = 0
  }
}

// Wheel zoom
const handleWheel = (event) => {
  event.preventDefault()
  const delta = event.deltaY > 0 ? -0.1 : 0.1
  const newZoom = Math.max(0.5, Math.min(3, zoomLevel.value + delta))
  zoomLevel.value = newZoom
}

// Drag methods
const startDrag = (event) => {
  if (zoomLevel.value > 1) {
    isDragging.value = true
    dragStart.value = {
      x: event.clientX - dragOffset.value.x,
      y: event.clientY - dragOffset.value.y
    }
  }
}

const onDrag = (event) => {
  if (isDragging.value && zoomLevel.value > 1) {
    dragOffset.value = {
      x: event.clientX - dragStart.value.x,
      y: event.clientY - dragStart.value.y
    }
  }
}

const endDrag = () => {
  isDragging.value = false
}

// Download method
const downloadImage = () => {
  if (selectedImage.value?.link) {
    const link = document.createElement('a')
    link.href = selectedImage.value.link
    link.download = `${selectedImage.value.nama || 'infografis'}.png`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Keyboard shortcuts
const handleKeydown = (event) => {
  if (!showModal.value) return
  
  switch (event.key) {
    case 'Escape':
      closeModal()
      break
    case '+':
    case '=':
      event.preventDefault()
      zoomIn()
      break
    case '-':
      event.preventDefault()
      zoomOut()
      break
    case '0':
      event.preventDefault()
      resetZoom()
      break
  }
}

// Lifecycle
onMounted(() => {
  console.log('[Infografis] Component mounted')
  fetchImages()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
img {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Card hover effects */
.group:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative {
  transform: scale(0.8) translateY(20px);
  opacity: 0;
}

.modal-leave-to .relative {
  transform: scale(0.8) translateY(20px);
  opacity: 0;
}

/* Modal scrollbar styling */
.overflow-auto::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7);
}

/* Custom scrollbar for main content */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Prevent text selection while dragging */
.cursor-grabbing {
  user-select: none;
}

/* Responsive grid improvements */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  
  .touch-target {
    min-height: 44px;
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
}

@media (min-width: 1280px) {
  .grid {
    gap: 1.5rem;
  }
}

/* Loading animation improvements */
@keyframes bounce-dots {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-bounce {
  animation: bounce-dots 1.4s infinite ease-in-out both;
}

/* Hover effects yang lebih halus */
.group:hover .bg-gradient-to-t {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), transparent);
}

/* Badge animations */
.group:hover span {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>