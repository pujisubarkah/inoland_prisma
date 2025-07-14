<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white px-8 py-8 border-b border-gray-200 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Sebaran Inovasi
          </h1>
          <p class="text-slate-600 text-lg font-normal">
            Peta interaktif sebaran ide inovasi di seluruh Indonesia
          </p>
        </div>
          <!-- Navigation Links -->
        <div class="flex items-center space-x-4">
          <!-- Info Icon Button -->
          <button 
            @click="showInfoModal = true"
            class="p-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            title="Informasi tentang Sebaran Inovasi"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <NuxtLink 
            to="/cari/list_inovasi"
            class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            LIST INOVASI
          </NuxtLink>
          <NuxtLink 
            to="/cari/dashboard_inovasi"
            class="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            DASHBOARD
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-8">
      <div class="bg-white rounded-lg shadow-sm p-6">        <!-- Interactive Map Content -->
        <div class="app">
          <!-- Info Modal Popup -->
          <Dialog v-model:open="showInfoModal">
            <template #content>              <div class="info-modal-box relative">
                <button class="close-btn absolute top-2 right-2" @click="showInfoModal = false">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div class="text-center p-6">
                  <h1 class="text-3xl font-bold text-center mb-6 text-blue-700">SEBARAN IDE INOVASI</h1>
                  <p class="text-center text-gray-700 mt-4 max-w-4xl mx-auto text-base leading-relaxed">
                    Sejak 2015, ribuan ide bermunculan dari berbagai penjuru instansi. 
                    Peta ini bukan sekadar tampilan visual, tapi bukti nyata bahwa semangat inovasi di sektor publik terus hidup dan berkembang.  
                    Ribuan ide telah terpetakan—dan setiap titiknya menyimpan kisah perubahan yang nyata.
                  </p>
                  <p class="text-center text-gray-700 mt-4 max-w-4xl mx-auto text-base leading-relaxed">
                    Dari satu gagasan sederhana hingga solusi berdampak besar, setiap titik di peta ini menyimpan kisah tentang keberanian untuk 
                    berubah, berkreasi, dan melayani lebih baik. Siapa tahu, titik berikutnya akan berasal dari instansimu, memberi warna baru 
                    bagi ekosistem inovasi kita bersama.
                  </p>
                  
                  <hr class="w-1/4 h-1 bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 mx-auto my-6" />
                  
                  <div class="flex justify-center">
                    <button 
                      @click="showInfoModal = false"
                      class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Mulai Jelajahi Peta
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </Dialog>

          <!-- Provinsi Map -->
          <section class="mb-6">
            <div class="relative overflow-hidden rounded-lg shadow-md">
              <svg viewBox="0 0 981.98602 441.06508" width="100%" height="auto" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="grad-blue-high" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#2563eb" stop-opacity="1" />
                    <stop offset="100%" stop-color="#93c5fd" stop-opacity="1" />
                  </linearGradient>
                  <linearGradient id="grad-blue-mid" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3b82f6" stop-opacity="1" />
                    <stop offset="100%" stop-color="#bfdbfe" stop-opacity="1" />
                  </linearGradient>
                  <linearGradient id="grad-blue-low" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#60a5fa" stop-opacity="1" />
                    <stop offset="100%" stop-color="#e0f2fe" stop-opacity="1" />
                  </linearGradient>
                </defs>
                <path
                  v-for="provinsi in provinsis"
                  :key="provinsi.id_provinsi"
                  :d="cleanSvgPath(provinsi.svg_path)"
                  :fill="getChoroplethColor(provinsi.jumlah_inovasi)"
                  stroke="black"
                  stroke-width="0.5"
                  @click="loadKabupaten(provinsi.id_provinsi)"
                  @mouseenter="handleMouseEnter($event, `${provinsi.nama}<br/>Jumlah Ide Inovasi: ${provinsi.jumlah_inovasi}`)"
                  @mouseleave="handleMouseLeave"
                >
                  <title>{{ provinsi.nama }}</title>
                </path>
                <!-- Tooltip Hover -->
                <foreignObject v-if="hoveredArea.visible" :x="svgWidth - 230" :y="10" width="220" height="80">
                  <div class="bg-white border border-blue-400 rounded-lg p-2 shadow-lg text-sm font-semibold text-blue-700">
                    <div v-html="hoveredArea.text"></div>
                  </div>
                </foreignObject>
              </svg>
            </div>
          </section>

          <!-- Popup Kabupaten dengan Dialog shadcn -->
          <Dialog v-model:open="dialogOpen">
            <template #content>              <div class="popup-box relative">                <button class="close-btn absolute top-2 right-2" @click="dialogOpen = false; selectedProvinsi = null; selectedKabkot = null; dialogKabkotIndeks = []; dialogKabkotName = ''; indeksInovasi = []; inovasiKabupaten = []; dialogKabkotInovasi = []; currentPage = 1">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <h1 class="text-xl font-bold mb-2">Peta Kabupaten/Kota di Provinsi {{ selectedProvinceName }}</h1>
                <hr class="my-2" />
                <!-- Table kiri, peta & chart kanan -->
                <div class="flex flex-col md:flex-row gap-6 mb-6">                  <!-- Table Inovasi Kabupaten -->
                  <div class="w-full md:w-1/2">                    <h2 class="font-bold mb-2 text-blue-700 flex items-center justify-between">
                      <span>Daftar Ide Inovasi {{ selectedKabkot ? dialogKabkotName : selectedProvinceName }}</span>
                      <div class="flex items-center gap-2">
                        <button 
                          v-if="selectedKabkot" 
                          @click="resetToProvinceData"
                          class="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                          title="Lihat semua inovasi di provinsi"
                        >
                          Lihat Semua di Provinsi
                        </button>
                      </div>
                    </h2>                    
                    
                    
                    <!-- Info Boxes -->
                    <div class="flex justify-between gap-3 mb-4">
                      <!-- Province Info Box -->
                      <div class="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 text-center">
                        <div class="font-semibold text-blue-800 text-sm mb-1">
                          {{ selectedProvinceName }}
                        </div>
                        <div class="text-blue-600 font-bold text-lg">
                          {{ provinsis.find(p => p.id_provinsi === selectedProvinsi)?.jumlah_inovasi || 0 }} inovasi
                        </div>
                        <div class="text-xs text-blue-500 mt-1">Provinsi</div>
                      </div>
                      
                      <!-- Kabupaten Info Box -->
                      <div class="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm text-center"
                           :class="selectedKabkot ? 'bg-gradient-to-br from-green-50 to-green-100' : 'bg-gradient-to-br from-gray-50 to-gray-100'">
                        <div class="font-semibold text-sm mb-1"
                             :class="selectedKabkot ? 'text-green-800' : 'text-gray-600'">
                          {{ selectedKabkot ? dialogKabkotName : 'Pilih Kabupaten/Kota' }}
                        </div>
                        <div class="font-bold text-lg"
                             :class="selectedKabkot ? 'text-green-600' : 'text-gray-500'">
                          {{ selectedKabkot ? 
                             (kabupaten.find(k => k.id_kabkot === selectedKabkot)?.jumlah_inovasi || 0) + ' inovasi' : 
                             'N/A' 
                          }}
                        </div>
                        <div class="text-xs mt-1"
                             :class="selectedKabkot ? 'text-green-500' : 'text-gray-400'">
                          Kabupaten/Kota
                        </div>
                      </div>
                    </div>

                    <!-- Download Buttons -->
                    <div v-if="dialogKabkotInovasi.length > 0" class="mb-4">
                      <div class="text-sm text-gray-600 mb-2">
                        📊 Tersedia {{ dialogKabkotInovasi.length }} data untuk diunduh
                      </div>
                      <div class="flex flex-wrap gap-2">
                        <button 
                          @click="downloadExcel"
                          :disabled="isDownloading || dialogKabkotInovasi.length === 0"
                          class="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Download data sebagai Excel"
                        >
                          <svg v-if="!isDownloading" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                          </svg>
                          <svg v-else class="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                          </svg>
                          Excel
                        </button>
                        <button 
                          @click="downloadCSV"
                          :disabled="isDownloading || dialogKabkotInovasi.length === 0"
                          class="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Download data sebagai CSV"
                        >
                          <svg v-if="!isDownloading" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                          </svg>
                          <svg v-else class="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                          </svg>
                          CSV
                        </button>
                        <button 
                          @click="downloadPDF"
                          :disabled="isDownloading || dialogKabkotInovasi.length === 0"
                          class="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Download data sebagai PDF"
                        >
                          <svg v-if="!isDownloading" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                          </svg>
                          <svg v-else class="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                          </svg>
                          PDF
                        </button>
                      </div>
                    </div>
                    
                    <!-- Pagination Controls -->
                    <div class="flex justify-between items-center mb-4">
                      <div class="flex items-center gap-2">
                        <label class="text-sm font-medium text-gray-700">Tampilkan:</label>
                        <select v-model="itemsPerPage" @change="currentPage = 1" class="px-3 py-1 border border-gray-300 rounded-md text-sm">
                          <option :value="25">25</option>
                          <option :value="50">50</option>
                          <option :value="100">100</option>
                        </select>
                        <span class="text-sm text-gray-600">dari {{ dialogKabkotInovasi.length }} item</span>
                      </div>
                      
                      <div v-if="totalPages > 1" class="flex items-center gap-1">
                        <button
                          @click="currentPage = Math.max(1, currentPage - 1)"
                          :disabled="currentPage === 1"
                          class="px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ‹
                        </button>
                        
                        <span class="px-3 py-1 text-sm">
                          {{ currentPage }} / {{ totalPages }}
                        </span>
                        
                        <button
                          @click="currentPage = Math.min(totalPages, currentPage + 1)"
                          :disabled="currentPage === totalPages"
                          class="px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                    
                    <div style="max-height:500px;overflow:auto;">
                      <div style="overflow-x:auto;">
                        <Table class="inovasi-table w-full">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Tahun</th>
                              <th>Judul Inovasi</th>
                              <th>SDGS</th>
                              <th>Inovator</th>
                              <th>Deskripsi</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in currentInovasi" :key="item.id">
                              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                              <td>{{ item.tahun }}</td>
                              <td>{{ item.judul_inovasi }}</td>
                              <td>{{ item.sdgs?.nama || '-' }}</td>
                              <td>{{ item.inovator || '-' }}</td>
                              <td>{{ item.deskripsi || 'Tidak ada deskripsi' }}</td>
                            </tr>                            <tr v-if="currentInovasi.length === 0">
                              <td colspan="6" class="text-center text-gray-500 py-4">
                                <div v-if="selectedKabkot">
                                  Tidak ada data inovasi untuk {{ dialogKabkotName }}
                                </div>
                                <div v-else>
                                  Tidak ada data inovasi untuk {{ selectedProvinceName }}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    
                    <!-- Bottom Pagination Info -->
                    <div v-if="dialogKabkotInovasi.length > 0" class="mt-3 text-xs text-gray-600 text-center">
                      Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} - 
                      {{ Math.min(currentPage * itemsPerPage, dialogKabkotInovasi.length) }} 
                      dari {{ dialogKabkotInovasi.length }} total item
                    </div>
                  </div><!-- Peta & Chart Kabupaten -->
                  <div class="w-full md:w-1/2 flex flex-col gap-6 items-center justify-start">                    <div class="overflow-hidden rounded-lg shadow-md w-full relative">
                      <svg viewBox="-100 0 1000 600" height="300" preserveAspectRatio="xMidYMid meet" class="map-kabupaten w-full">
                        <path
                          v-for="kab in kabupaten"
                          :key="kab.id_kabkot"
                          :d="cleanSvgPath(kab.svg_path)"
                          :fill="getChoroplethColor(kab.jumlah_inovasi || 0)"
                          stroke="black"
                          stroke-width="1"
                          @click="showKabupatenChart(kab)"
                          @mouseenter="handleKabupatenMapHover($event, kab)"
                          @mouseleave="handleKabupatenMapLeave"
                        >
                          <title>{{ kab.nama_kabkot }}</title>                        </path>
                        <!-- Tooltip untuk peta kabupaten -->
                        <foreignObject v-if="kabupatenTooltip.visible" :x="kabupatenTooltip.x" :y="kabupatenTooltip.y" width="280" height="100">
                          <div class="bg-white border border-blue-400 rounded-lg p-3 shadow-lg text-base font-semibold text-blue-700 z-50">
                            <div class="mb-1">{{ kabupatenTooltip.nama }}</div>
                            <div class="text-sm text-blue-600">{{ kabupatenTooltip.jumlah }} inovasi</div>
                          </div>
                        </foreignObject>
                      </svg>
                    </div><div class="bg-white rounded-lg shadow p-6 animate-fadeIn w-full">
                      <h2 class="font-bold mb-4 text-blue-700 text-lg">
                        Indeks {{ getIndexLabel(dialogSelectedIndex) }} {{ dialogKabkotName }}
                      </h2>
                      <select v-model="dialogSelectedIndex" class="mb-6 p-3 border border-blue-300 rounded-lg w-full text-sm">
                        <option value="indeks_skor">Indeks Inovasi Daerah</option>
                        <option value="ipp_skor">Indeks Pelayanan Publik</option>
                        <option value="idsd_skor">Indeks Daya Saing Daerah</option>
                        <option value="rb_level">Indeks Reformasi Birokrasi</option>
                      </select>
                      <div v-if="dialogKabkotIndeks.length">
                        <Line
                          :data="{
                            labels: dialogKabkotIndeks
                              .slice()
                              .sort((a, b) => a.indeks_tahun - b.indeks_tahun)
                              .filter(i => {
                                const levelKey = dialogSelectedIndex === 'indeks_skor' ? 'indeks_level' : 
                                               dialogSelectedIndex === 'ipp_skor' ? 'ipp_level' : 
                                               dialogSelectedIndex === 'idsd_skor' ? 'idsd_level' : 'rb_level'
                                return i[levelKey] && i[levelKey] > 0
                              })
                              .map(i => i.indeks_tahun),
                            datasets: [
                              {
                                label: getIndexLabel(dialogSelectedIndex),
                                data: dialogKabkotIndeks
                                  .slice()
                                  .sort((a, b) => a.indeks_tahun - b.indeks_tahun)
                                  .filter(i => {
                                    const levelKey = dialogSelectedIndex === 'indeks_skor' ? 'indeks_level' : 
                                                   dialogSelectedIndex === 'ipp_skor' ? 'ipp_level' : 
                                                   dialogSelectedIndex === 'idsd_skor' ? 'idsd_level' : 'rb_level'
                                    return i[levelKey] && i[levelKey] > 0
                                  })
                                  .map(i => {
                                    const levelKey = dialogSelectedIndex === 'indeks_skor' ? 'indeks_level' : 
                                                   dialogSelectedIndex === 'ipp_skor' ? 'ipp_level' : 
                                                   dialogSelectedIndex === 'idsd_skor' ? 'idsd_level' : 'rb_level'
                                    return i[levelKey]
                                  }),
                                borderColor: dialogChartColor,
                                backgroundColor: dialogChartColor + '20',
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4
                              }
                            ]
                          }"
                          :options="{
                            responsive: true,
                            plugins: { 
                              legend: { display: false },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    const dataIndex = context.dataIndex
                                    const filteredData = dialogKabkotIndeks
                                      .slice()
                                      .sort((a, b) => a.indeks_tahun - b.indeks_tahun)
                                      .filter(i => {
                                        const levelKey = dialogSelectedIndex === 'indeks_skor' ? 'indeks_level' : 
                                                       dialogSelectedIndex === 'ipp_skor' ? 'ipp_level' : 
                                                       dialogSelectedIndex === 'idsd_skor' ? 'idsd_level' : 'rb_level'
                                        return i[levelKey] && i[levelKey] > 0
                                      })
                                    const dataPoint = filteredData[dataIndex]
                                    const scoreKey = dialogSelectedIndex
                                    const predicateKey = dialogSelectedIndex === 'indeks_skor' ? 'indeks_predikat' : 
                                                       dialogSelectedIndex === 'ipp_skor' ? 'ipp_predikat' : 
                                                       dialogSelectedIndex === 'idsd_skor' ? 'idsd_predikat' : 'rb_predikat'
                                    
                                    return [
                                      `Tahun: ${dataPoint.indeks_tahun}`,
                                      `Skor: ${dataPoint[scoreKey]}`,
                                      `Predikat: ${dataPoint[predicateKey]}`
                                    ]
                                  }
                                }
                              }
                            },
                            scales: {
                              y: {
                                min: 1,
                                max: dialogSelectedIndex === 'indeks_skor' ? 4 : 
                                     dialogSelectedIndex === 'ipp_skor' ? 10 : 
                                     dialogSelectedIndex === 'idsd_skor' ? 5 : 7,
                                ticks: {
                                  stepSize: 1,
                                  callback: function(tickValue) {
                                    if (typeof tickValue === 'number' && tickValue % 1 === 0) {
                                      return getLevelLabel(tickValue, dialogSelectedIndex)
                                    }
                                    return ''
                                  }
                                }
                              }
                            }                          }"
                          style="height:280px"
                        />
                      </div>
                      <div v-else class="text-center text-gray-500 py-8">
                        Tidak ada data indeks untuk ditampilkan
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Dialog>

          <!-- Legend -->
          <div class="legend bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 class="font-bold mb-2">LEGENDA</h3>
            <div class="flex flex-wrap gap-2">
              <div v-for="(color, label) in legendColors" :key="label" class="flex items-center">
                <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: color }"></div>
                <span class="ml-2">{{ label }}</span>
              </div>
            </div>
          </div>          <!-- Indeks Inovasi Chart on Hover -->
          <div v-if="hoveredIndeks.length" class="mt-4 bg-white rounded-lg shadow p-6">
            <h2 class="font-bold mb-4 text-lg">Indeks Inovasi {{ hoveredKabkotName }}</h2>
            <Line
              :data="{
                labels: hoveredIndeks.map(i => i.indeks_tahun),
                datasets: [
                  {
                    label: 'Indeks Inovasi',
                    data: hoveredIndeks.map(i => i.indeks_skor),
                    borderColor: '#3B82F6',
                    backgroundColor: '#3B82F620',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                  }
                ]
              }"
              :options="{
                responsive: true,
                plugins: { legend: { display: false } }
              }"
              style="height:250px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import axios from 'axios'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import Table from '@/components/ui/table/Table.vue'
import * as XLSX from 'xlsx'

// Define page meta
useHead({
  title: 'Sebaran Inovasi | INOLAND',
  meta: [
    {
      name: 'description',
      content: 'Peta interaktif sebaran ide inovasi di seluruh Indonesia'
    },
    {
      property: 'og:title',
      content: 'Sebaran Inovasi | INOLAND'
    },
    {
      property: 'og:description',
      content: 'Peta interaktif sebaran ide inovasi di seluruh Indonesia'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Sebaran Inovasi | INOLAND'
    },
    {
      name: 'twitter:description',
      content: 'Peta interaktif sebaran ide inovasi di seluruh Indonesia'
    }
  ]
})

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Types
interface Provinsi {
  id_provinsi: number
  nama: string
  svg_path: string
  jumlah_inovasi: number
}

interface Kabupaten {
  id: number
  id_kabkot: number
  nama_kabkot: string
  id_provinsi: number
  jumlah_inovasi: number
  svg_path: string
}

interface Inovasi {
  id: number
  judul_inovasi: string
  tahun: string
  inovator: string
  deskripsi: string
  id_kabkot: number
  urusan?: string
  wilayah: {
    id_provinsi: number
    nama_provinsi: string
    id_kabkot: number
    nama_kabkot: string
  }
  sdgs: {
    id: number
    tujuan_ke: number
    nama: string
    image: string
  } | null
}

interface IndeksInovasi {
  id_provinsi: number
  id_kabkot: number
  indeks_tahun: number
  nama_kabkot: string
  nama_prov: string
  level: string
  indeks_skor: number
  indeks_predikat: string
  indeks_level: number
  ipp_skor: number
  ipp_predikat: string
  ipp_level: number
  idsd_skor: number
  idsd_predikat: string
  idsd_level: number
  rb_predikat: string
  rb_level: number
}

// Data State
const provinsis = ref<Provinsi[]>([])
const kabupaten = ref<Kabupaten[]>([])
const selectedProvinsi = ref<number | null>(null)
const selectedKabkot = ref<number | null>(null)
const dialogOpen = ref(false)
const showInfoModal = ref(true)
const hoveredArea = ref({ visible: false, text: '', x: 0, y: 0 })
const inovasiKabupaten = ref<Inovasi[]>([])
const indeksInovasi = ref<IndeksInovasi[]>([])
const hoveredIndeks = ref<IndeksInovasi[]>([])
const hoveredKabkotName = ref('')
const dialogKabkotIndeks = ref<IndeksInovasi[]>([])
const dialogKabkotName = ref('')
const dialogSelectedIndex = ref<'indeks_skor' | 'ipp_skor' | 'idsd_skor' | 'rb_level'>('indeks_skor')
const dialogKabkotInovasi = ref<Inovasi[]>([])
const hasShownWelcomeModal = ref(false)
const kabupatenTooltip = ref({ visible: false, nama: '', jumlah: 0, x: 0, y: 0 })
const isDownloading = ref(false)

// Dialog chart color based on selected index
const dialogChartColor = computed(() => {
  switch (dialogSelectedIndex.value) {
    case 'indeks_skor':
      return '#3B82F6'
    case 'ipp_skor':
      return '#10B981'
    case 'idsd_skor':
      return '#F59E0B'
    case 'rb_level':
      return '#EF4444'
    default:
      return '#3B82F6'
  }
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(25) // Default 25 items per page

// Chart State
const selectedIndex = ref<'indeks_skor' | 'ipp_skor' | 'idsd_skor' | 'rb_level'>('indeks_skor')

// Legend colors
const legendColors = ref({
  'Sangat Tinggi (>200)': '#08306b',
  'Tinggi (>150)': '#08519c',
  'Menengah (>100)': '#2171b5',
  'Cukup (>50)': '#4292c6',
  'Rendah (>0)': '#6baed6',
  'Tidak ada data': '#fff'
})

// Computed: Paginated inovasi for current page
const currentInovasi = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return dialogKabkotInovasi.value.slice(start, end)
})

// Computed: Total pages for pagination
const totalPages = computed(() => {
  return Math.ceil(dialogKabkotInovasi.value.length / itemsPerPage.value)
})

// Computed: Get selected province name
const selectedProvinceName = computed(() => {
  const prov = provinsis.value.find(p => p.id_provinsi === selectedProvinsi.value)
  return prov ? prov.nama : ''
})

// Computed: Chart Data for Vue Chart.js
const chartData = computed(() => {
  if (!indeksInovasi.value.length) {
    return {
      labels: [],
      datasets: []
    }
  }

  // Group data by year and get averages
  const years = [...new Set(indeksInovasi.value.map(item => item.indeks_tahun))].sort()
  let yAxisLabel = ''
  let dataColor = '#3B82F6'
  const data = years.map(year => {
    const yearData = indeksInovasi.value.filter(item => item.indeks_tahun === year)
    const key = selectedIndex.value
    if (key === 'rb_level') {
      // For rb_level, calculate average of numeric values
      const values = yearData.map(item => item.rb_level).filter(val => val !== null)
      return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0
    } else {
      // For other metrics, calculate average
      const values = yearData.map(item => (item as any)[key]).filter(val => val !== null && val !== undefined)
      return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0
    }
  })

  // Set label and color based on selected index
  switch (selectedIndex.value) {
    case 'indeks_skor':
      yAxisLabel = 'Skor Indeks Inovasi'
      dataColor = '#3B82F6'
      break
    case 'ipp_skor':
      yAxisLabel = 'Skor Indeks Pelayanan Publik'
      dataColor = '#10B981'
      break
    case 'idsd_skor':
      yAxisLabel = 'Skor Indeks Daya Saing Daerah'
      dataColor = '#F59E0B'
      break
    case 'rb_level':
      yAxisLabel = 'Level Reformasi Birokrasi'
      dataColor = '#EF4444'
      break
  }

  return {
    labels: years,
    datasets: [
      {
        label: yAxisLabel,
        data: data,
        borderColor: dataColor,
        backgroundColor: `${dataColor}20`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: dataColor,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  }
})

// Computed: Chart Options for Vue Chart.js
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Poppins'
        }
      }
    },    title: {
      display: true,
      text: `Trend ${getIndexLabel(selectedIndex.value)} - ${
        selectedKabkot.value 
          ? kabupaten.value.find(k => k.id_kabkot === selectedKabkot.value)?.nama_kabkot || ''
          : selectedProvinceName.value
      }`,
      font: {
        size: 16,
        family: 'Poppins',
        weight: 'bold' as const
      },
      padding: 20
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#3B82F6',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function(context: any) {
          const value = context.parsed.y.toFixed(2)
          return `${context.dataset.label}: ${value}`
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Tahun',
        font: {
          size: 14,
          family: 'Poppins',
          weight: 'bold' as const
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: getIndexLabel(selectedIndex.value),
        font: {
          size: 14,
          family: 'Poppins',
          weight: 'bold' as const
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  }
}))

// Helper function to get index label
function getIndexLabel(index: string): string {
  const labels = {
    'indeks_skor': 'Skor Indeks Inovasi',
    'ipp_skor': 'Skor Indeks Pelayanan Publik',
    'idsd_skor': 'Skor Indeks Daya Saing Daerah',
    'rb_level': 'Level Reformasi Birokrasi'
  }
  return labels[index as keyof typeof labels] || 'Indeks'
}

// Helper function to get level label based on level number
function getLevelLabel(level: number, indexType: string): string {
  if (indexType === 'indeks_skor') {
    switch (level) {
      case 1: return 'Belum Dapat Dinilai'
      case 2: return 'Kurang Inovatif'
      case 3: return 'Inovatif'
      case 4: return 'Sangat Inovatif'
      default: return ''
    }
  } else if (indexType === 'ipp_skor') {
    switch (level) {
      case 1: return 'NA'
      case 2: return 'F'
      case 3: return 'E'
      case 4: return 'D'
      case 5: return 'C-'
      case 6: return 'C'
      case 7: return 'B-'
      case 8: return 'B'
      case 9: return 'A-'
      case 10: return 'A'
      default: return ''
    }
  } else if (indexType === 'idsd_skor') {
    switch (level) {
      case 1: return 'NA'
      case 2: return 'RENDAH'
      case 3: return 'SEDANG'
      case 4: return 'TINGGI'
      case 5: return 'SANGAT TINGGI'
      default: return ''
    }
  } else if (indexType === 'rb_level') {
    switch (level) {
      case 1: return 'NA'
      case 2: return 'D'
      case 3: return 'CC'
      case 4: return 'C'
      case 5: return 'BB'
      case 6: return 'B'
      case 7: return 'A'
      default: return ''
    }
  }
  return ''
}

// Truncate functionality
const expandedIds = ref<number[]>([])
const maxLength = 50

function toggleExpand(id: number) {
  const idx = expandedIds.value.indexOf(id)
  if (idx === -1) {
    expandedIds.value.push(id)
  } else {
    expandedIds.value.splice(idx, 1)
  }
}

function truncateText(text: string, id: number): string {
  if (!text) return ''
  if (expandedIds.value.includes(id)) return text
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Pagination handler
function handlePageChange(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Utility to clean SVG path
function cleanSvgPath(path: string | undefined): string {
  return path ? path.replace(/"/g, '') : ''
}

// Choropleth color function
function getChoroplethColor(jumlah_inovasi: number): string {
  if (jumlah_inovasi > 200) return '#0d47a1'; // dark vibrant blue
  if (jumlah_inovasi > 150) return '#1976d2'; // primary blue
  if (jumlah_inovasi > 100) return '#42a5f5'; // sky blue
  if (jumlah_inovasi > 50) return '#90caf9';  // soft blue
  if (jumlah_inovasi > 0) return '#e3f2fd';   // very light blue
  return '#ffffff'; // white for 0
}

// Load initial data
onMounted(async () => {
  try {
    const { data } = await useFetch('/api/provinsi')
    provinsis.value = Array.isArray(data.value)
      ? data.value.map((item: any) => ({
          id_provinsi: item.id ?? item.id_provinsi ?? 0,
          nama: item.nama_provinsi ?? item.nama ?? '',
          svg_path: item.svg_path ?? '',
          jumlah_inovasi: item.jumlah_inovasi ?? 0
        }))
      : []
      
    // Show welcome modal on first visit
    const hasVisited = localStorage.getItem('maps_inovasi_visited')
    if (!hasVisited) {
      setTimeout(() => {
        showInfoModal.value = true
        localStorage.setItem('maps_inovasi_visited', 'true')
      }, 500)
    }
  } catch (error) {
    console.error('Error fetching provinces:', error)
  }
})

const fetchProvinsiData = async () => {
  const ids = provinsis.value.map(p => p.id_provinsi).filter(Boolean).join(',')
  const { data } = await useFetch(`/api/provinsi`, { query: { ids } })
  const provData = (data.value && Array.isArray((data.value as any).data)) ? (data.value as any).data as Provinsi[] : []
  provinsis.value = provinsis.value.map(p => ({
    ...p,
    jumlah_inovasi: provData.find(dp => dp.id_provinsi === p.id_provinsi)?.jumlah_inovasi || 0
  }))
}

fetchProvinsiData()

const loadKabupaten = async (id_provinsi: number) => {
  try {
    const res = await axios.get(`/api/inovasiPerKabkot/${id_provinsi}`)
    kabupaten.value = Array.isArray(res.data)
      ? res.data.map((item: any) => ({
          id: item.id,
          id_kabkot: item.id_kabkot,
          nama_kabkot: item.nama_kabkot,
          id_provinsi: item.id_provinsi,
          jumlah_inovasi: Number(item.jumlah_inovasi ?? 0),
          svg_path: item.svg_path ?? ''
        }))
      : []
    
    // Load province-level index data when province is first opened
    try {
      const { data: provIndeksData } = await useFetch(`/api/indeks_inovasi`, { 
        query: { provId: id_provinsi, level: 'Provinsi' } 
      })
      
      if (provIndeksData.value && typeof provIndeksData.value === 'object' && 'data' in provIndeksData.value) {
        indeksInovasi.value = (provIndeksData.value as any).data as IndeksInovasi[]
        dialogKabkotIndeks.value = (provIndeksData.value as any).data as IndeksInovasi[]
      } else {
        indeksInovasi.value = []
        dialogKabkotIndeks.value = []
      }
    } catch (indeksError) {
      console.error('Error loading province index data:', indeksError)
      indeksInovasi.value = []
      dialogKabkotIndeks.value = []
    }
      // Load all innovations from the province when first opened
    try {
      console.log('🔍 Loading province innovations for provId:', id_provinsi)
      const { data: provInovasiData } = await useFetch(`/api/inolands`, { 
        query: { provId: id_provinsi } 
      })
      
      console.log('📊 Province inovasi API response:', provInovasiData.value)
      
      if (provInovasiData.value && typeof provInovasiData.value === 'object' && 'data' in provInovasiData.value) {
        inovasiKabupaten.value = (provInovasiData.value as any).data as Inovasi[]
        dialogKabkotInovasi.value = (provInovasiData.value as any).data as Inovasi[]
        console.log('✅ Loaded province innovations count:', dialogKabkotInovasi.value.length)
      } else {
        console.log('❌ No valid province innovation data received')
        inovasiKabupaten.value = []
        dialogKabkotInovasi.value = []
      }
    } catch (inovasiError) {
      console.error('❌ Error loading province inovasi data:', inovasiError)
      inovasiKabupaten.value = []
      dialogKabkotInovasi.value = []
    }
      selectedProvinsi.value = id_provinsi
    selectedKabkot.value = null // Reset selected kabkot when province is selected
    dialogKabkotName.value = selectedProvinceName.value || `Provinsi ${id_provinsi}`
    currentPage.value = 1 // Reset pagination
    dialogOpen.value = true
  } catch (error) {
    console.error('Error fetching kabupaten:', error)
  }
}

const loadInovasi = async (id_kabkot: number) => {
  try {
    const { data: inovasiData } = await useFetch(`/api/inolands/${id_kabkot}`)
    const { data: indeksData } = await useFetch(`/api/indeks_inovasi`, { query: { kabkotId: id_kabkot } })
    
    // Handle the new API response format
    if (inovasiData.value && typeof inovasiData.value === 'object' && 'data' in inovasiData.value) {
      inovasiKabupaten.value = (inovasiData.value as any).data as Inovasi[]
    } else {
      inovasiKabupaten.value = []
    }
    
    if (indeksData.value && typeof indeksData.value === 'object' && 'data' in indeksData.value) {
      indeksInovasi.value = (indeksData.value as any).data as IndeksInovasi[]
    } else {
      indeksInovasi.value = []
    }
    
    selectedKabkot.value = id_kabkot
    currentPage.value = 1
  } catch (error) {
    console.error('Error loading inovasi data:', error)
    inovasiKabupaten.value = []
    indeksInovasi.value = []
  }
}

// Mouse event handlers for tooltip
function handleMouseEnter(event: MouseEvent, text: string) {
  hoveredArea.value = {
    visible: true,
    text,
    x: 0,
    y: 0
  }
}

function handleMouseLeave() {
  hoveredArea.value = { ...hoveredArea.value, visible: false }
}

async function handleKabupatenHover(kab: Kabupaten) {
  hoveredKabkotName.value = kab.nama_kabkot
  try {
    const { data } = await useFetch(`/api/indeks_inovasi/${kab.id_kabkot}`)
    hoveredIndeks.value = (data.value && Array.isArray((data.value as any).data)) ? (data.value as any).data : []
  } catch (error) {
    hoveredIndeks.value = []
  }
}

function handleKabupatenLeave() {
  hoveredIndeks.value = []
  hoveredKabkotName.value = ''
}

// Handle kabupaten map hover tooltip
function handleKabupatenMapHover(event: MouseEvent, kab: Kabupaten) {
  const svgRect = (event.target as SVGPathElement).closest('svg')?.getBoundingClientRect()
  if (svgRect) {
    const x = Math.min(800 - 210, Math.max(10, event.clientX - svgRect.left))
    const y = Math.max(10, event.clientY - svgRect.top - 70)
    
    kabupatenTooltip.value = {
      visible: true,
      nama: kab.nama_kabkot,
      jumlah: kab.jumlah_inovasi || 0,
      x,
      y
    }
  }
}

function handleKabupatenMapLeave() {
  kabupatenTooltip.value = { ...kabupatenTooltip.value, visible: false }
}

// Reset to province data
async function resetToProvinceData() {
  console.log('🔄 Resetting to province data for:', selectedProvinsi.value)
  selectedKabkot.value = null
  dialogKabkotName.value = selectedProvinceName.value || `Provinsi ${selectedProvinsi.value}`
  currentPage.value = 1
  
  // Reload province data
  if (selectedProvinsi.value) {
    try {
      // Load province-level index data
      const { data: provIndeksData } = await useFetch(`/api/indeks_inovasi`, { 
        query: { provId: selectedProvinsi.value, level: 'Provinsi' } 
      })
      
      if (provIndeksData.value && typeof provIndeksData.value === 'object' && 'data' in provIndeksData.value) {
        dialogKabkotIndeks.value = (provIndeksData.value as any).data as IndeksInovasi[]
      } else {
        dialogKabkotIndeks.value = []
      }
      
      // Load all innovations from the province
      const { data: provInovasiData } = await useFetch(`/api/inolands`, { 
        query: { provId: selectedProvinsi.value } 
      })
      
      if (provInovasiData.value && typeof provInovasiData.value === 'object' && 'data' in provInovasiData.value) {
        dialogKabkotInovasi.value = (provInovasiData.value as any).data as Inovasi[]
        console.log('✅ Reset to province data, count:', dialogKabkotInovasi.value.length)
      } else {
        dialogKabkotInovasi.value = []
      }
    } catch (error) {
      console.error('❌ Error resetting to province data:', error)
    }
  }
}

const svgWidth = 981; // Sesuaikan dengan viewBox SVG utama

async function showKabupatenChart(kab: Kabupaten) {
  console.log('🎯 Clicked kabupaten:', kab.nama_kabkot, 'ID:', kab.id_kabkot)
  dialogKabkotName.value = kab.nama_kabkot
  selectedKabkot.value = kab.id_kabkot // Set selected kabkot for infobox
  currentPage.value = 1 // Reset pagination when changing kabupaten
  try {
    console.log('🔍 Loading kabupaten innovations for ID:', kab.id_kabkot)
    const { data: indeksData } = await useFetch(`/api/indeks_inovasi/${kab.id_kabkot}`)
    if (indeksData.value && typeof indeksData.value === 'object' && 'data' in indeksData.value) {
      dialogKabkotIndeks.value = (indeksData.value as any).data as IndeksInovasi[]
    } else {
      dialogKabkotIndeks.value = []
    }
    
    const { data: inovasiData } = await useFetch(`/api/inolands/${kab.id_kabkot}`)
    console.log('📊 Kabupaten inovasi API response:', inovasiData.value)
    
    // Handle the new API response format
    if (inovasiData.value && typeof inovasiData.value === 'object' && 'data' in inovasiData.value) {
      dialogKabkotInovasi.value = (inovasiData.value as any).data as Inovasi[]
      console.log('✅ Loaded kabupaten innovations count:', dialogKabkotInovasi.value.length)
    } else {
      console.log('❌ No valid kabupaten innovation data received')
      dialogKabkotInovasi.value = []
    }
      // Also update the main chart data with kabupaten-specific data
    await loadInovasi(kab.id_kabkot)
  } catch (error) {
    console.error('❌ Error loading kabupaten data:', error)
    dialogKabkotIndeks.value = []
    dialogKabkotInovasi.value = []
  }
}

// Download Functions
async function downloadExcel() {
  if (isDownloading.value || dialogKabkotInovasi.value.length === 0) return
  
  try {
    isDownloading.value = true
    
    const data = dialogKabkotInovasi.value.map((item, index) => ({
      'No': index + 1,
      'Tahun': item.tahun,
      'Judul Inovasi': item.judul_inovasi,
      'SDGS': item.sdgs?.nama || '-',
      'Inovator': item.inovator || '-',
      'Deskripsi': item.deskripsi || 'Tidak ada deskripsi',
      'Provinsi': item.wilayah?.nama_provinsi || '',
      'Kabupaten/Kota': item.wilayah?.nama_kabkot || ''
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inovasi')
    
    const fileName = `Daftar_Inovasi_${selectedKabkot.value ? dialogKabkotName.value : selectedProvinceName.value}_${new Date().toISOString().split('T')[0]}.xlsx`.replace(/[^a-zA-Z0-9_.-]/g, '_')
    XLSX.writeFile(workbook, fileName)
  } catch (error) {
    console.error('Error downloading Excel:', error)
    alert('Terjadi kesalahan saat mengunduh file Excel')
  } finally {
    isDownloading.value = false
  }
}

async function downloadCSV() {
  if (isDownloading.value || dialogKabkotInovasi.value.length === 0) return
  
  try {
    isDownloading.value = true
    
    const data = dialogKabkotInovasi.value.map((item, index) => ({
      'No': index + 1,
      'Tahun': item.tahun,
      'Judul Inovasi': item.judul_inovasi,
      'SDGS': item.sdgs?.nama || '-',
      'Inovator': item.inovator || '-',
      'Deskripsi': item.deskripsi || 'Tidak ada deskripsi',
      'Provinsi': item.wilayah?.nama_provinsi || '',
      'Kabupaten/Kota': item.wilayah?.nama_kabkot || ''
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const csv = XLSX.utils.sheet_to_csv(worksheet)
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `Daftar_Inovasi_${selectedKabkot.value ? dialogKabkotName.value : selectedProvinceName.value}_${new Date().toISOString().split('T')[0]}.csv`.replace(/[^a-zA-Z0-9_.-]/g, '_'))
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading CSV:', error)
    alert('Terjadi kesalahan saat mengunduh file CSV')
  } finally {
    isDownloading.value = false
  }
}

async function downloadPDF() {
  if (isDownloading.value || dialogKabkotInovasi.value.length === 0) return
  
  try {
    isDownloading.value = true
    
    // Try main PDF generation first
    await generateMainPDF()
    
  } catch (error) {
    console.error('Error downloading PDF:', error)
    
    // Try fallback PDF without autoTable
    try {
      await generateFallbackPDF()
    } catch (fallbackError) {
      console.error('Fallback PDF also failed:', fallbackError)
      alert('Terjadi kesalahan saat mengunduh file PDF. Silakan coba refresh halaman atau gunakan format Excel/CSV sebagai alternatif.')
    }
  } finally {
    isDownloading.value = false
  }
}

async function generateMainPDF() {
  // Import jsPDF with proper module syntax
  const jsPDF = (await import('jspdf')).default
  await import('jspdf-autotable')
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  })
  
  // Add title
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  const title = `Daftar Ide Inovasi ${selectedKabkot.value ? dialogKabkotName.value : selectedProvinceName.value}`
  
  // Split title if too long
  const titleLines = doc.splitTextToSize(title, 250)
  doc.text(titleLines, 20, 20)
  
  // Add generation date
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Diunduh pada: ${new Date().toLocaleDateString('id-ID')}`, 20, 35)
  
  // Add total count
  doc.text(`Total data: ${dialogKabkotInovasi.value.length} inovasi`, 20, 40)
  
  // Prepare table data with safe text handling
  const tableData = dialogKabkotInovasi.value.map((item, index) => [
    (index + 1).toString(),
    (item.tahun || '-').toString(),
    (item.judul_inovasi || '-').toString().slice(0, 60) + ((item.judul_inovasi || '').length > 60 ? '...' : ''),
    (item.sdgs?.nama || '-').toString(),
    (item.inovator || '-').toString().slice(0, 25) + ((item.inovator || '').length > 25 ? '...' : ''),
    (item.deskripsi || 'Tidak ada deskripsi').toString().slice(0, 80) + ((item.deskripsi || '').length > 80 ? '...' : '')
  ])
  
  // Add table using autoTable
  ;(doc as any).autoTable({
    head: [['No', 'Tahun', 'Judul Inovasi', 'SDGS', 'Inovator', 'Deskripsi']],
    body: tableData,
    startY: 50,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 20 },
      2: { cellWidth: 70 },
      3: { cellWidth: 35 },
      4: { cellWidth: 35 },
      5: { cellWidth: 70 }
    },
    margin: { top: 50, right: 15, bottom: 20, left: 15 },
    showHead: 'everyPage'
  })
  
  // Create safe filename
  const regionName = selectedKabkot.value ? dialogKabkotName.value : selectedProvinceName.value
  const safeRegionName = regionName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')
  const dateStr = new Date().toISOString().split('T')[0]
  const fileName = `Daftar_Inovasi_${safeRegionName}_${dateStr}.pdf`
  
  doc.save(fileName)
}

async function generateFallbackPDF() {
  // Simple PDF without autoTable
  const jsPDF = (await import('jspdf')).default
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })
  
  let yPosition = 20
  
  // Add title
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  const title = `Daftar Ide Inovasi ${selectedKabkot.value ? dialogKabkotName.value : selectedProvinceName.value}`
  doc.text(title, 20, yPosition)
  yPosition += 15
  
  // Add generation date
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Diunduh pada: ${new Date().toLocaleDateString('id-ID')}`, 20, yPosition)
  yPosition += 10
  
  // Add total count
  doc.text(`Total data: ${dialogKabkotInovasi.value.length} inovasi`, 20, yPosition)
  doc.text(`Sumber: https://inoland.lan.go.id`, 20, yPosition)
  yPosition += 15
  
  // Add data as text list
  doc.setFontSize(9)
  dialogKabkotInovasi.value.forEach((item, index) => {
    if (yPosition > 270) {
      doc.addPage()
      yPosition = 20
    }
    
    const text = `${index + 1}. ${item.judul_inovasi} (${item.tahun})`
    const inovatorText = `   Inovator: ${item.inovator || 'N/A'}`
    const sdgsText = `   SDGS: ${item.sdgs?.nama || 'N/A'}`
    
    const lines = doc.splitTextToSize(text, 170)
    doc.text(lines, 20, yPosition)
    yPosition += lines.length * 4
    
    doc.text(inovatorText, 20, yPosition)
    yPosition += 4
    
    doc.text(sdgsText, 20, yPosition)
    yPosition += 8
  })
  
  // Create safe filename
  const regionName = selectedKabkot.value ? dialogKabkotName.value : selectedProvinceName.value
  const safeRegionName = regionName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')
  const dateStr = new Date().toISOString().split('T')[0]
  const fileName = `Daftar_Inovasi_Simple_${safeRegionName}_${dateStr}.pdf`
  
  doc.save(fileName)
}
</script>

<style scoped>
.app {
  font-family: 'Poppins', sans-serif;
}

svg path {
  cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-box {
  position: relative;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px) saturate(180%);
  box-shadow: 0 12px 32px rgba(60,130,246,0.18), 0 2px 8px rgba(0,0,0,0.10);
  border-radius: 22px;
  padding: 40px 32px 32px 32px;
  max-width: 100vw;
  width: 100vw;
  max-height: 92vh;
  overflow-y: auto;
  animation: popupFadeIn 0.35s cubic-bezier(.4,2,.3,1);
  border: 2px solid #3b82f6;
  transition: box-shadow 0.2s, border 0.2s;
  /* Hide scrollbar for webkit browsers */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.popup-box::-webkit-scrollbar {
  display: none; /* WebKit browsers (Chrome, Safari, Edge) */
}

@media (min-width: 768px) {
  .popup-box {
    max-width: 1200px;
    width: 1200px;
    padding: 48px 40px 36px 40px;
  }
}

@keyframes popupFadeIn {
  from { opacity: 0; transform: translateY(40px) scale(0.96);}
  to   { opacity: 1; transform: translateY(0) scale(1);}
}

.close-btn {
  position: absolute;
  top: 22px;
  right: 22px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60,130,246,0.18);
  transition: all 0.2s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
}

.popup-box h1 {
  text-align: center;
  font-size: 1.7rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px #e0e7ff;
}

.popup-box hr {
  border: none;
  border-top: 2px solid #3b82f6;
  margin: 16px 0 28px 0;
  opacity: 0.18;
}

.map-kabupaten {
  border: 2px solid #3b82f6;
  border-radius: 14px;
  background: #f1f5f9;
  margin: 0 auto;
  box-shadow: 0 2px 16px rgba(60,130,246,0.10);
  transition: box-shadow 0.2s;
}

svg {
  max-width: 100%;
  height: auto;
}

foreignObject > div {
  pointer-events: none;
  z-index: 9999;
}

.legend {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  max-width: 100%;
  font-size: 0.95rem;
}

.legend h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: bold;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.legend-color {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.inovasi-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
  background: rgba(255,255,255,0.96);
  box-shadow: 0 2px 12px rgba(60,130,246,0.08);
  border-radius: 12px;
  overflow: hidden;
  min-width: 600px;
}

.inovasi-table th,
.inovasi-table td {
  padding: 8px 10px;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(248,250,252,0.98);
  transition: background 0.2s;
  font-size: 0.875rem;
}

.inovasi-table th:first-child,
.inovasi-table td:first-child {
  width: 50px; /* Fixed width for No column */
  text-align: center;
}

.inovasi-table th:nth-child(2),
.inovasi-table td:nth-child(2) {
  width: 70px; /* Fixed width for Tahun column */
  text-align: center;
}

.inovasi-table tr:nth-child(even) {
  background: #f1f5f9;
}

.inovasi-table tr:hover {
  background: #e0e7ff;
}

.inovasi-table th:first-child,
.inovasi-table td:first-child {
  border-radius: 8px 0 0 8px;
}

.inovasi-table th:last-child,
.inovasi-table td:last-child {
  border-radius: 0 8px 8px 0;
}

@media (max-width: 600px) {
  .table, .inovasi-table {
    font-size: 0.92rem;
  }
  .table th, .inovasi-table th,
  .table td, .inovasi-table td {
    padding: 8px 6px;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:hover {
  background: #f0f0f0;
}

.pagination button.active {
  background: #16578d;
  color: white;
  border-color: #16578d;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to   { opacity: 1; transform: translateY(0);}
}

.animate-fadeIn {
  animation: fadeIn 0.4s;
}

/* Info Modal Styles */
.info-modal-box {
  position: relative;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(16px) saturate(180%);
  box-shadow: 0 20px 40px rgba(60,130,246,0.15), 0 4px 12px rgba(0,0,0,0.10);
  border-radius: 24px;
  padding: 20px;
  max-width: 90vw;
  width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  animation: infoModalFadeIn 0.4s cubic-bezier(.4,0,.2,1);
  border: 2px solid rgba(59, 130, 246, 0.2);
  margin: auto;
}

@media (min-width: 768px) {
  .info-modal-box {
    max-width: 700px;
    width: 700px;
    padding: 40px;
  }
}

@keyframes infoModalFadeIn {
  from { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95);
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1);
  }
}

.info-modal-box .close-btn {
  top: 15px;
  right: 15px;
  width: 35px;
  height: 35px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.info-modal-box .close-btn:hover {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
}
</style>
