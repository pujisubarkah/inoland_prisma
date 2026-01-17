<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
    <Navbar />
    
    <!-- Hero Section -->
    <div class="relative pt-20 pb-12 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {{ $t('faqTitle') }}
          </h1>
          <p class="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            {{ $t('faqSubtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- FAQ Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="space-y-4">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index"
          class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-blue-50 transition-colors"
          >
            <div class="flex items-start gap-3 sm:gap-4 flex-1">
              <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                {{ index + 1 }}
              </div>
              <h3 class="text-base sm:text-lg font-semibold text-gray-800 flex-1 pt-1">
                {{ item.question }}
              </h3>
            </div>
            <svg 
              class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 transition-transform duration-300 flex-shrink-0 ml-2"
              :class="{ 'rotate-180': openFaq === index }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[500px] opacity-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="max-h-[500px] opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="openFaq === index" class="overflow-hidden">
              <div class="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                <div class="pl-11 sm:pl-14 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3">
                  <p v-html="item.answer"></p>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 sm:p-8 text-center">
        <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">
          {{ $t('faqContactTitle') }}
        </h3>
        <p class="text-blue-100 mb-5 text-sm sm:text-base">
          {{ $t('faqContactDescription') }}
        </p>
        <a 
          href="mailto:inoland@lan.go.id" 
          class="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {{ $t('faqContactButton') }}
        </a>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const openFaq = ref(null)

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

const faqItems = computed(() => {
  if (locale.value === 'id') {
    return [
      {
        question: 'Apa itu INOLAND?',
        answer: 'INOLAND (Indonesia Innovation Land) adalah platform digital yang dikembangkan oleh Lembaga Administrasi Negara (LAN) untuk mendukung pengembangan dan pengelolaan inovasi di seluruh Indonesia. Platform ini menyediakan berbagai layanan seperti pendampingan inovasi, basis data inovasi daerah, dan pembelajaran mengenai praktik terbaik inovasi sektor publik.'
      },
      {
        question: 'Siapa saja yang dapat menggunakan INOLAND?',
        answer: 'INOLAND dapat digunakan oleh berbagai pihak, termasuk:<br>• Pemerintah Daerah (Provinsi, Kabupaten/Kota)<br>• ASN dan pegawai pemerintahan<br>• Peneliti dan akademisi<br>• Masyarakat umum yang tertarik dengan inovasi sektor publik<br>• Organisasi non-pemerintah yang bergerak di bidang inovasi'
      },
      {
        question: 'Bagaimana cara mendaftar di INOLAND?',
        answer: 'Anda dapat mendaftar dengan dua cara:<br>1. Klik tombol "Masuk" di pojok kanan atas, lalu pilih "Daftar di sini"<br>2. Isi formulir pendaftaran dengan data lengkap (nama, email, instansi, dll)<br>3. Atau gunakan opsi "Masuk dengan Google" untuk pendaftaran lebih cepat<br>Setelah mendaftar, admin akan memverifikasi akun Anda sebelum dapat digunakan sepenuhnya.'
      },
      {
        question: 'Apa saja layanan yang tersedia di INOLAND?',
        answer: 'INOLAND menyediakan berbagai layanan, antara lain:<br>• <strong>Pembelajaran Inovasi</strong>: Materi dan panduan pengembangan inovasi<br>• <strong>Cari Inovasi</strong>: Database inovasi dari berbagai daerah<br>• <strong>Referensi</strong>: Artikel, berita, dan infografis seputar inovasi<br>• <strong>Pendampingan Inovasi</strong>: Layanan konsultasi dan asistensi pengembangan inovasi<br>• <strong>Survey Kesiapan Inovasi</strong>: Alat untuk mengukur tingkat kesiapan inovasi instansi'
      },
      {
        question: 'Bagaimana cara mengajukan pendampingan inovasi?',
        answer: 'Untuk mengajukan pendampingan inovasi:<br>1. Klik tombol "Ajukan Pendampingan" di navbar<br>2. Isi formulir pengajuan dengan lengkap (nama inovasi, deskripsi, tujuan, dll)<br>3. Upload dokumen pendukung jika diperlukan<br>4. Submit formulir dan tunggu konfirmasi dari tim LAN<br>Tim kami akan menghubungi Anda dalam 3-5 hari kerja.'
      },
      {
        question: 'Apakah ada biaya untuk menggunakan layanan INOLAND?',
        answer: 'Tidak, semua layanan di INOLAND dapat diakses secara <strong>gratis</strong>. Platform ini dikembangkan oleh LAN sebagai bentuk dukungan kepada pemerintah daerah dan masyarakat dalam mengembangkan inovasi sektor publik di Indonesia.'
      },
      {
        question: 'Bagaimana cara mencari inovasi dari daerah tertentu?',
        answer: 'Anda dapat mencari inovasi melalui menu "Cari Inovasi":<br>1. Gunakan fitur <strong>Filter</strong> untuk menyaring berdasarkan:<br>   - Provinsi/Kabupaten/Kota<br>   - Kategori inovasi<br>   - Tahun implementasi<br>   - Status indeks inovasi<br>2. Gunakan <strong>Peta Inovasi</strong> untuk melihat sebaran geografis<br>3. Gunakan <strong>Search Bar</strong> untuk pencarian kata kunci spesifik'
      },
      {
        question: 'Apa itu Indeks Inovasi Daerah?',
        answer: 'Indeks Inovasi Daerah adalah sistem penilaian yang dikembangkan untuk mengukur tingkat inovasi di suatu daerah. Indeks ini menilai berbagai aspek seperti:<br>• Jumlah dan kualitas inovasi<br>• Komitmen kepemimpinan<br>• Dukungan sumber daya<br>• Ekosistem inovasi<br>• Dampak yang dihasilkan<br>Hasil penilaian membantu daerah mengetahui posisi mereka dan area yang perlu ditingkatkan.'
      },
      {
        question: 'Bagaimana cara mengakses materi pembelajaran inovasi?',
        answer: 'Materi pembelajaran dapat diakses melalui menu "Pembelajaran Inovasi". Di sana Anda akan menemukan:<br>• Modul pembelajaran terstruktur<br>• Video tutorial<br>• Studi kasus best practice<br>• Webinar dan workshop<br>• Dokumen panduan dan toolkit<br>Semua materi dapat diakses secara gratis setelah login.'
      },
      {
        question: 'Bagaimana jika saya lupa password?',
        answer: 'Jika Anda lupa password:<br>1. Klik tombol "Masuk" di navbar<br>2. Klik link "Lupa Password?" di form login<br>3. Masukkan email yang terdaftar<br>4. Cek email Anda untuk link reset password<br>5. Klik link tersebut dan buat password baru<br>Jika tidak menerima email, periksa folder spam atau hubungi admin melalui email inoland@lan.go.id'
      }
    ]
  } else {
    return [
      {
        question: 'What is INOLAND?',
        answer: 'INOLAND (Indonesia Innovation Land) is a digital platform developed by the National Institute of Public Administration (LAN) to support the development and management of innovation throughout Indonesia. The platform provides various services such as innovation assistance, regional innovation database, and learning about best practices in public sector innovation.'
      },
      {
        question: 'Who can use INOLAND?',
        answer: 'INOLAND can be used by various parties, including:<br>• Regional Governments (Provinces, Regencies/Cities)<br>• Civil servants and government employees<br>• Researchers and academics<br>• General public interested in public sector innovation<br>• Non-governmental organizations working in innovation'
      },
      {
        question: 'How do I register at INOLAND?',
        answer: 'You can register in two ways:<br>1. Click the "Login" button in the top right corner, then select "Register here"<br>2. Fill out the registration form with complete data (name, email, institution, etc.)<br>3. Or use the "Login with Google" option for faster registration<br>After registering, admin will verify your account before it can be fully used.'
      },
      {
        question: 'What services are available at INOLAND?',
        answer: 'INOLAND provides various services, including:<br>• <strong>Innovation Learning</strong>: Materials and guidelines for innovation development<br>• <strong>Search Innovation</strong>: Database of innovations from various regions<br>• <strong>Reference</strong>: Articles, news, and infographics about innovation<br>• <strong>Innovation Assistance</strong>: Consultation and assistance services for innovation development<br>• <strong>Innovation Readiness Survey</strong>: Tool to measure institutional innovation readiness level'
      },
      {
        question: 'How do I apply for innovation assistance?',
        answer: 'To apply for innovation assistance:<br>1. Click the "Apply for Assistance" button in the navbar<br>2. Complete the application form (innovation name, description, objectives, etc.)<br>3. Upload supporting documents if required<br>4. Submit the form and wait for confirmation from the LAN team<br>Our team will contact you within 3-5 business days.'
      },
      {
        question: 'Is there a fee to use INOLAND services?',
        answer: 'No, all services at INOLAND can be accessed <strong>free of charge</strong>. This platform is developed by LAN as a form of support to regional governments and communities in developing public sector innovation in Indonesia.'
      },
      {
        question: 'How do I search for innovations from a specific region?',
        answer: 'You can search for innovations through the "Search Innovation" menu:<br>1. Use the <strong>Filter</strong> feature to filter by:<br>   - Province/Regency/City<br>   - Innovation category<br>   - Implementation year<br>   - Innovation index status<br>2. Use the <strong>Innovation Map</strong> to see geographic distribution<br>3. Use the <strong>Search Bar</strong> for specific keyword searches'
      },
      {
        question: 'What is the Regional Innovation Index?',
        answer: 'The Regional Innovation Index is an assessment system developed to measure the level of innovation in a region. This index assesses various aspects such as:<br>• Number and quality of innovations<br>• Leadership commitment<br>• Resource support<br>• Innovation ecosystem<br>• Impact generated<br>The assessment results help regions know their position and areas that need improvement.'
      },
      {
        question: 'How do I access innovation learning materials?',
        answer: 'Learning materials can be accessed through the "Innovation Learning" menu. There you will find:<br>• Structured learning modules<br>• Video tutorials<br>• Best practice case studies<br>• Webinars and workshops<br>• Guideline documents and toolkits<br>All materials can be accessed for free after login.'
      },
      {
        question: 'What if I forget my password?',
        answer: 'If you forget your password:<br>1. Click the "Login" button in the navbar<br>2. Click the "Forgot Password?" link in the login form<br>3. Enter your registered email<br>4. Check your email for the password reset link<br>5. Click the link and create a new password<br>If you don\'t receive the email, check your spam folder or contact admin at inoland@lan.go.id'
      }
    ]
  }
})

// SEO Meta tags
useHead({
  title: 'FAQ - Pertanyaan Umum | INOLAND',
  meta: [
    { name: 'description', content: 'Pertanyaan umum (FAQ) seputar INOLAND - Platform Inovasi Indonesia oleh Lembaga Administrasi Negara' },
    { name: 'keywords', content: 'FAQ, pertanyaan umum, bantuan, INOLAND, inovasi daerah, LAN' }
  ]
})
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
