<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
const router = useRouter()
const route = useRoute()

const localQuery = ref(store.query)
const filtered = computed(() => store.filtered)

function onCreate() {
  const n = store.createNote({ title: 'Untitled', content: '' })
  router.push({ name: 'note-edit', params: { id: n.id } })
}

function onSearch() {
  store.setQuery(localQuery.value)
}

function isActive(id: string) {
  return route.params.id === id
}

function fmt(ts: number) {
  const d = new Date(ts)
  return d.toLocaleString()
}
</script>

<template>
  <div class="sidebar-inner">
    <div class="actions">
      <button class="btn btn-primary" @click="onCreate">
        + New Note
      </button>
    </div>

    <div class="search">
      <input
        v-model="localQuery"
        @input="onSearch"
        type="text"
        placeholder="Search notes..."
        aria-label="Search notes"
      />
    </div>

    <div class="list">
      <div v-if="filtered.length === 0" class="empty">
        <p>No notes found.</p>
        <button class="btn btn-amber" @click="onCreate">Create your first note</button>
      </div>
      <ul v-else>
        <li v-for="n in filtered" :key="n.id" :class="{ active: isActive(n.id) }">
          <router-link :to="{ name: 'note-view', params: { id: n.id } }">
            <h4>{{ n.title || 'Untitled' }}</h4>
            <p class="preview">
              {{ n.content ? n.content.slice(0, 80) : 'No content yet.' }}
            </p>
            <small class="time">Updated: {{ fmt(n.updatedAt) }}</small>
          </router-link>
          <div class="item-actions">
            <router-link :to="{ name: 'note-edit', params: { id: n.id } }" class="edit">Edit</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sidebar-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  border: none;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: transform .06s ease, box-shadow .2s ease, background-color .2s ease;
}

.btn:active {
  transform: translateY(1px);
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

.search input {
  width: 100%;
  border: 1px solid #e5e7eb;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fff;
  transition: border-color .2s ease, box-shadow .2s ease;
}

.search input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--ring);
}

.list ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
  max-height: calc(100vh - 220px);
  overflow: auto;
  padding-right: 4px;
}

.list li {
  background: var(--surface);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 12px;
  position: relative;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

.list li.active {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--ring);
}

.list a {
  color: inherit;
  text-decoration: none;
  display: block;
}

.list h4 {
  margin: 0;
  font-size: 14px;
}

.preview {
  margin: 6px 0 2px;
  color: var(--muted);
  font-size: 12px;
}

.time {
  color: var(--muted);
}

.item-actions {
  position: absolute;
  right: 10px;
  top: 10px;
}

.item-actions .edit {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  font-size: 12px;
}
.empty {
  padding: 14px;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(245,158,11,0.08), rgba(255,255,255,1));
  display: grid;
  gap: 10px;
  text-align: center;
}
</style>
