# Widget Dashboard (Interview POC)

Single-page dashboard with **Text** and **Counter** widgets. Users can reorder widgets (drag & drop) or edit settings in the panel. Layout and settings persist via NestJS APIs using a local JSON file (no database).

## Quick start

### Backend (NestJS)

```bash
cd BE
npm install
npm run start:dev
```

API runs at **http://localhost:3001**.

### Frontend (Next.js)

```bash
cd FE
npm install
npm run dev
```

App runs at **http://localhost:3000**. Open it in the browser; ensure the backend is running so GET/PUT widgets work.
