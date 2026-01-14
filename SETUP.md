# 🚀 Guía de Instalación y Configuración

## Paso 1: Preparar las Credenciales de Google

### 1.1 Crear un Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto (ej: "Landing-Page-Asesoria")
3. En la barra de búsqueda, busca "Google Calendar API" y actívala
4. En la barra de búsqueda, busca "Google Sheets API" y actívala

### 1.2 Crear Credenciales OAuth2

1. Ve a "Credenciales" en el menú izquierdo
2. Haz clic en "Crear credenciales" → "ID de cliente de OAuth"
3. Selecciona "Aplicación web"
4. En "URIs de redirección autorizados", agrega:
   - `http://localhost:3000/oauth/callback`
5. Descarga el JSON (Client ID y Secret)

### 1.3 Configurar Google Calendar y Sheets

1. **Calendar**: Usa tu email de Gmail (ej: `tumail@gmail.com`)
2. **Sheets**: Crea una hoja de cálculo en Google Drive:
   - Nombre: "Clientes Asesorías"
   - Primera fila (headers): `Timestamp | Nombre | Apellido | WhatsApp | Email | Instagram | Meta | Obstáculo | Ingreso | Dedicación | Clientes | Inversión | Confirmación | Fecha | Hora`
   - Copia el ID de la URL: `docs.google.com/spreadsheets/d/{ID_AQUI}/...`

---

## Paso 2: Configurar el Backend

### 2.1 Instalar Dependencias

```bash
cd backend
npm install
```

### 2.2 Configurar Variables de Entorno

1. Abre el archivo `backend/.env`
2. Completa con tus valores:

```env
VITE_GOOGLE_CLIENT_ID=tu_client_id
VITE_GOOGLE_CLIENT_SECRET=tu_client_secret
VITE_GOOGLE_CALENDAR_ID=tu_email@gmail.com
VITE_GOOGLE_SHEETS_ID=tu_sheets_id
PORT=3000
```

### 2.3 Iniciar el Backend

```bash
npm start
```

Deberías ver:
```
============================================================
🚀 Servidor iniciado en http://localhost:3000
============================================================

📝 PRÓXIMO PASO:
   Abre tu navegador en: http://localhost:3000/api/auth/login
```

---

## Paso 3: Autenticar con Google

### 3.1 Abrir la URL de Autenticación

Mientras el backend esté corriendo, abre en tu navegador:
```
http://localhost:3000/api/auth/login
```

### 3.2 Autorizar el Acceso

1. Serás redirigido a Google OAuth
2. Selecciona tu cuenta de Gmail
3. Aprueba el acceso a:
   - Google Calendar
   - Google Sheets
4. Deberías ver un mensaje: ✅ Autenticación Exitosa

**Importante**: No cierres esta ventana hasta ver el mensaje de éxito.

---

## Paso 4: Configurar el Frontend

### 4.1 Instalar Dependencias

En una **NUEVA terminal** (sin cerrar la del backend):

```bash
cd frontend
npm install
```

### 4.2 Verificar Variables de Entorno

El archivo `.env.local` ya debe tener:

```env
VITE_API_ENDPOINT=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=tu_client_id
VITE_GOOGLE_CLIENT_SECRET=tu_client_secret
VITE_GOOGLE_CALENDAR_ID=tu_email@gmail.com
VITE_GOOGLE_SHEETS_ID=tu_sheets_id
```

Si no está completo, edítalo.

### 4.3 Iniciar el Frontend

```bash
npm run dev
```

Deberías ver:
```
  VITE v7.3.1  ready in 249 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Paso 5: Probar la Aplicación

### 5.1 Abrir en el Navegador

1. Ve a: `http://localhost:5173`
2. Deberías ver la landing page con video

### 5.2 Probar el Flujo Completo

1. **Llenar el formulario**
   - Haz clic en "PASO 2" o el botón debajo del video
   - Completa todos los campos
   - Haz clic en "Siguiente"

2. **Seleccionar fecha y hora**
   - Elige una fecha en el calendario
   - Selecciona un horario disponible
   - Haz clic en "Confirmar Cita"

3. **Verificar Resultados**
   - En Google Sheets: Debe aparecer una nueva fila con los datos
   - En Google Calendar: Debe aparecer un nuevo evento
   - En tu email: Deberías recibir una invitación

---

## ✅ Verificación Final

### Checklist de Configuración

- [ ] Google Cloud Project creado y APIs activadas
- [ ] OAuth2 credenciales descargadas
- [ ] `backend/.env` configurado correctamente
- [ ] `frontend/.env.local` configurado correctamente
- [ ] Backend iniciado en puerto 3000
- [ ] Autenticación completada en `/api/auth/login`
- [ ] Frontend iniciado en puerto 5173
- [ ] Puedes acceder a `http://localhost:5173`

### Checklist de Funcionalidad

- [ ] El formulario se carga correctamente
- [ ] Puedes llenar y enviar el formulario
- [ ] Los datos se guardan en Google Sheets
- [ ] Se crea un evento en Google Calendar
- [ ] Recibes un email con la invitación
- [ ] Los horarios disponibles se cargan correctamente

---

## 🛠️ Troubleshooting

### Backend no inicia

```bash
# Verifica que el puerto 3000 esté libre
lsof -i :3000

# Si hay algo usando el puerto, cambia PORT en .env
PORT=3001
```

### Error: "No autenticado"

```bash
# Asegúrate de completar el flujo en:
http://localhost:3000/api/auth/login

# Verifica que la respuesta sea:
✅ Autenticación exitosa
```

### Error: "Sheets ID no válido"

```bash
# El ID está en la URL de Google Sheets:
# docs.google.com/spreadsheets/d/{ID_AQUI}/...
# Copia exactamente el ID

# Verifica en backend/.env:
VITE_GOOGLE_SHEETS_ID=1a2b3c4d5e6f7g8h9i0j
```

### El frontend no se conecta al backend

```bash
# Verifica que backend esté corriendo:
curl http://localhost:3000/api/health

# Deberías ver:
# {"status":"ok","authenticated":true,"timestamp":"..."}

# Si no funciona, el backend no está corriendo
```

### Los datos no se guardan

```bash
# 1. Verifica que backend esté corriendo
ps aux | grep "node server.mjs"

# 2. Verifica que estés autenticado
curl http://localhost:3000/api/health

# 3. Revisa la consola del backend para errores
# Los logs mostrarán exactamente qué pasó
```

---

## 📱 Comandos Útiles

```bash
# Ver logs en tiempo real
tail -f backend/logs.txt

# Verificar puerto en uso
lsof -i :3000
lsof -i :5173

# Matar proceso en puerto
kill -9 $(lsof -t -i :3000)

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Ver estructura de carpetas
tree -L 2
```

---

## 🚢 Próximos Pasos (Después de Verificar)

### Deploy en Producción

1. **Frontend**: Deploy en Vercel/Netlify
2. **Backend**: Deploy en Railway/Heroku
3. Actualizar URLs en variables de entorno
4. Actualizar Google OAuth redirect URIs

---

**Última actualización**: 14 de enero de 2026
**Soporte**: Revisa la consola del navegador y terminal para errores detallados
