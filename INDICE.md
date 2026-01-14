# 📚 Índice de Documentación

## 🎯 Empezar Aquí

1. **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** ⭐ **Recomendado**
   - 3 pasos para tener todo funcionando
   - Ideal si ya tienes las credenciales de Google

2. **[SETUP.md](SETUP.md)** 📖 **Completo**
   - Guía detallada paso a paso
   - Desde crear credenciales de Google
   - Includes troubleshooting

3. **[README.md](README.md)** 📋 **Overview**
   - Vista rápida del proyecto
   - Endpoints disponibles
   - Estructura básica

## 📁 Documentación Técnica

4. **[ESTRUCTURA.md](ESTRUCTURA.md)** 🏗️
   - Descripción detallada de carpetas
   - Propósito de cada componente
   - Flujo de datos

5. **[REORGANIZACION.md](REORGANIZACION.md)** 🔄
   - Explicación de cambios realizados
   - Ventajas de la nueva estructura
   - Antes vs. Después

## 🗂️ Estructura del Proyecto

```
erick_landin/
│
├── 📂 frontend/          ← React + Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.local
│
├── 📂 backend/           ← Node.js + Express
│   ├── server.mjs
│   ├── package.json
│   └── .env
│
└── 📚 Documentación
    ├── README.md
    ├── SETUP.md
    ├── INICIO_RAPIDO.md
    ├── ESTRUCTURA.md
    └── REORGANIZACION.md
```

## ⚡ Flujo Recomendado

### Si es tu Primera Vez

1. Lee: **INICIO_RAPIDO.md** (5 minutos)
2. Si necesitas más detalles: **SETUP.md** (30 minutos)
3. Para entender la estructura: **ESTRUCTURA.md** (10 minutos)

### Si Necesitas Ayuda

1. Problema específico → **SETUP.md** → 🛠️ Troubleshooting
2. Quiero entender → **ESTRUCTURA.md**
3. Cambios realizados → **REORGANIZACION.md**

### Para Desarrollo

1. Referencia: **README.md** (endpoints, variables)
2. Estructura: **ESTRUCTURA.md** (dónde va qué)
3. Guía: **SETUP.md** (si hay problemas)

## 🔑 Puntos Clave

### Backend (Puerto 3000)
- Express.js
- Google OAuth2
- Google Calendar API
- Google Sheets API

### Frontend (Puerto 5173)
- React + Vite
- Formulario y Calendario
- Llamadas a API backend

### Variables de Entorno
- **backend/.env** - Credenciales OAuth
- **frontend/.env.local** - URL del API

## 📊 Checklist de Instalación

- [ ] Credenciales Google obtenidas
- [ ] `backend/.env` configurado
- [ ] `frontend/.env.local` configurado
- [ ] `npm install` en backend/
- [ ] `npm install` en frontend/
- [ ] `npm start` en backend/
- [ ] Autenticación completada
- [ ] `npm run dev` en frontend/
- [ ] Acceso a http://localhost:5173

## 🚀 Próximos Pasos

### Ahora
1. Sigue: **INICIO_RAPIDO.md**
2. O si necesitas más: **SETUP.md**

### Después
1. Prueba la aplicación
2. Verifica datos en Google Sheets
3. Verifica eventos en Google Calendar

### Deploy
1. Frontend → Vercel/Netlify
2. Backend → Railway/Heroku

## 💡 Tips

- Comienza por `INICIO_RAPIDO.md` si ya tienes credenciales
- Usa `SETUP.md` para instrucciones detalladas
- Consulta `ESTRUCTURA.md` para entender el código
- Ve a `README.md` para referencia rápida de APIs

## ❓ Preguntas Frecuentes

**¿Por qué está dividido en frontend y backend?**
- Mejor mantenibilidad, escalabilidad y deployment

**¿Qué puerto usa cada uno?**
- Backend: 3000
- Frontend: 5173

**¿Dónde configuro las credenciales?**
- Backend: `backend/.env`
- Frontend: `frontend/.env.local`

**¿Cómo de seguro es el proyecto?**
- Backend maneja OAuth2 de forma segura
- Tokens nunca se exponen al frontend
- Variables de entorno no se versionan en Git

---

**¿Listo para empezar?** → Abre [INICIO_RAPIDO.md](INICIO_RAPIDO.md)

**¿Necesitas ayuda?** → Ve a [SETUP.md](SETUP.md)

**Última actualización**: 14 de enero de 2026
