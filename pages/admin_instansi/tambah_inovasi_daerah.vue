<template>
	<div class="p-6">
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-2xl font-semibold">Tambah Inovasi Daerah</h2>
			<button
				@click="onAddNew"
				class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				Tambah Inovasi
			</button>
		</div>

		<!-- Inline form (visible when creating new) -->
		<div v-if="isCreating" class="mb-4 p-4 border rounded bg-white">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
				<input v-model="form.judul" placeholder="Judul" class="border px-3 py-2 rounded" />
				<input v-model="form.lokasi" placeholder="Lokasi" class="border px-3 py-2 rounded" />
				<select v-model="form.status" class="border px-3 py-2 rounded">
					<option value="draft">Draft</option>
					<option value="dipublish">Dipublish</option>
				</select>
				<textarea v-model="form.deskripsi" placeholder="Deskripsi" class="md:col-span-3 border px-3 py-2 rounded" rows="3"></textarea>
			</div>
			<div class="mt-3 flex gap-2">
				<button @click="saveNew" class="bg-green-600 text-white px-4 py-2 rounded">Simpan</button>
				<button @click="cancelNew" class="bg-gray-200 px-4 py-2 rounded">Batal</button>
			</div>
		</div>

		<!-- Table -->
		<div class="overflow-x-auto bg-white rounded shadow">
			<table class="min-w-full divide-y">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">#</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Judul</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Deskripsi</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Lokasi</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
						<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Aksi</th>
					</tr>
				</thead>
				<tbody class="divide-y">
					<tr v-for="(item, idx) in items" :key="item.id" class="odd:bg-white even:bg-gray-50">
						<td class="px-4 py-2 text-sm">{{ idx + 1 }}</td>

						<td class="px-4 py-2 text-sm w-1/4">
							<div v-if="editingId === item.id">
								<input v-model="editForm.judul" class="w-full border px-2 py-1 rounded" />
							</div>
							<div v-else class="truncate">{{ item.judul }}</div>
						</td>

						<td class="px-4 py-2 text-sm">
							<div v-if="editingId === item.id">
								<input v-model="editForm.deskripsi" class="w-full border px-2 py-1 rounded" />
							</div>
							<div v-else class="truncate">{{ item.deskripsi }}</div>
						</td>

						<td class="px-4 py-2 text-sm">
							<div v-if="editingId === item.id">
								<input v-model="editForm.lokasi" class="w-full border px-2 py-1 rounded" />
							</div>
							<div v-else>{{ item.lokasi }}</div>
						</td>

						<td class="px-4 py-2 text-sm">
							<div v-if="editingId === item.id">
								<select v-model="editForm.status" class="border px-2 py-1 rounded">
									<option value="draft">Draft</option>
									<option value="dipublish">Dipublish</option>
								</select>
							</div>
							<div v-else>
								<span class="px-2 py-1 rounded text-sm" :class="item.status === 'dipublish' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">{{ item.status }}</span>
							</div>
						</td>

						<td class="px-4 py-2 text-sm">
							<div v-if="editingId === item.id" class="flex gap-2">
								<button @click="saveEdit(item.id)" class="bg-green-600 text-white px-3 py-1 rounded">Simpan</button>
								<button @click="cancelEdit" class="bg-gray-200 px-3 py-1 rounded">Batal</button>
							</div>
							<div v-else class="flex gap-2">
								<button @click="startEdit(item)" class="bg-yellow-400 px-3 py-1 rounded">Edit</button>
								<button @click="removeItem(item.id)" class="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
							</div>
						</td>
					</tr>
					<tr v-if="items.length === 0">
						<td colspan="6" class="px-4 py-6 text-center text-gray-500">Belum ada inovasi.</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
	{ id: 1, judul: 'Inovasi Sampah Pintar', deskripsi: 'Sistem pengelolaan sampah...', lokasi: 'Kota A', status: 'draft' },
	{ id: 2, judul: 'Pertanian Vertikal', deskripsi: 'Implementasi pertanian di lahan sempit', lokasi: 'Kabupaten B', status: 'dipublish' }
])

const isCreating = ref(false)
const form = ref({ judul: '', deskripsi: '', lokasi: '', status: 'draft' })

const editingId = ref(null)
const editForm = ref({ judul: '', deskripsi: '', lokasi: '', status: 'draft' })

function onAddNew() {
	isCreating.value = true
	form.value = { judul: '', deskripsi: '', lokasi: '', status: 'draft' }
}

function saveNew() {
	const nextId = items.value.length ? Math.max(...items.value.map(i => i.id)) + 1 : 1
	items.value.unshift({ id: nextId, ...form.value })
	isCreating.value = false
}

function cancelNew() {
	isCreating.value = false
}

function startEdit(item) {
	editingId.value = item.id
	editForm.value = { judul: item.judul, deskripsi: item.deskripsi, lokasi: item.lokasi, status: item.status }
}

function saveEdit(id) {
	const idx = items.value.findIndex(i => i.id === id)
	if (idx !== -1) {
		items.value[idx] = { id, ...editForm.value }
	}
	editingId.value = null
}

function cancelEdit() {
	editingId.value = null
}

function removeItem(id) {
	items.value = items.value.filter(i => i.id !== id)
}
</script>

<style scoped>
/* small visual tweak */
table { border-collapse: collapse; }
</style>

