<template>
  <div class="quiz-section p-6 bg-white rounded-lg shadow border border-gray-200 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-blue-700">Kuis Pemahaman Inovasi</h2>
    <p class="mb-6 text-gray-700">{{ quiz.question }}</p>
    <form @submit.prevent="handleSubmit" v-if="!isSubmitted">
      <div v-for="(option, idx) in quiz.options" :key="idx" class="mb-3">
        <label class="flex items-center cursor-pointer">
          <input
            type="radio"
            :value="option"
            v-model="selectedOption"
            :disabled="isSubmitted"
            class="form-radio text-blue-600 mr-2"
          />
          <span>{{ option }}</span>
        </label>
      </div>
      <button
        type="submit"
        class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        :disabled="isSubmitted || !selectedOption"
      >
        Submit
      </button>
    </form>
    <div v-if="isSubmitted" class="mt-4">
      <span v-if="selectedOption === quiz.correctAnswer" class="text-blue-700 font-semibold">
        Jawaban benar! 🎉
      </span>
      <span v-else class="text-red-600 font-semibold">
        Jawaban salah. Jawaban yang benar: <b>{{ quiz.correctAnswer }}</b>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  quiz: {
    type: Object,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['quiz-complete'])

const selectedOption = ref('')
const isSubmitted = ref(false)

watch(() => props.quiz, () => {
  selectedOption.value = ''
  isSubmitted.value = props.isCompleted
})

function handleSubmit() {
  isSubmitted.value = true
  if (selectedOption.value === props.quiz.correctAnswer) {
    emit('quiz-complete')
  }
}
</script>

<style scoped>
.quiz-section {
  margin-top: 2rem;
}
</style>
