<template>
  <footer class="bg-transparent p-0">
    <div class="max-w-[1200px] mx-auto">

      <!-- Divider -->
      <hr class="border-t-2 bg-[#a3002b] h-px m-0 p-0" />

      <!-- Footer Top -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-0">
        <img src="/ino.png" alt="INO Logo" class="w-[150px] h-auto mb-4 md:mb-0" />
        <div class="stakeholders text-center md:text-left">
          <h4 class="text-2xl mb-4">Pemangku Kepentingan INOLAND</h4>
          <div class="flex items-center justify-center space-x-5">
            <a href="https://lan.go.id/"><img  src="/lanri.png" alt="lanri Logo" class="max-h-[80px]" /></a>
            <a href="https://menpan.go.id/"><img  src="/panrb.png" alt="panrb Logo" class="max-h-[80px]" /></a>
            <a href="https://kemendagri.go.id/"><img  src="/kemendagri.png" alt="kemendagri Logo" class="max-h-[80px]" /></a>
          </div>
        </div>
      </div>

      <br />

      <!-- Footer Bottom -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">

        <!-- Section 1: Tentang Kami -->
        <div class="footer-section">
          <h4 class="text-2xl font-poppins mb-4"><b>Tentang Kami</b></h4>
          <ul class="list-none p-0">
            <li class="mb-2">
              <a href="https://tuxedovation.inovasi.litbang.kemendagri.go.id/"  class="text-gray-800 hover:underline">
                Kementerian Dalam Negeri
              </a>
            </li>
            <li class="mb-2">
              <a href="https://jippnas.menpan.go.id/"  class="text-gray-800 hover:underline">
                Kementerian PANRB
              </a>
            </li>
            <li class="mb-2">
              <a href="https://inoland.lan.go.id"  class="text-gray-800 hover:underline">
                Lembaga Administrasi Negara
              </a>
            </li>
          </ul>
        </div>

        <!-- Section 2: Jelajahi -->
        <div class="footer-section">
          <h4 class="text-2xl font-poppins mb-4"><b>Jelajahi</b></h4>
          <ul class="list-none p-0">
            <li class="mb-2"><a href="/" class="text-gray-800 hover:underline">Beranda</a></li>
            <li class="mb-2"><a href="/layanan" class="text-gray-800 hover:underline">Layanan Inovasi</a></li>
            <li class="mb-2"><a href="/cari" class="text-gray-800 hover:underline">Cari Inovasi</a></li>
            <li class="mb-2"><a href="/referensi" class="text-gray-800 hover:underline">Referensi Inovasi</a></li>
          </ul>
        </div>

        <!-- Section 3: Hubungi Kami -->
        <div class="footer-section">
          <h4 class="text-2xl font-poppins mb-4"><b>Hubungi Kami</b></h4>
          <ul class="list-none p-0">
            <li class="mb-2 flex items-center">
              <i-carbon-sms class="mr-2" />
              (+6221) 3828601 - 89
            </li>
            <li class="mb-2 flex items-center">
              <i-carbon-email class="mr-2" />
              pian@lan.go.id
            </li>
            <li class="mb-2 flex items-center">
              <i-carbon-location class="mr-2" />
              Jl. Veteran No 10 Jakarta Pusat - 10110
            </li>
          </ul>
        </div>

        <!-- Section 4: Ikuti Kami -->
        <div class="footer-section">
          <h4 class="text-2xl font-poppins mb-4"><b>Ikuti Kami</b></h4>
          <ul class="list-none p-0">
            <li class="mb-2 flex items-center">
              <a href="https://www.youtube.com/@InovasiLANRI"  target="_blank" rel="noopener noreferrer" class="flex items-center">
                <img src="/youtube-icon.png" alt="YouTube Icon" class="max-h-[30px] mr-2" />
                <span>Inovasi LANRI</span>
              </a>
            </li>
            <li class="mb-2 flex items-center">
              <a href="https://www.instagram.com/pian_lanri"  target="_blank" rel="noopener noreferrer" class="flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" 
                     alt="Instagram Icon" class="max-h-[30px] mr-2" />
                <span>@pian_lanri</span>
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <br />

    <!-- Copyright -->
    <div class="text-center bg-[#16578D] text-[#f7f4f4] text-lg border-2 py-0.5 w-full m-0 font-poppins">
      <p>&copy; 2024 - Pusat Inovasi Administrasi Negara LANRI. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
// Tidak ada logika JS diperlukan untuk footer statis ini
</script>

<style scoped>
/* Opsional: styling tambahan */
.footer-section {
  padding: 1rem;
}
</style>