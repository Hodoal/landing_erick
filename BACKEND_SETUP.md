# Guía de Instalación - Backend

## Instalación del Backend

### 1. Copiar el package.json
```bash
cp backend-package.json package.json
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Renombrar variables de entorno
```bash
cp .env.local .env
```

### 4. Autenticar con Google

Ejecuta el servidor:
```bash
npm start
```

Verás un mensaje como:
```
🚀 Servidor iniciado en http://localhost:3000
📝 Para autenticar, abre: http://localhost:3000/api/auth/login
```

1. Abre tu navegador en: **http://localhost:3000/api/auth/login**
2. Haz clic en **"Iniciar sesión con Google"**
3. Selecciona tu cuenta de Google
4. Autoriza el acceso a:
   - Google Calendar
   - Google Sheets
5. Deberías ver: ✅ Autenticación exitosa

### 5. Verificar que todo funciona

Abre otra terminal y ejecuta:
```bash
curl http://localhost:3000/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "authenticated": true,
  "timestamp": "2026-01-14T..."
}
```

### 6. Ejecutar el Frontend

En otra terminal:
```bash
npm run dev
```

## Flujo Completo

1. **Usuario completa formulario** → Datos se envían al frontend
2. **Usuario selecciona fecha/hora** → Se obtienen horarios disponibles del Calendar
3. **Usuario confirma cita** → 
   - ✅ Datos se guardan en Google Sheets
   - ✅ Evento se crea en Google Calendar
   - ✅ Usuario recibe invitación por email

## Troubleshooting

### Error: "No autenticado"
**Solución:** Abre http://localhost:3000/api/auth/login y completa la autenticación

### Error: "Sheets ID no válido"
**Solución:** Verifica que VITE_GOOGLE_SHEETS_ID sea correcto en `.env`

### Error: "Calendar ID no válido"
**Solución:** El VITE_GOOGLE_CALENDAR_ID debe ser tu email de Google

### Los datos no se guardan
**Solución:** 
1. Verifica que el backend esté corriendo
2. Comprueba que el frontend está conectando a http://localhost:3000/api
3. Revisa la consola del servidor para errores

## Notas Importantes

- ⚠️ No compartas tus credenciales de Google
- 🔒 En producción, usa variables de entorno seguras
- 📊 Los datos se guardan automáticamente en Google Sheets
- 📅 Los eventos se crean en Google Calendar automáticamente
- 📧 Los invitados reciben emails con la invitación a Zoom
