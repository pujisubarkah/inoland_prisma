<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'reka-ui'
import { defineProps, defineEmits, watch, Teleport } from 'vue'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

watch(() => props.open, (val) => {
  if (!val) emits('update:open', false)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-lg shadow-lg relative min-w-[300px] max-w-[90vw] max-h-[90vh] overflow-auto">
        <slot name="content"></slot>
      </div>
    </div>
  </Teleport>
</template>
