<template>
  <Table class="w-full">
    <thead>
      <tr>
        <th class="text-left p-2">Field</th>
        <th class="text-left p-2">Input</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="p-2">
          <Label for="inputValue" class="font-semibold text-blue-700">Nilai</Label>
        </td>
        <td class="p-2">
          <Input
            id="inputValue"
            v-model="value"
            placeholder="Masukkan nilai"
            class="w-full"
          />
        </td>
      </tr>
    </tbody>
  </Table>
</template>

<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table } from '@/components/ui/table'

const value = ref('')

</script>