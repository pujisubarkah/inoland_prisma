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

<template>  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[99999999] flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-xl shadow-xl relative min-w-[300px] max-w-[95vw] max-h-[95vh] border-2 border-blue-400 flex flex-col">
        <div class="overflow-auto flex-1">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
