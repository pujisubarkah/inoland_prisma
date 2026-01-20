<template>
  <div class="quiz-section p-6 bg-white rounded-lg shadow border border-gray-200 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-blue-700">Kuis Pemahaman Inovasi</h2>
    <div v-if="Array.isArray(quiz)">
      <div v-for="(q, qIdx) in quiz" :key="qIdx" class="mb-6">
        <p class="mb-4 text-gray-700">{{ q.question }}</p>
        <form @submit.prevent="handleSubmit" v-if="!isSubmitted[qIdx]">
          <div v-for="(option, idx) in q.options" :key="idx" class="mb-3">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                :value="option"
                v-model="selectedOptions[qIdx]"
                :disabled="isSubmitted[qIdx]"
                class="form-radio text-blue-600 mr-2"
              />
              <span>{{ option }}</span>
            </label>
          </div>
        </form>
        <div v-if="isSubmitted[qIdx]" class="mt-4">
          <span v-if="selectedOptions[qIdx] === q.correctAnswer" class="text-blue-700 font-semibold">
            Jawaban benar! 🎉
          </span>
          <span v-else class="text-red-600 font-semibold">
            Jawaban salah. Jawaban yang benar: <b>{{ q.correctAnswer }}</b>
          </span>
        </div>
      </div>
      <button
        @click="handleSubmitAll"
        class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        :disabled="isAllSubmitted || !allSelected"
      >
        Submit All
      </button>
    </div>
    <div v-else>
      <p class="mb-6 text-gray-700">{{ quiz.question }}</p>
      <form @submit.prevent="handleSubmit" v-if="!isSubmitted[0]">
        <div v-for="(option, idx) in quiz.options" :key="idx" class="mb-3">
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              :value="option"
              v-model="selectedOptions[0]"
              :disabled="isSubmitted[0]"
              class="form-radio text-blue-600 mr-2"
            />
            <span>{{ option }}</span>
          </label>
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          :disabled="isSubmitted[0] || !selectedOptions[0]"
        >
          Submit
        </button>
      </form>
      <div v-if="isSubmitted[0]" class="mt-4">
        <span v-if="selectedOptions[0] === quiz.correctAnswer" class="text-blue-700 font-semibold">
          Jawaban benar! 🎉
        </span>
        <span v-else class="text-red-600 font-semibold">
          Jawaban salah. Jawaban yang benar: <b>{{ quiz.correctAnswer }}</b>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  quiz: {
    type: [Object, Array],
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['quiz-complete'])

const quizzes = computed(() => Array.isArray(props.quiz) ? props.quiz : [props.quiz])
const selectedOptions = ref(new Array(quizzes.value.length).fill(''))
const isSubmitted = ref(new Array(quizzes.value.length).fill(false))

const allSelected = computed(() => selectedOptions.value.every(option => option !== ''))
const isAllSubmitted = computed(() => isSubmitted.value.every(sub => sub))

watch(() => props.quiz, () => {
  const len = Array.isArray(props.quiz) ? props.quiz.length : 1
  selectedOptions.value = new Array(len).fill('')
  isSubmitted.value = new Array(len).fill(props.isCompleted)
})

function handleSubmit() {
  // For single quiz
  isSubmitted.value[0] = true
  if (selectedOptions.value[0] === props.quiz.correctAnswer) {
    emit('quiz-complete')
  }
}

function handleSubmitAll() {
  // For multiple quizzes
  isSubmitted.value = new Array(quizzes.value.length).fill(true)
  const allCorrect = quizzes.value.every((q, idx) => selectedOptions.value[idx] === q.correctAnswer)
  if (allCorrect) {
    emit('quiz-complete')
  }
}
</script>

<style scoped>
.quiz-section {
  margin-top: 2rem;
}
</style>
