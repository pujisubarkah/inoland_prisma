<template>  <footer class="bg-gradient-to-b from-gray-50 to-gray-100 pt-4 pb-0 shadow-inner">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6">

      <!-- Subtle Divider -->
      <div class="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-4"></div>      <!-- Footer Top - Stakeholders -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-3 sm:mb-4">
        <div class="mb-3 md:mb-0 transition-transform hover:scale-105 flex items-center">
          <img src="/ino.png" alt="INO Logo" class="w-[60px] sm:w-[80px] h-auto" />
          <span class="text-[#2c4a7c] font-bold text-xl sm:text-2xl ml-2 tracking-wide" style="text-shadow: 0 1px 2px rgba(0,0,0,0.05);">INOLAND</span>
        </div>
        <div class="stakeholders text-center md:text-right">
          <h4 class="text-sm sm:text-base font-medium text-gray-700 mb-2">Pemangku Kepentingan INOLAND</h4>
          <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <a href="https://lan.go.id/" class="transition-opacity hover:opacity-80">
              <img src="/lanri.png" alt="LANRI Logo" class="max-h-[40px] sm:max-h-[50px] filter drop-shadow-sm" />
            </a>
            <a href="https://menpan.go.id/" class="transition-opacity hover:opacity-80">
              <img src="/panrb.png" alt="PANRB Logo" class="max-h-[40px] sm:max-h-[50px] filter drop-shadow-sm" />
            </a>
            <a href="https://kemendagri.go.id/" class="transition-opacity hover:opacity-80">
              <img src="/kemendagri.png" alt="Kemendagri Logo" class="max-h-[40px] sm:max-h-[50px] filter drop-shadow-sm" />
            </a>
          </div>
        </div>
      </div>      <!-- Footer Main Content -->
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-4">

        <!-- Section 1: Tentang Kami - Hidden on mobile -->
        <div class="footer-section hidden sm:block">
          <h4 class="text-sm font-medium text-blue-800 mb-2 border-b border-blue-100 pb-1">Tentang Kami</h4>
          <ul class="list-none p-0 space-y-1.5">
            <li>
              <a href="https://tuxedovation.inovasi.litbang.kemendagri.go.id/" 
                 class="text-gray-600 hover:text-blue-700 transition-colors duration-200 flex items-center text-xs sm:text-sm">
                <div class="w-1 h-1 rounded-full bg-blue-400 mr-2 flex-shrink-0"></div>
                <span class="leading-tight">Kementerian Dalam Negeri</span>
              </a>
            </li>            <li>
              <a href="https://jippnas.menpan.go.id/" 
                 class="text-gray-600 hover:text-blue-700 transition-colors duration-200 flex items-center text-xs sm:text-sm">
                <div class="w-1 h-1 rounded-full bg-blue-400 mr-2 flex-shrink-0"></div>
                <span class="leading-tight">Kementerian PANRB</span>
              </a>
            </li>
            <li>
              <a href="https://inoland.lan.go.id" 
                 class="text-gray-600 hover:text-blue-700 transition-colors duration-200 flex items-center text-xs sm:text-sm">
                <div class="w-1 h-1 rounded-full bg-blue-400 mr-2 flex-shrink-0"></div>
                <span class="leading-tight">Lembaga Administrasi Negara</span>
              </a>
            </li>
          </ul>
        </div>        <!-- Section 2: Jelajahi - Hidden on mobile -->
        <div class="footer-section hidden sm:block">
          <h4 class="text-sm font-medium text-blue-800 mb-2 border-b border-blue-100 pb-1">Jelajahi</h4>
          <ul class="list-none p-0 space-y-1.5">
            <li>
              <a href="/layanan" class="text-gray-600 hover:text-blue-700 transition-colors duration-200 flex items-center text-xs sm:text-sm">
                <div class="w-1 h-1 rounded-full bg-blue-400 mr-2 flex-shrink-0"></div>
                <span class="leading-tight">Layanan Inovasi</span>
              </a>
            </li>
            <li>
              <a href="/cari" class="text-gray-600 hover:text-blue-700 transition-colors duration-200 flex items-center text-xs sm:text-sm">
                <div class="w-1 h-1 rounded-full bg-blue-400 mr-2 flex-shrink-0"></div>
                <span class="leading-tight">Cari Inovasi</span>
              </a>
            </li>
            <li>
              <a href="/referensi" class="text-gray-600 hover:text-blue-700 transition-colors duration-200 flex items-center text-xs sm:text-sm">
                <div class="w-1 h-1 rounded-full bg-blue-400 mr-2 flex-shrink-0"></div>
                <span class="leading-tight">Referensi Inovasi</span>
              </a>
            </li>
          </ul>
        </div>        <!-- Section 3: Hubungi Kami -->
        <div class="footer-section">
          <h4 class="text-sm font-medium text-blue-800 mb-2 border-b border-blue-100 pb-1">Hubungi Kami</h4>
          <ul class="list-none p-0 space-y-1.5">
            <li class="flex items-start">
              <svg class="text-blue-600 h-3.5 w-3.5 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.365C3 20.1654 3 19.9181 3 19.4235V15.4C3 14.9459 3 14.7189 3.10222 14.5728C3.18876 14.4465 3.32899 14.3668 3.4781 14.3511C3.65253 14.3333 3.84687 14.4229 4.23556 14.6021C5.00063 14.9751 5.81326 15.241 6.66307 15.3886C6.85364 15.4184 7.04041 15.4462 7.11838 15.4555C7.40686 15.4898 7.69063 15.3652 7.86448 15.1368C8.05556 14.8842 8.55556 14.1061 8.75926 13.776C9.02422 13.3507 8.97237 12.8154 8.62345 12.4501C7.89876 11.6954 7.27146 10.8487 6.76539 9.92323C6.39672 9.22924 6.60251 8.38932 7.22854 7.9168C8.01211 7.32443 9.56211 6.35441 10.4329 5.77583C10.9359 5.44008 11.6526 5.55842 12.0098 6.01092C12.7615 6.96034 13.2989 8.12616 13.56 9.39057C13.645 9.81376 14.0475 10.1111 14.478 10.0516C14.8252 10.0026 15.1768 9.92973 15.5242 9.82516C15.9249 9.70453 16.3251 10.0049 16.3732 10.4191C16.4577 11.1388 16.5 11.8747 16.5 12.625C16.5 12.9792 16.4859 13.3311 16.4581 13.6796C16.4259 14.0879 16.7466 14.4537 17.1523 14.4998C17.5919 14.5493 18.0328 14.5756 18.4823 14.5756C19.5492 14.5756 20.565 14.3933 21.5 14.0571L21.5 5.5Z" 
                      fill="currentColor" fill-opacity="0.9"/>
              </svg>
              <span class="text-gray-600 text-xs sm:text-sm leading-tight">(+6221) 3828601 - 89</span>
            </li>
            <li class="flex items-start">
              <svg class="text-blue-600 h-3.5 w-3.5 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2H17.0503C17.9328 2 18.374 2 18.7416 2.06935C20.3597 2.37464 21.6254 3.64031 21.9307 5.25839C22 5.62595 22 6.06722 22 6.94975V17.0503C22 17.9328 22 18.374 21.9307 18.7416C21.6254 20.3597 20.3597 21.6254 18.7416 21.9307C18.374 22 17.9328 22 17.0503 22H6.94975C6.06722 22 5.62595 22 5.25839 21.9307C3.64031 21.6254 2.37464 20.3597 2.06935 18.7416C2 18.374 2 17.9328 2 17.0503V6.94975Z" 
                      fill="currentColor" fill-opacity="0.16"/>
                <path d="M17.2676 8.06326C17.5829 8.34429 17.6118 8.82675 17.3307 9.14215L13.3307 13.6422C12.6436 14.4155 11.4728 14.4332 10.7655 13.6798L6.68484 9.3564C6.38438 9.04192 6.3902 8.55949 6.7047 8.25903C7.01921 7.95857 7.50163 7.96439 7.80209 8.27889L11.8828 12.6023C11.9533 12.677 12.0675 12.6756 12.1361 12.5997L16.1361 8.09974C16.4172 7.78433 16.8996 7.75538 17.2149 8.03642L17.2676 8.06326Z" 
                      fill="currentColor"/>
              </svg>
              <span class="text-gray-600 text-xs sm:text-sm leading-tight">pian@lan.go.id</span>
            </li>
            <li class="flex items-start">
              <svg class="text-blue-600 h-3.5 w-3.5 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" 
                      fill="currentColor" fill-opacity="0.5"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C12 22 20 16.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 16.4183 12 22 12 22ZM12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" 
                      fill="currentColor" fill-opacity="0.5"/>
              </svg>
              <span class="text-gray-600 text-xs sm:text-sm leading-tight">Jl. Veteran No 10 Jakarta Pusat - 10110</span>
            </li>
          </ul>
        </div><!-- Section 4: Ikuti Kami -->
        <div class="footer-section">
          <h4 class="text-sm font-medium text-blue-800 mb-2 border-b border-blue-100 pb-1">Ikuti Kami</h4>
          <ul class="list-none p-0 space-y-2">
            <li>
              <a href="https://www.youtube.com/@InovasiLANRI" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="flex items-center group">
                <div class="bg-white p-1 rounded-full shadow-sm mr-2 group-hover:shadow-md transition-all flex-shrink-0">
                  <img src="/youtube-icon.png" alt="YouTube Icon" class="w-3 sm:w-4 h-3 sm:h-4" />
                </div>
                <span class="text-gray-600 group-hover:text-blue-700 transition-colors text-xs sm:text-sm leading-tight">Inovasi LANRI</span>
              </a>
            </li>            <li>
              <a href="https://www.instagram.com/lan_deputi1" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="flex items-center group">
                <div class="bg-white p-1 rounded-full shadow-sm mr-2 group-hover:shadow-md transition-all flex-shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" 
                     alt="Instagram Icon" class="w-3 sm:w-4 h-3 sm:h-4" />
                </div>
                <span class="text-gray-600 group-hover:text-blue-700 transition-colors text-xs sm:text-sm leading-tight">@lan_deputi1</span>
              </a>
            </li>
          </ul>
        </div>

      </div>        <!-- Newsletter Section (Optional) - More compact, hidden on mobile -->
      <div class="hidden sm:block mt-4 sm:mt-5 py-3 px-3 sm:px-4 bg-blue-50 rounded-lg shadow-inner">
        <div class="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div class="mb-2 sm:mb-0 text-center sm:text-left">
            <h4 class="text-sm font-medium text-blue-800">Dapatkan Pembaruan Terbaru</h4>
            <p class="text-gray-600 text-xs mt-0.5">Berlangganan newsletter kami untuk informasi inovasi terkini</p>
          </div>
          <div class="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            <input type="email" placeholder="Alamat Email Anda" 
                  class="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 min-w-0" />
            <button class="bg-blue-700 hover:bg-blue-800 text-white text-sm px-3 py-1.5 rounded-md transition-colors whitespace-nowrap">
              Berlangganan
            </button>
          </div>
        </div>
      </div>
    </div>    <!-- Copyright - Compact version -->
    <div class="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 mt-3 sm:mt-4 py-2 w-full">
      <div class="max-w-[1200px] mx-auto px-3 sm:px-4">
        <div class="flex justify-center items-center text-white text-center">
          <p class="text-xs sm:text-sm leading-tight">&copy; 2024 - Direktorat Advokasi dan Pengembangan Kinerja Kebijakan LANRI. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();

// Newsletter form handling (if needed)
const emailSubscription = ref('');
const subscribeNewsletter = () => {
  // Implement subscription logic here when ready
  // For now just reset the field
  emailSubscription.value = '';
};
</script>

<style scoped>
.footer-section {
  padding: 0.25rem 0.5rem;
  transition: all 0.3s ease;
}

@media (min-width: 640px) {
  .footer-section {
    padding: 0.5rem;
  }
}

@media (max-width: 639px) {
  .footer-section {
    text-align: center;
    padding: 0.25rem;
  }
  
  .footer-section ul li a,
  .footer-section ul li {
    justify-content: center;
  }
}

/* Touch target optimization for mobile */
@media (max-width: 767px) {
  .footer-section a {
    min-height: 44px;
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }
  
  button {
    min-height: 44px;
    touch-action: manipulation;
  }
  
  input {
    min-height: 44px;
  }
}

/* Subtle animation for links */
a {
  position: relative;
  transition: all 0.2s ease;
}

a:hover {
  transform: translateX(2px);
}
</style>