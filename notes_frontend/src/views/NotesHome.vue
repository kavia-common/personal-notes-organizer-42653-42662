<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'

const router = useRouter()
const store = useNotesStore()

function createAndEdit() {
  const n = store.createNote({ title: 'Untitled', content: '' })
  router.push({ name: 'note-edit', params: { id: n.id } })
}
</script>

<template>
  <div class="home">
    <div class="card">
      <h2>Welcome to Ocean Notes</h2>
      <p>Create, view, and edit your personal notes with a clean and modern interface.</p>
      <div class="actions">
        <button class="btn btn-primary" @click="createAndEdit">Create a Note</button>
        <router-link class="btn btn-amber" to="/">Refresh</router-link>
      </div>
      <p class="hint">Your notes are stored locally in your browser for now.</p>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: grid;
  place-items: center;
  min-height: calc(100vh - 120px);
}

.card {
  max-width: 720px;
  width: 100%;
  background: var(--surface);
  border: 1px solid #e5e7eb;
  padding: 22px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.04);
  background-image: radial-gradient(circle at 10% 10%, rgba(37,99,235,0.05), transparent 30%),
                    radial-gradient(circle at 90% 90%, rgba(245,158,11,0.08), transparent 35%);
}

.actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
}

.btn {
  border: none;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: transform .06s ease, box-shadow .2s ease, background-color .2s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 6px 18px rgba(37,99,235,0.25);
}

.btn-amber {
  background: var(--secondary);
  color: #111827;
  box-shadow: 0 6px 18px rgba(245,158,11,0.25);
}

.hint {
  margin-top: 10px;
  color: var(--muted);
  font-size: 12px;
}
</style>
