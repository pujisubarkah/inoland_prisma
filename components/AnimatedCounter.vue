<!-- components/AnimatedCounter.vue -->
<template>
  <span class="animated-counter">
    {{ count }}{{ suffix }}
  </span>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' }
})

const count = ref(0)

onMounted(() => {
  const duration = 2000
  const interval = 30
  const step = Math.ceil(props.value / (duration / interval))
  let current = 0

  const timer = setInterval(() => {
    current += step
    if (current >= props.value) {
      count.value = props.value
      clearInterval(timer)
    } else {
      count.value = current
    }
  }, interval)
})
</script>

<style scoped>
.animated-counter {
  font-weight: bold;
  font-size: 2rem;
  transition: all 0.3s ease-in-out;
}
</style>