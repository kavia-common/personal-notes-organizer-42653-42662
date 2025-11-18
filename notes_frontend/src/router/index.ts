import { createRouter, createWebHistory } from 'vue-router'

const NotesHome = () => import('../views/NotesHome.vue')
const NoteView = () => import('../views/NoteView.vue')
const NoteEditor = () => import('../views/NoteEditor.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: NotesHome },
    { path: '/note/:id', name: 'note-view', component: NoteView, props: true },
    { path: '/new', name: 'note-new', component: NoteEditor },
    { path: '/edit/:id', name: 'note-edit', component: NoteEditor, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
