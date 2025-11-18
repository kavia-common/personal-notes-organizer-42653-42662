# Ocean Notes (Vue 3 + Vite)

A simple notes-taking app with create, view, edit, and delete, following the Ocean Professional style guide.

- Persistence: localStorage (key `notes_app_v1`)
- Routes:
  - `/` list/home
  - `/note/:id` view note
  - `/new` create note
  - `/edit/:id` edit note

## Environment variables

These are read via `import.meta.env` when available (no backend required):

- `VITE_API_BASE`
- `VITE_BACKEND_URL`
- `VITE_FRONTEND_URL`
- `VITE_WS_URL`
- `VITE_NODE_ENV`
- `VITE_ENABLE_SOURCE_MAPS`
- `VITE_PORT`
- `VITE_LOG_LEVEL`
- `VITE_FEATURE_FLAGS`
- `VITE_EXPERIMENTS_ENABLED`

## Project Setup

```sh
npm install
```

### Development (port 3000)

```sh
npm run dev
```

Open the running container URL: http://localhost:3000 (or the preview URL).

### Production build

```sh
npm run build
npm run preview
```

## Notes

- Autosave: Fields autosave every ~2 seconds and on blur.
- Delete: Confirms before removing a note.
- Search: Filters titles and content in the sidebar.
- Styling: Primary #2563EB and secondary #F59E0B with subtle gradients and shadows.
