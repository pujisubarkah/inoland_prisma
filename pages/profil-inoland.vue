<template>
  <section class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
          Profil INOLAND
        </h1>
        <p class="text-lg text-blue-600 font-medium">
          Laboratorium Inovasi Pemerintahan
        </p>
      </header>

      <!-- Pendahuluan -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        <h2 class="text-2xl font-bold text-blue-800 mb-4">
          Sekilas Tentang INOLAND
        </h2>
        <p class="text-gray-700 leading-relaxed">
          INOLAND merupakan platform dan ekosistem Laboratorium Inovasi Pemerintahan
          yang dikembangkan oleh <strong>Lembaga Administrasi Negara Republik Indonesia (LAN RI)</strong>.
          INOLAND dirancang sebagai ruang kolaboratif untuk mendukung pemerintah daerah
          dalam merancang, menguji, dan mengimplementasikan inovasi yang berdampak
          terhadap peningkatan kualitas pelayanan publik dan tata kelola pemerintahan.
        </p>
      </section>

      <!-- Mandat & Peran -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        <h2 class="text-2xl font-bold text-blue-800 mb-4">
          Mandat dan Peran
        </h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          Sebagai lembaga pemerintah yang memiliki mandat pengembangan kapasitas
          Aparatur Sipil Negara (ASN), LAN RI melalui INOLAND berperan dalam
          mendorong reformasi birokrasi dan penguatan inovasi sektor publik,
          khususnya di tingkat pemerintah daerah.
        </p>
        <p class="text-gray-700 leading-relaxed">
          INOLAND menjadi instrumen strategis dalam memfasilitasi proses inovasi
          yang sistematis, terukur, dan selaras dengan kebijakan nasional,
          sehingga inovasi daerah tidak berhenti pada ide atau kegiatan semata,
          tetapi mampu menghasilkan dampak nyata bagi masyarakat.
        </p>
      </section>

      <!-- Tujuan -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        <h2 class="text-2xl font-bold text-blue-800 mb-6">
          Tujuan INOLAND
        </h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <li class="flex gap-3">
            <span class="text-blue-600 font-bold">•</span>
            Mendukung penguatan kapasitas ASN dalam berpikir dan bertindak inovatif.
          </li>
          <li class="flex gap-3">
            <span class="text-blue-600 font-bold">•</span>
            Mendorong transformasi birokrasi yang adaptif dan responsif.
          </li>
          <li class="flex gap-3">
            <span class="text-blue-600 font-bold">•</span>
            Menjadi wadah kolaborasi inovasi antara pemerintah pusat dan daerah.
          </li>
          <li class="flex gap-3">
            <span class="text-blue-600 font-bold">•</span>
            Memfasilitasi inovasi pelayanan publik berbasis kebutuhan daerah.
          </li>
        </ul>
      </section>

      <!-- Peran di Daerah -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        <h2 class="text-2xl font-bold text-blue-800 mb-4">
          Peran INOLAND dalam Penguatan Inovasi Daerah
        </h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          Melalui INOLAND, LAN RI menjalin sinergi dengan pemerintah daerah
          untuk memperkuat kompetensi ASN dan mendorong tumbuhnya budaya inovasi
          yang berkelanjutan. Pendampingan dilakukan dengan pendekatan kontekstual
          sesuai karakteristik dan tantangan masing-masing daerah.
        </p>
        <p class="text-gray-700 leading-relaxed">
          Kolaborasi ini bertujuan untuk memastikan bahwa inovasi daerah
          mampu memberikan kontribusi nyata terhadap peningkatan kualitas layanan publik,
          efektivitas kebijakan, serta pencapaian tujuan pembangunan daerah.
        </p>
      </section>

      <!-- Cara Kerja -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-12">
        <h2 class="text-2xl font-bold text-blue-800 mb-6">
          Cara Kerja INOLAND
        </h2>
        <ol class="list-decimal list-inside space-y-3 text-gray-700">
          <li>Identifikasi dan diagnosa permasalahan daerah.</li>
          <li>Perancangan solusi inovatif secara kolaboratif.</li>
          <li>Uji coba dan penyempurnaan inovasi.</li>
          <li>Evaluasi dampak dan potensi replikasi.</li>
        </ol>
      </section>

      <!-- CTA -->
      <section class="bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl shadow-lg p-8 text-center text-white">
        <h3 class="text-2xl font-bold mb-4">
          Ingin Mengembangkan Inovasi di Daerah Anda?
        </h3>
        <p class="mb-6 text-blue-100">
          Diskusikan tantangan dan kebutuhan daerah Anda bersama tim INOLAND.
        </p>
        <NuxtLink
          to="/ajukan-pendampingan"
          class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Ajukan Pendampingan Inovasi
        </NuxtLink>
      </section>

    </div>
  </section>
</template>

<script setup>
// Halaman statis – tidak perlu logic tambahan
</script>