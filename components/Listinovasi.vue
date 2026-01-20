<template>
  <div class="app">
    <div class="container">
      <div class="box">
        <h1 class="title">TEMUKAN INOVASI</h1>
        <hr class="divider" />

        <div class="search-wrapper">
          <div class="search-box">
            <input
              type="text"
              placeholder="Cari Ide Inovasi/Pemda/Inovator"
              v-model="searchTerm"
            />
            <i class="fas fa-search search-icon"></i>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Memuat data...</p>
        </div>

        <!-- Cards Grid -->
        <div v-else-if="currentInovasi.length" class="cards-grid">
          <div v-for="inovasi in currentInovasi" :key="inovasi.id" class="innovation-card">
            <div class="card-header">
              <div class="card-image">
                <img v-if="inovasi.sdgs?.image" :src="inovasi.sdgs.image" :alt="inovasi.sdgs.sdgs" />
                <div v-else class="no-image">
                  <i class="fas fa-lightbulb"></i>
                </div>
              </div>
              <div class="card-title-section">
                <h3 class="card-title">{{ inovasi.judul_inovasi }}</h3>
                <div class="card-meta">
                  <span class="meta-item">
                    <i class="fas fa-calendar"></i> {{ inovasi.tahun }}
                  </span>
                  <span class="meta-item">
                    <i class="fas fa-map-marker-alt"></i> {{ inovasi.kld }}
                  </span>
                  <span class="meta-item">
                    <i class="fas fa-user"></i> {{ inovasi.inovator }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="card-content">
              <p class="card-description">{{ inovasi.deskripsi }}</p>
              
              <div class="sdgs-badge" v-if="inovasi.sdgs">
                <span class="sdgs-label">{{ inovasi.sdgs.sdgs }}</span>
              </div>
            </div>
            
            <!-- Reviews Section -->
            <div class="reviews-section">
              <div class="reviews-header">
                <h4>Ulasan & Penilaian</h4>
                <div class="rating">
                  <div class="stars">
                    <i v-for="star in 5" :key="star" class="fas fa-star" :class="{ 'filled': star <= getRandomRating() }"></i>
                  </div>
                  <span class="rating-text">{{ getRandomRating() }}/5</span>
                </div>
              </div>
              
              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer-info">
                    <div class="reviewer-avatar">
                      <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="reviewer-details">
                      <span class="reviewer-name">{{ getRandomReviewer() }}</span>
                      <span class="review-date">{{ getRandomDate() }}</span>
                    </div>
                  </div>
                  <div class="review-rating">
                    <i v-for="star in 5" :key="star" class="fas fa-star" :class="{ 'filled': star <= getRandomRating() }"></i>
                  </div>
                </div>
                <p class="review-text">{{ getRandomReview(inovasi.judul_inovasi) }}</p>
              </div>
              
              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer-info">
                    <div class="reviewer-avatar">
                      <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="reviewer-details">
                      <span class="reviewer-name">{{ getRandomReviewer() }}</span>
                      <span class="review-date">{{ getRandomDate() }}</span>
                    </div>
                  </div>
                  <div class="review-rating">
                    <i v-for="star in 5" :key="star" class="fas fa-star" :class="{ 'filled': star <= getRandomRating() }"></i>
                  </div>
                </div>
                <p class="review-text">{{ getRandomReview(inovasi.judul_inovasi) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- No Results -->
        <div v-else-if="!loading" class="no-result">
          <p>Tidak ada inovasi yang ditemukan.</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="error-message">
          <p>{{ error }}</p>
          <button @click="loadInovasi" class="retry-btn">Coba Lagi</button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1 && !loading" class="pagination">
          <button v-if="currentPage > 1" @click="changePage(currentPage - 1)">Prev</button>

          <button
            v-for="page in pagesToShow"
            :key="page"
            :class="{ active: page === currentPage }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <button v-if="currentPage < totalPages" @click="changePage(currentPage + 1)">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Inovasi {
  id: number
  judul_inovasi: string
  sdgs?: {
    image: string
    sdgs: string
  }
  tahun: number
  kld: string
  inovator: string
  deskripsi: string
}

// Reactive State
const inovasiData = ref<Inovasi[]>([])
const currentPage = ref(1)
const itemsPerPage = 5
const searchTerm = ref('')
const loading = ref(false)
const error = ref('')

// Load Data Function
const loadInovasi = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const response = await fetch('/api/inolands')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Validate response data
    if (Array.isArray(data)) {
      inovasiData.value = data
    } else if (data && Array.isArray(data.data)) {
      // Handle case where data is wrapped in an object
      inovasiData.value = data.data
    } else {
      throw new Error('Invalid data format received from API')
    }
    
  } catch (err) {
    console.error('Error fetching inovasi:', err)
    error.value = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data'
    inovasiData.value = []
  } finally {
    loading.value = false
  }
}

// Computed Properties
const filteredInovasi = computed(() => {
  if (!searchTerm.value) return inovasiData.value
  
  const term = searchTerm.value.toLowerCase()
  return inovasiData.value.filter((inovasi) => {
    return (
      inovasi.judul_inovasi?.toLowerCase().includes(term) ||
      inovasi.tahun?.toString().includes(term) ||
      inovasi.kld?.toLowerCase().includes(term) ||
      inovasi.inovator?.toLowerCase().includes(term) ||
      inovasi.deskripsi?.toLowerCase().includes(term) ||
      inovasi.sdgs?.sdgs?.toLowerCase().includes(term)
    )
  })
})

const totalPages = computed(() => Math.ceil(filteredInovasi.value.length / itemsPerPage))

const currentInovasi = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredInovasi.value.slice(start, end)
})

const pagesToShow = computed(() => {
  const pages = []
  const maxPages = 5
  const start = Math.max(1, currentPage.value - 2)
  
  for (let i = 0; i < maxPages && start + i <= totalPages.value; i++) {
    pages.push(start + i)
  }
  
  return pages
})

// Methods
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleSort = (field: keyof Inovasi) => {
  const sortedData = [...inovasiData.value].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]
    
    if (aValue === undefined || aValue === null) return 1
    if (bValue === undefined || bValue === null) return -1
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.toLowerCase().localeCompare(bValue.toLowerCase())
    }
    
    if (aValue < bValue) return -1
    if (aValue > bValue) return 1
    return 0
  })
  
  inovasiData.value = sortedData
}

const getRandomRating = () => {
  return Math.floor(Math.random() * 5) + 1
}

const getRandomReviewer = () => {
  const reviewers = ['Ahmad S.', 'Siti R.', 'Budi P.', 'Maya L.', 'Rizki K.', 'Nina W.', 'Dedi M.', 'Lina T.']
  return reviewers[Math.floor(Math.random() * reviewers.length)]
}

const getRandomDate = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[Math.floor(Math.random() * months.length)]
  const day = Math.floor(Math.random() * 28) + 1
  const year = 2023 + Math.floor(Math.random() * 2)
  return `${day} ${month} ${year}`
}

const getRandomReview = (title: string) => {
  const reviews = [
    `Inovasi ${title} sangat bermanfaat untuk masyarakat. Implementasinya sudah terlihat dampaknya di lapangan.`,
    `Sebagai pegawai pemerintah, saya melihat inovasi ini sangat inovatif dan efisien. Terus dikembangkan!`,
    `Inovasi yang luar biasa! Sudah lama saya tunggu solusi seperti ini. Semoga bisa direplikasi di daerah lain.`,
    `Pendekatan yang kreatif untuk menyelesaikan masalah klasik. Tim inovatornya patut diacungi jempol.`,
    `Dari segi implementasi sudah bagus, tapi perlu monitoring berkelanjutan agar sustainabilitasnya terjaga.`,
    `Inovasi ini menginspirasi saya untuk berinovasi juga. Mudah-mudahan bisa diadopsi secara nasional.`,
    `Sudah terbukti efektif di lapangan. Data menunjukkan peningkatan signifikan dalam pelayanan publik.`
  ]
  return reviews[Math.floor(Math.random() * reviews.length)]
}

// Watchers
watch(searchTerm, () => {
  currentPage.value = 1 // Reset to first page when searching
})

// Lifecycle
onMounted(() => {
  loadInovasi()
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.box {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  margin: 20px 0 10px;
}

.divider {
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, #16578d, black, #16578d);
  margin: 0 auto 20px;
  border: none;
}

.search-wrapper {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.search-box {
  position: relative;
}

.search-box input {
  padding: 10px 10px 10px 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.innovation-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e5e7eb;
}

.innovation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  padding: 20px;
  gap: 16px;
}

.card-image {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  color: #9ca3af;
  font-size: 24px;
}

.card-title-section {
  flex: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #6b7280;
}

.meta-item i {
  color: #9ca3af;
}

.card-content {
  padding: 0 20px 20px;
}

.card-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sdgs-badge {
  display: inline-block;
}

.sdgs-label {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.reviews-section {
  border-top: 1px solid #e5e7eb;
  padding: 20px;
  background: #f9fafb;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.reviews-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars .fa-star {
  color: #d1d5db;
  font-size: 14px;
}

.stars .fa-star.filled {
  color: #fbbf24;
}

.rating-text {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
}

.review-item {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #e5e7eb;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.reviewer-avatar {
  font-size: 32px;
  color: #9ca3af;
}

.reviewer-details {
  display: flex;
  flex-direction: column;
}

.reviewer-name {
  font-weight: 500;
  color: #1f2937;
  font-size: 14px;
}

.review-date {
  font-size: 12px;
  color: #6b7280;
}

.review-rating {
  display: flex;
  gap: 2px;
}

.review-rating .fa-star {
  color: #d1d5db;
  font-size: 12px;
}

.review-rating .fa-star.filled {
  color: #fbbf24;
}

.review-text {
  color: #4b5563;
  line-height: 1.5;
  margin: 0;
  font-size: 14px;
}

.no-result {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination button:hover {
  background-color: #e9e9e9;
}

.pagination button.active {
  background-color: #444;
  color: #fff;
  border-color: #444;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading Styles */
.loading {
  text-align: center;
  padding: 40px 20px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #444;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error Styles */
.error-message {
  text-align: center;
  padding: 20px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 5px;
  margin: 20px 0;
}

.error-message p {
  color: #c33;
  margin-bottom: 10px;
}

.retry-btn {
  background-color: #444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background-color: #555;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-box input {
    width: 100%;
    max-width: 300px;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .card-header {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .card-image {
    width: 60px;
    height: 60px;
  }
  
  .card-content {
    padding: 0 16px 16px;
  }
  
  .reviews-section {
    padding: 16px;
  }
  
  .reviews-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .box {
    padding: 15px;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .search-box input {
    width: 250px;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
  
  .pagination button {
    padding: 6px 10px;
    font-size: 14px;
  }
  
  .card-title {
    font-size: 16px;
  }
  
  .meta-item {
    font-size: 12px;
  }
}
</style>
