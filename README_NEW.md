# Landing Page - Asesorías Personalizadas

Proyecto full-stack con React (frontend) y Node.js/Express (backend) para gestionar asesorías personalizadas con integración a Google Calendar y Google Sheets.

## 📁 Estructura del Proyecto

```
erick_landin/
├── frontend/          # React + Vite (puerto 5173)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.local
├── backend/           # Express.js (puerto 3000)
│   ├── server.mjs
│   ├── package.json
│   └── .env
└── README.md          # Este archivo
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 16+ 
- npm o yarn
- Credenciales de Google (OAuth2, Calendar, Sheets)

### 1️⃣ Configurar el Backend

```bash
cd backend
npm install
npm start
```

Backend: **http://localhost:3000**

### 2️⃣ Autenticar con Google

Abre en tu navegador mientras backend corre:
```
http://localhost:3000/api/auth/login
```

### 3️⃣ Iniciar el Frontend

En otra terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend: **http://localhost:5173**

## 🔌 Endpoints del Backend

- `GET /api/health` - Verificar estado
- `GET /api/auth/login` - Autenticar con Google
- `POST /api/sheets/append` - Guardar datos en Sheets
- `POST /api/calendar/create-event` - Crear evento en Calendar
- `POST /api/calendar/available-slots` - Obtener horarios disponibles

## 📱 Variables de Entorno

### Frontend (.env.local)
```
VITE_API_ENDPOINT=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=...
VITE_GOOGLE_CLIENT_SECRET=...
VITE_GOOGLE_CALENDAR_ID=...
VITE_GOOGLE_SHEETS_ID=...
```

### Backend (.env)
```
VITE_GOOGLE_CLIENT_ID=...
VITE_GOOGLE_CLIENT_SECRET=...
VITE_GOOGLE_CALENDAR_ID=...
VITE_GOOGLE_SHEETS_ID=...
PORT=3000
```

## 📦 Scripts

**Frontend:**
- `npm run dev` - Desarrollo
- `npm run build` - Build producción
- `npm run lint` - ESLint

**Backend:**
- `npm start` - Iniciar servidor
- `npm run dev` - Con nodemon

---
**Última actualización**: 14 de enero de 2026
