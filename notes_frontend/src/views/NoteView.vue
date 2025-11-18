<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'

const route = useRoute()
const router = useRouter()
const store = useNotesStore()

const id = computed(() => String(route.params.id))
const note = computed(() => store.getById(id.value))

const toast = ref<{ type: 'success' | 'error', msg: string } | null>(null)

function edit() {
  router.push({ name: 'note-edit', params: { id: id.value } })
}

function del() {
  if (!note.value) return
  if (confirm('Delete this note? This action cannot be undone.')) {
    store.deleteNote(id.value)
    toast.value = { type: 'success', msg: 'Note deleted.' }
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div v-if="note" class="view">
    <div v-if="toast" :class="['toast', toast.type]">{{ toast.msg }}</div>
    <div class="header">
      <h2>{{ note.title || 'Untitled' }}</h2>
      <div class="actions">
        <button class="btn" @click="edit">Edit</button>
        <button class="btn btn-danger" @click="del">Delete</button>
      </div>
    </div>
    <div class="meta">
      <small>Created: {{ new Date(note.createdAt).toLocaleString() }}</small>
      <small>•</small>
      <small>Updated: {{ new Date(note.updatedAt).toLocaleString() }}</small>
    </div>
    <div class="content">
      <pre>{{ note.content || 'No content yet.' }}</pre>
    </div>
  </div>
  <div v-else class="missing">
    <div class="card">
      <h3>Note not found</h3>
      <router-link class="btn btn-primary" to="/">Back to notes</router-link>
    </div>
  </div>
</template>

<style scoped>
.view .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.actions {
  display: flex;
  gap: 8px;
}
.btn {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  background: white;
}
.btn-danger {
  background: #fff1f2;
  color: #b91c1c;
  border-color: #fecdd3;
}
.meta {
  margin-top: 8px;
  display: flex;
  gap: 6px;
  color: var(--muted);
}
.content {
  margin-top: 16px;
  background: var(--surface);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}
.content pre {
  white-space: pre-wrap;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
}
.missing {
  display: grid;
  place-items: center;
  min-height: calc(100vh - 180px);
}
.card {
  background: var(--surface);
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
}
.btn-primary {
  border: none;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  background: var(--primary);
  color: white;
}
.toast {
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px 12px;
}
.toast.success {
  background: #ecfeff;
  color: #075985;
  border: 1px solid #a5f3fc;
}
.toast.error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
</style>
