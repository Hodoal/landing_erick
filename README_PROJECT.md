# 🎯 Landing Erick - Sistema de Agendamiento

Sistema completo de agendamiento con autenticación Google OAuth, integración con Google Calendar y Google Sheets, y envío automático de correos.

## ✨ Características

✅ **Autenticación Google OAuth** - Login seguro con Google  
✅ **Google Calendar Integration** - Crea eventos automáticamente  
✅ **Google Sheets** - Guarda datos de clientes  
✅ **Emails Automáticos** - Confirmación minimalista a cliente y admin  
✅ **Token Persistence** - Autenticación solo una vez  
✅ **Responsive Design** - Mobile-friendly  
✅ **Google Meet Integration** - Enlace de reunión incluido  

## 🏗️ Estructura del Proyecto

```
├── frontend/                    # React + Vite
│   ├── src/
│   │   ├── components/         # Landing, Form, DateSelection, etc.
│   │   ├── services/           # sheetsService, calendarService
│   │   ├── config/             # environment.js
│   │   └── App.jsx
│   └── package.json
│
├── backend/                     # Express.js + Node.js
│   ├── server.mjs              # Servidor principal
│   ├── services/
│   │   ├── emailService.mjs    # Envío de correos
│   │   └── tokenService.mjs    # Persistencia de tokens
│   └── package.json
│
└── README.md
```

## 🚀 Deployment a Vercel

### Requisitos
- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [GitHub](https://github.com)
- Credenciales de Google OAuth
- Gmail App Password (para envío de emails)

### Pasos de Despliegue

#### 1. Backend en Vercel

```bash
cd backend
vercel deploy --prod
```

Agregar Environment Variables en Vercel:
```
VITE_GOOGLE_CLIENT_ID=tu_client_id
VITE_GOOGLE_CLIENT_SECRET=tu_client_secret
VITE_GOOGLE_CALENDAR_ID=tu_calendar_id@gmail.com
VITE_GOOGLE_SHEETS_ID=tu_sheets_id
GMAIL_USER=tu_email@gmail.com
GMAIL_APP_PASSWORD=tu_app_password
ADMIN_EMAIL=admin@gmail.com
RESET_KEY=tu_clave_secreta
```

#### 2. Frontend en Vercel

```bash
cd frontend
vercel deploy --prod
```

Agregar Environment Variables:
```
VITE_API_ENDPOINT=https://tu-backend.vercel.app/api
VITE_GOOGLE_CLIENT_ID=tu_client_id
VITE_GOOGLE_CALENDAR_ID=tu_calendar_id@gmail.com
VITE_GOOGLE_SHEETS_ID=tu_sheets_id
```

#### 3. Configurar Google OAuth

Ve a [Google Cloud Console](https://console.cloud.google.com/apis/credentials) y agrega:

**Authorized JavaScript Origins:**
- `https://tu-frontend.vercel.app`
- `https://tu-backend.vercel.app`

**Authorized Redirect URIs:**
- `https://tu-backend.vercel.app/oauth/callback`

## 💻 Desarrollo Local

### Backend
```bash
cd backend
npm install
npm start
```
Servidor en: `http://localhost:3000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Servidor en: `http://localhost:5173`

## 📋 Variables de Entorno

### Backend (.env)
```
VITE_GOOGLE_CLIENT_ID=
VITE_GOOGLE_CLIENT_SECRET=
VITE_GOOGLE_CALENDAR_ID=
VITE_GOOGLE_SHEETS_ID=
GMAIL_USER=
GMAIL_APP_PASSWORD=
ADMIN_EMAIL=
RESET_KEY=
PORT=3000
```

### Frontend (.env.local)
```
VITE_API_ENDPOINT=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=
VITE_GOOGLE_CALENDAR_ID=
VITE_GOOGLE_SHEETS_ID=
```

## 🔑 Endpoints API

### Auth
- `GET /api/auth/login` - Inicia sesión con Google
- `GET /oauth/callback` - Callback de Google OAuth
- `GET /api/auth/status` - Verifica estado de autenticación
- `POST /api/auth/reset` - Resetea la autenticación (requiere resetKey)

### Calendar
- `POST /api/calendar/create-event` - Crea evento en Google Calendar
- `POST /api/calendar/available-slots` - Obtiene horarios disponibles

### Sheets
- `POST /api/sheets/append` - Guarda datos en Google Sheets

### Health
- `GET /api/health` - Status del servidor

## 📧 Emails

Los emails se envían automáticamente con estilo minimalista cuando se confirma un agendamiento:
- ✉️ Email al cliente con detalles de la cita y enlace a Google Meet
- ✉️ Email al admin con información del cliente

## 🔐 Seguridad

- ✅ Tokens guardados en servidor (no en frontend)
- ✅ Variables de entorno nunca expuestas
- ✅ CORS configurado
- ✅ Autenticación persistente

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- react-calendar
- Axios

**Backend:**
- Node.js
- Express.js
- googleapis
- nodemailer

**Servicios:**
- Google OAuth 2.0
- Google Calendar API v3
- Google Sheets API v4
- Gmail SMTP

## 📞 Soporte

Para preguntas o problemas, contacta a: jdelaossa59@gmail.com

## 📄 Licencia

Este proyecto está bajo licencia privada.

---

**Hecho con ❤️ para Academia del Estratega**
