<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore, useAutosave } from '@/stores/notes'

const route = useRoute()
const router = useRouter()
const store = useNotesStore()

const id = computed(() => (route.params.id ? String(route.params.id) : null))
const existing = computed(() => (id.value ? store.getById(id.value) : undefined))

const form = reactive({
  title: '',
  content: '',
})

const toast = ref<{ type: 'success' | 'error', msg: string } | null>(null)

// Initialize form from existing note (edit) or blank (new)
watchEffect(() => {
  if (existing.value) {
    form.title = existing.value.title
    form.content = existing.value.content
  } else {
    form.title = form.title || ''
    form.content = form.content || ''
  }
})

function saveNow() {
  if (id.value) {
    store.updateNote(id.value, { title: form.title.trim(), content: form.content })
    toast.value = { type: 'success', msg: 'Saved.' }
  } else {
    const created = store.createNote({ title: form.title.trim(), content: form.content })
    toast.value = { type: 'success', msg: 'Created.' }
    router.replace({ name: 'note-edit', params: { id: created.id } })
  }
}

const { flushNow } = useAutosave(computed(() => ({ title: form.title, content: form.content })), saveNow, 2000)

function onBlur() {
  flushNow()
}

function goView() {
  if (!id.value) return
  router.push({ name: 'note-view', params: { id: id.value } })
}

function del() {
  if (!id.value) return
  if (confirm('Delete this note?')) {
    store.deleteNote(id.value)
    toast.value = { type: 'success', msg: 'Note deleted.' }
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div class="editor">
    <div v-if="toast" :class="['toast', toast.type]">{{ toast.msg }}</div>

    <div class="row">
      <input
        class="title"
        v-model="form.title"
        placeholder="Note title"
        aria-label="Note title"
        @blur="onBlur"
      />
      <div class="toolbar">
        <button class="btn" @click="saveNow">Save</button>
        <button v-if="id" class="btn" @click="goView">View</button>
        <button v-if="id" class="btn btn-danger" @click="del">Delete</button>
      </div>
    </div>

    <textarea
      class="content"
      v-model="form.content"
      placeholder="Start typing..."
      aria-label="Note content"
      rows="16"
      @blur="onBlur"
    />
  </div>
</template>

<style scoped>
.editor {
  display: grid;
  gap: 12px;
}

.row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.title {
  flex: 1;
  border: 1px solid #e5e7eb;
  padding: 12px 14px;
  border-radius: 12px;
  background: #fff;
  font-size: 18px;
  font-weight: 600;
}

.title:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--ring);
}

.toolbar {
  display: flex;
  gap: 8px;
}

.btn {
  border: 1px solid #e5e7eb;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  background: white;
  font-weight: 600;
}

.btn-danger {
  background: #fff1f2;
  color: #b91c1c;
  border-color: #fecdd3;
}

.content {
  width: 100%;
  border: 1px solid #e5e7eb;
  padding: 12px 14px;
  border-radius: 12px;
  background: #fff;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  min-height: 320px;
}

.content:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--ring);
}

/* Toast */
.toast {
  margin-bottom: 4px;
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
