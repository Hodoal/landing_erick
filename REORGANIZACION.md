# ✅ Reorganización Completada: Frontend y Backend Separados

## 📊 Resumen de Cambios

Tu proyecto ha sido reorganizado en una estructura clara de **Frontend** y **Backend**:

### Antes ❌
```
erick_landin/
├── src/
├── public/
├── index.html
├── package.json (Frontend)
├── vite.config.js
├── server.mjs (Backend)
├── .env.local
├── .env.backend
└── node_modules/
```

### Ahora ✅
```
erick_landin/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.local
│   └── index.html
├── backend/
│   ├── server.mjs
│   ├── package.json
│   ├── .env
│   └── .env.example
├── README.md
├── SETUP.md
└── ESTRUCTURA.md
```

## 🎯 Ventajas de Esta Organización

✅ **Separación de Responsabilidades**
- Frontend: UI + Cliente HTTP
- Backend: APIs + Lógica de servidores

✅ **Fácil Mantenimiento**
- Cada carpeta tiene su propio `package.json`
- Dependencias aisladas
- Variables de entorno separadas

✅ **Preparado para Deployment**
- Frontend: Vercel, Netlify, AWS S3
- Backend: Heroku, Railway, AWS EC2

✅ **Escalabilidad**
- Agregar más endpoints en backend sin afectar frontend
- Cambiar UI sin tocar lógica de servidor

## 🚀 Cómo Iniciar Ahora

### Opción Rápida (3 Pasos)

**Terminal 1:**
```bash
cd backend && npm install && npm start
```

**Terminal 2:**
```
Abre: http://localhost:3000/api/auth/login
Aprueba con tu Google Account
```

**Terminal 3:**
```bash
cd frontend && npm install && npm run dev
```

Luego accede a: **http://localhost:5173**

### Opción Detallada

Ver el archivo `SETUP.md` para una guía paso a paso completa.

## 📁 Qué Contiene Cada Carpeta

### `/frontend`
- **package.json**: React, Vite, React Icons, React Calendar
- **.env.local**: Variables de entorno del cliente
- **src/**: Componentes React y lógica de UI
- **public/**: Assets estáticos

### `/backend`
- **package.json**: Express, Google APIs, dotenv
- **.env**: Variables de entorno del servidor (⚠️ NO COMPARTIR)
- **server.mjs**: Servidor Express con todos los endpoints
- **.env.example**: Plantilla para `.env`

### Raíz
- **README.md**: Overview rápido
- **SETUP.md**: Guía detallada de instalación
- **ESTRUCTURA.md**: Descripción de carpetas (este archivo)

## 🔑 Variables de Entorno

### Frontend (`.env.local`)
```env
VITE_API_ENDPOINT=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=...
VITE_GOOGLE_CLIENT_SECRET=...
VITE_GOOGLE_CALENDAR_ID=...
VITE_GOOGLE_SHEETS_ID=...
```

### Backend (`.env`)
```env
VITE_GOOGLE_CLIENT_ID=...
VITE_GOOGLE_CLIENT_SECRET=...
VITE_GOOGLE_CALENDAR_ID=...
VITE_GOOGLE_SHEETS_ID=...
PORT=3000
```

⚠️ **Importante**: 
- El archivo `.env` del backend **NO** debe compartirse en Git
- Está incluido en `.gitignore` automáticamente
- Usa `.env.example` como referencia

## 🔌 Endpoints del Backend

### Disponibles en `http://localhost:3000`

```bash
# Health Check
GET /api/health

# Autenticación Google
GET /api/auth/login
GET /oauth/callback

# Google Sheets (Guardar datos)
POST /api/sheets/append

# Google Calendar
POST /api/calendar/create-event
POST /api/calendar/available-slots
```

## ✨ Flujo Completo

1. **Usuario abre landing page** (http://localhost:5173)
2. **Llena el formulario** → Se almacena en estado del React
3. **Selecciona fecha y hora** → Se consulta disponibilidad del Calendar
4. **Confirma la cita** → 
   - Frontend envía datos al backend
   - Backend guarda en Google Sheets
   - Backend crea evento en Google Calendar
   - Google envía invitación por email
5. **Página de agradecimiento** con opción WhatsApp

## 🛠️ Troubleshooting

### Backend no inicia
```bash
# Verifica puerto 3000
lsof -i :3000
# Si está en uso, cambia PORT en backend/.env
```

### Frontend no se conecta
```bash
# Verifica que backend esté corriendo
curl http://localhost:3000/api/health
# Deberías ver: {"status":"ok",...}
```

### Datos no se guardan
```bash
# 1. Autentícate primero
http://localhost:3000/api/auth/login

# 2. Revisa consola del backend para errores

# 3. Verifica IDs de Google
# Sheets ID: En URL de Google Sheets
# Calendar ID: Tu email de Gmail
```

## 📦 Instalar Dependencias

### Primera vez

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Actualizar dependencias
```bash
# En cada carpeta
npm update
```

## 🚢 Deploy (Próximos Pasos)

### Frontend a Vercel/Netlify
```bash
cd frontend
npm run build
# Subir carpeta 'dist/' a Vercel/Netlify
```

### Backend a Railway/Heroku
```bash
cd backend
# Enviar a Railway/Heroku
# Las variables de entorno se configuran en el panel
```

## 📚 Documentación Adicional

- **README.md**: Visión general rápida
- **SETUP.md**: Instrucciones paso a paso
- **ESTRUCTURA.md**: Este archivo

## ✅ Checklist de Verificación

- [ ] Carpetas `frontend/` y `backend/` existen
- [ ] Cada carpeta tiene su propio `package.json`
- [ ] `backend/.env` está configurado
- [ ] `frontend/.env.local` está configurado
- [ ] `backend/.gitignore` excluye `.env`
- [ ] Backend inicia correctamente en puerto 3000
- [ ] Frontend inicia correctamente en puerto 5173
- [ ] Puedes autenticarte en Google
- [ ] Los datos se guardan en Sheets
- [ ] Se crean eventos en Calendar

## 🎓 Siguientes Pasos

1. ✅ **Instalación** - Ver `SETUP.md`
2. ⏳ **Testing** - Probar flujo completo
3. 🔧 **Ajustes** - Personalizar según necesidad
4. 📈 **Escalado** - Agregar más features
5. 🚀 **Deploy** - Publicar en internet

---

**Última actualización**: 14 de enero de 2026

¿Necesitas ayuda con los siguientes pasos? Consulta `SETUP.md`
