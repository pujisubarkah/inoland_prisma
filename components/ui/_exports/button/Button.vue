<template>
  <button
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { buttonVariants, type ButtonVariants } from './index'

interface Props extends ButtonVariants {
  asChild?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
})

const buttonClasses = computed(() =>
  buttonVariants({
    variant: props.variant,
    size: props.size,
  })
)
</script>