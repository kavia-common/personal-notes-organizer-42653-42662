import { ref, computed, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'

export type Note = {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

const STORAGE_KEY = 'notes_app_v1'

function loadFromStorage(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function saveToStorage(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    // storage might be full or blocked; we ignore for now
  }
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

/**
 * PUBLIC_INTERFACE
 * useNotesStore
 * This Pinia store manages notes state with CRUD operations and persistence to localStorage.
 */
export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>(loadFromStorage())
  const query = ref('')

  // keep storage synced
  watch(
    notes,
    (n) => {
      saveToStorage(n)
    },
    { deep: true }
  )

  const sorted = computed<Note[]>(() =>
    [...notes.value].sort((a, b) => b.updatedAt - a.updatedAt)
  )

  const filtered = computed<Note[]>(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return sorted.value
    return sorted.value.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    )
  })

  // PUBLIC_INTERFACE
  function setQuery(q: string) {
    /** Set current search query used to filter notes. */
    query.value = q
  }

  // PUBLIC_INTERFACE
  function createNote(initial?: Partial<Pick<Note, 'title' | 'content'>>): Note {
    /** Create a new note with optional initial title/content, returns created note. */
    const now = Date.now()
    const note: Note = {
      id: uid(),
      title: (initial?.title ?? '').trim(),
      content: initial?.content ?? '',
      createdAt: now,
      updatedAt: now,
    }
    notes.value.unshift(note)
    return note
  }

  // PUBLIC_INTERFACE
  function getById(id: string): Note | undefined {
    /** Retrieve a note by id or undefined if missing. */
    return notes.value.find((n) => n.id === id)
  }

  // PUBLIC_INTERFACE
  function updateNote(id: string, patch: Partial<Pick<Note, 'title' | 'content'>>) {
    /** Update title/content of a note by id. */
    const n = getById(id)
    if (!n) return
    if (patch.title !== undefined) n.title = patch.title
    if (patch.content !== undefined) n.content = patch.content
    n.updatedAt = Date.now()
  }

  // PUBLIC_INTERFACE
  function deleteNote(id: string) {
    /** Delete a note by id. */
    const idx = notes.value.findIndex((n) => n.id === id)
    if (idx !== -1) notes.value.splice(idx, 1)
  }

  return {
    notes,
    query,
    sorted,
    filtered,
    setQuery,
    createNote,
    getById,
    updateNote,
    deleteNote,
  }
})

/**
 * PUBLIC_INTERFACE
 * useAutosave
 * Simple autosave helper: watches sources and calls save() when changes occur with debounce.
 */
export function useAutosave(source: Ref<unknown>, save: () => void, delayMs = 1500) {
  /** Create a debounced autosave watcher for a reactive source. */
  let timer: number | undefined
  watch(
    source,
    () => {
      if (timer) window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        save()
      }, delayMs)
    },
    { deep: true }
  )
  return {
    flushNow: () => {
      if (timer) window.clearTimeout(timer)
      save()
    },
  }
}
