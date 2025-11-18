<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotesSidebar from './components/NotesSidebar.vue'

interface AppEnv {
  VITE_NODE_ENV?: string
  VITE_API_BASE?: string
}

// Read environment values in module scope (ESM) and expose to template as constants
const env = (import.meta as unknown as { env: AppEnv }).env
const envName = env?.VITE_NODE_ENV || 'development'
const apiBase = env?.VITE_API_BASE || 'local'
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand">
        <div class="logo">🗒️</div>
        <div class="titles">
          <h1>Ocean Notes</h1>
          <p class="subtitle">Stay organized with ease</p>
        </div>
      </div>
      <NotesSidebar />
      <footer class="sidebar-footer">
        <small class="env">Env: {{ envName }}</small>
        <small class="env">API: {{ apiBase }}</small>
      </footer>
    </aside>

    <main class="content">
      <header class="content-header">
        <h2>Notes</h2>
      </header>
      <section class="content-body">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Ocean Professional palette */
:root {
  --primary: #2563EB;
  --secondary: #F59E0B;
  --error: #EF4444;
  --bg: #f9fafb;
  --surface: #ffffff;
  --text: #111827;
  --muted: #6b7280;
  --ring: rgba(37, 99, 235, .35);
}

.layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}

.sidebar {
  background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(249,250,251,1));
  border-right: 1px solid #e5e7eb;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: var(--surface);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 6px 20px rgba(37,99,235,0.08);
}

.logo {
  width: 40px;
  height: 40px;
  background: radial-gradient(circle at 30% 30%, rgba(37,99,235,0.2), transparent 70%),
              radial-gradient(circle at 70% 70%, rgba(245,158,11,0.2), transparent 70%);
  display: grid;
  place-items: center;
  border-radius: 10px;
  font-size: 20px;
}

.titles h1 {
  font-size: 18px;
  margin: 0;
}

.subtitle {
  color: var(--muted);
  margin: 0;
  font-size: 12px;
}

.sidebar-footer {
  margin-top: auto;
  padding: 8px 12px;
  border-top: 1px dashed #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--muted);
}

.content {
  display: grid;
  grid-template-rows: auto 1fr;
}

.content-header {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 18px 24px;
  background: linear-gradient(to right, rgba(59,130,246,0.08), rgba(249,250,251,1));
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.content-header h2 {
  margin: 0;
  letter-spacing: .2px;
}

.content-body {
  padding: 20px 24px 28px;
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    grid-row: 2;
  }
  .content {
    grid-row: 1;
  }
}

/* Focus styles */
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
  border-radius: 8px;
}
</style>
