# 📁 Estructura del Proyecto - Landing Page

## Organización de Carpetas

La aplicación está dividida en **frontend** y **backend** para mejor mantenibilidad y escalabilidad.

```
erick_landin/
│
├── 📂 frontend/                    # React + Vite (Puerto 5173)
│   ├── src/
│   │   ├── components/            # Componentes React
│   │   │   ├── Landing.jsx
│   │   │   ├── FormModal.jsx
│   │   │   ├── DateSelectionPage.jsx
│   │   │   ├── ThankYouPage.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── config/
│   │   │   └── environment.js     # Configuración de variables
│   │   ├── services/
│   │   │   ├── calendarService.js # Lógica de horarios
│   │   │   └── sheetsService.js   # Integración con Sheets
│   │   ├── App.jsx                # Componente principal
│   │   ├── App.css
│   │   └── index.css
│   ├── public/                    # Archivos estáticos
│   ├── package.json              # Dependencias frontend
│   ├── vite.config.js            # Configuración Vite
│   ├── eslint.config.js
│   ├── .env.local                # Variables de entorno (local)
│   ├── .env.example              # Plantilla de variables
│   ├── .gitignore
│   └── index.html
│
├── 📂 backend/                     # Node.js + Express (Puerto 3000)
│   ├── server.mjs                # Servidor Express principal
│   ├── package.json              # Dependencias backend
│   ├── .env                      # Variables de entorno (NO compartir)
│   ├── .env.example              # Plantilla de variables
│   └── .gitignore
│
├── 📄 README.md                   # Documentación principal
├── 📄 SETUP.md                    # Guía de instalación detallada
├── 📄 .gitignore                  # Git ignore global
└── 📂 node_modules/              # Módulos npm (ignorados en git)
```

## Propósito de Cada Carpeta

### Frontend (`/frontend`)
- **React + Vite**: Framework UI y bundler moderno
- **Responsabilidades**:
  - Interfaz de usuario (Landing, Formulario, Calendario)
  - Gestión de estado del usuario
  - Llamadas a API del backend
  - Variables de entorno del cliente

### Backend (`/backend`)
- **Node.js + Express**: Servidor API
- **Responsabilidades**:
  - Autenticación OAuth2 con Google
  - Integración con Google Calendar API
  - Integración con Google Sheets API
  - Procesamiento de datos del cliente
  - Gestión de tokens de autenticación

## Variables de Entorno

### Frontend (`.env.local`)
```env
# API Backend
VITE_API_ENDPOINT=http://localhost:3000

# Google OAuth (para referencias, el servidor es backend)
VITE_GOOGLE_CLIENT_ID=...
VITE_GOOGLE_CLIENT_SECRET=...
VITE_GOOGLE_CALENDAR_ID=...
VITE_GOOGLE_SHEETS_ID=...
```

### Backend (`.env`)
```env
# Google OAuth
VITE_GOOGLE_CLIENT_ID=...
VITE_GOOGLE_CLIENT_SECRET=...

# Google APIs
VITE_GOOGLE_CALENDAR_ID=...
VITE_GOOGLE_SHEETS_ID=...

# Server
PORT=3000
```

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVEGADOR (5173)                         │
│                                                             │
│  Landing.jsx → FormModal → DateSelectionPage → ThankYou   │
│       ↓            ↓             ↓                 ↓        │
│  [USER DATA]  [FORM DATA]  [DATE TIME]      [CONFIRMATION] │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP POST
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    SERVER (3000)                            │
│                                                             │
│  OAuth2 ← → Google Auth                                    │
│     ↓                                                       │
│  /api/sheets/append ─→ Google Sheets API                  │
│     ↓                                                       │
│  /api/calendar/create-event ─→ Google Calendar API        │
└────────────────────────────────────────────────────────────┘
                     ↓
     ┌───────────────┴───────────────┐
     ↓                               ↓
┌──────────────────┐      ┌──────────────────────┐
│  Google Sheets   │      │  Google Calendar     │
│  [Cliente Data]  │      │  [Event + Attendee]  │
└──────────────────┘      └──────────────────────┘
```

## Cómo Iniciar la Aplicación

### Terminal 1: Backend
```bash
cd backend
npm install
npm start

# Espera el mensaje:
# 🚀 Servidor iniciado en http://localhost:3000
```

### Terminal 2: Autenticación
```
Abre en navegador: http://localhost:3000/api/auth/login
Completa el flujo OAuth con tu Google Account
Verás: ✅ Autenticación Exitosa
```

### Terminal 3: Frontend
```bash
cd frontend
npm install
npm run dev

# Accede a: http://localhost:5173
```

## Dependencias Principales

### Frontend
- `react` - UI library
- `react-icons` - Iconografía (WhatsApp)
- `react-calendar` - Selector de fechas

### Backend
- `express` - Framework web
- `googleapis` - Google APIs
- `google-auth-library` - Autenticación OAuth2
- `cors` - Manejo de CORS
- `dotenv` - Variables de entorno

## Próximos Pasos

1. ✅ Verificar que `frontend/` y `backend/` están separados
2. ✅ Instalar dependencias en ambas carpetas
3. ✅ Configurar variables de entorno (`.env`)
4. ✅ Ejecutar backend primero
5. ✅ Autenticarse con Google
6. ✅ Ejecutar frontend
7. 🧪 Probar el flujo completo

Para instrucciones detalladas, ver `SETUP.md`

---

**Última actualización**: 14 de enero de 2026
