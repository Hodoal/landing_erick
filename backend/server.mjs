import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { sendConfirmationEmail, sendAdminEmail } from './services/emailService.mjs';
import { saveToken, loadToken, tokenExists, deleteToken } from './services/tokenService.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS con opciones específicas
const corsOptions = {
  origin: [
    'https://landing-erick-frontend.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Manejo explícito de preflight requests
app.options('*', cors(corsOptions));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', cors: 'configured' });
});

// Validar variables de entorno
const requiredEnvVars = [
  'VITE_GOOGLE_CLIENT_ID',
  'VITE_GOOGLE_CLIENT_SECRET',
  'VITE_GOOGLE_CALENDAR_ID',
  'VITE_GOOGLE_SHEETS_ID'
];

console.log('\n📋 Verificando configuración...');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.error(`❌ Faltante: ${varName}`);
  } else {
    const masked = value.substring(0, 10) + '...';
    console.log(`✅ ${varName}: ${masked}`);
  }
});

// Configurar OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.VITE_GOOGLE_CLIENT_ID,
  process.env.VITE_GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/oauth/callback'
);

// Variables globales para almacenar tokens
let accessToken = null;
let refreshToken = null;
let isAuthenticated = false;

// Cargar token guardado al iniciar
const savedToken = loadToken();
if (savedToken) {
  accessToken = savedToken.access_token;
  refreshToken = savedToken.refresh_token;
  isAuthenticated = true;
  oauth2Client.setCredentials(savedToken);
  console.log('✅ Token cargado desde almacenamiento - Autenticación previa detectada');
}

// ==================== ENDPOINTS ====================

// Endpoint para obtener el token de acceso
app.get('/api/auth/login', (req, res) => {
  // Si ya está autenticado, solo retornar mensaje
  if (isAuthenticated) {
    console.log('ℹ️  Cliente ya autenticado, usando token guardado');
    return res.json({
      authenticated: true,
      message: '✅ Ya estás autenticado. Token guardado en servidor.',
    });
  }

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
    prompt: 'consent',
  });

  console.log('📱 Usuario iniciando sesión, redirigiendo a Google OAuth...');
  res.redirect(authUrl);
});

// Verificar estado de autenticación
app.get('/api/auth/status', (req, res) => {
  res.json({
    authenticated: isAuthenticated,
    tokenSaved: tokenExists(),
    message: isAuthenticated 
      ? '✅ Autenticado y token guardado'
      : '⚠️ No autenticado',
  });
});

// Reset de autenticación (solo para desarrollo)
app.post('/api/auth/reset', (req, res) => {
  const resetKey = req.body.resetKey;
  
  // Verificar una clave de reset segura
  if (resetKey !== process.env.RESET_KEY) {
    return res.status(403).json({
      success: false,
      message: '❌ Clave de reset inválida',
    });
  }

  deleteToken();
  accessToken = null;
  refreshToken = null;
  isAuthenticated = false;
  
  res.json({
    success: true,
    message: '🔄 Autenticación reseteada. Por favor, vuelve a autenticarte.',
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    authenticated: isAuthenticated,
    timestamp: new Date().toISOString(),
    message: isAuthenticated 
      ? '✅ Backend conectado y autenticado' 
      : '⚠️ Backend conectado pero no autenticado'
  });
});

// Callback de OAuth
app.get('/oauth/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('❌ Error: No se recibió código de autorización');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    accessToken = tokens.access_token;
    refreshToken = tokens.refresh_token;
    isAuthenticated = true;

    // Guardar token para futuras sesiones
    saveToken(tokens);

    console.log('✅ Autenticación exitosa');
    console.log('   Calendar ID:', process.env.VITE_GOOGLE_CALENDAR_ID);
    console.log('   Sheets ID:', process.env.VITE_GOOGLE_SHEETS_ID);

    // HTML de éxito mejorado
    const successHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>✅ Autenticación Exitosa</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .container {
            background: white;
            padding: 50px 40px;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 500px;
            animation: slideUp 0.5s ease-out;
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .success-icon {
            font-size: 60px;
            margin-bottom: 20px;
            animation: bounce 0.6s ease-out;
          }
          @keyframes bounce {
            0% { transform: scale(0.5) rotateZ(-45deg); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          h1 {
            color: #1f2937;
            margin: 20px 0;
            font-size: 32px;
          }
          p {
            color: #6b7280;
            line-height: 1.8;
            margin: 15px 0;
            font-size: 16px;
          }
          .features {
            text-align: left;
            display: inline-block;
            background: #f3f4f6;
            padding: 20px 30px;
            border-radius: 10px;
            margin: 25px 0;
          }
          .features li {
            list-style: none;
            padding: 8px 0;
            color: #374151;
          }
          .features li:before {
            content: "✓ ";
            color: #22c55e;
            font-weight: bold;
            margin-right: 10px;
          }
          .footer-text {
            margin-top: 30px;
            font-size: 14px;
            color: #9ca3af;
          }
          button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 14px 40px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            margin-top: 25px;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
          }
          button:active {
            transform: translateY(0);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success-icon">✅</div>
          <h1>¡Autenticación Exitosa!</h1>
          <p>Tu Google Account ha sido vinculado correctamente.</p>
          
          <div class="features">
            <ul>
              <li>📅 Crear eventos en Google Calendar</li>
              <li>📊 Guardar datos en Google Sheets</li>
              <li>📧 Enviar invitaciones por correo</li>
              <li>⏰ Gestionar horarios de asesorías</li>
            </ul>
          </div>
          
          <p style="margin-top: 30px; font-size: 14px; color: #999;">Puedes cerrar esta ventana y volver a tu aplicación.</p>
          <button onclick="setTimeout(() => window.close(), 300)">Cerrar Ventana</button>
          <p class="footer-text">El backend está listo para recibir solicitudes</p>
        </div>
      </body>
      </html>
    `;
    
    res.send(successHtml);
  } catch (error) {
    console.error('❌ Error en callback:', error.message);
    res.status(500).send(`Error de autenticación: ${error.message}`);
  }
});

// Guardar datos en Google Sheets
app.post('/api/sheets/append', async (req, res) => {
  try {
    if (!isAuthenticated || !accessToken) {
      return res.status(401).json({
        success: false,
        message: '❌ No autenticado. Ejecuta http://localhost:3000/api/auth/login primero',
      });
    }

    oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });
    const sheetsApi = google.sheets({ version: 'v4', auth: oauth2Client });

    const {
      nombre,
      apellido,
      whatsapp,
      email,
      instagram,
      meta,
      obstaculo,
      ingresoPromedio,
      dedicacion,
      clientes,
      inversion,
      confirmacion,
      fechaAgendada,
      horaAgendada,
    } = req.body;

    const values = [
      [
        new Date().toLocaleString('es-CO'),
        nombre || '',
        apellido || '',
        whatsapp || '',
        email || '',
        instagram || '',
        meta || '',
        obstaculo || '',
        ingresoPromedio || '',
        dedicacion || '',
        clientes || '',
        inversion || '',
        confirmacion || '',
        fechaAgendada || '',
        horaAgendada || '',
      ],
    ];

    console.log('📊 Guardando en Sheets:', nombre, email);
    console.log('   Sheets ID:', process.env.VITE_GOOGLE_SHEETS_ID);
    console.log('   Rango: Clientes!A2');

    const response = await sheetsApi.spreadsheets.values.append({
      spreadsheetId: process.env.VITE_GOOGLE_SHEETS_ID,
      range: 'Clientes!A2',
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    console.log('✅ Datos guardados en Google Sheets');
    console.log('   Filas añadidas:', response.data.updates.updatedRows);
    res.json({ 
      success: true, 
      message: 'Datos guardados exitosamente', 
      rowsAdded: response.data.updates.updatedRows 
    });
  } catch (error) {
    console.error('❌ Error guardando en Sheets:');
    console.error('   Mensaje:', error.message);
    console.error('   Código:', error.code);
    if (error.errors) {
      console.error('   Detalles:', error.errors);
    }
    res.status(500).json({
      success: false,
      message: 'Error guardando datos',
      error: error.message,
      details: error.errors || error.code,
    });
  }
});

// Crear evento en Google Calendar
app.post('/api/calendar/create-event', async (req, res) => {
  try {
    if (!isAuthenticated || !accessToken) {
      return res.status(401).json({
        success: false,
        message: '❌ No autenticado. Ejecuta http://localhost:3000/api/auth/login primero',
      });
    }

    oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });
    const calendarApi = google.calendar({ version: 'v3', auth: oauth2Client });

    const { nombre, email, fecha, hora, duracionMinutos = 60 } = req.body;

    console.log('📅 Creando evento para:', nombre, email, fecha, hora);

    // Crear fecha y hora del evento
    const [day, month, year] = fecha.split('/');
    // Formatear con padding de ceros para ISO 8601
    const dayPadded = String(day).padStart(2, '0');
    const monthPadded = String(month).padStart(2, '0');
    // Si hora ya tiene formato HH:MM, usarlo directamente; si no, agregar :00
    const timeFormatted = hora.includes(':') ? hora : `${hora}:00`;
    const isoDateString = `${year}-${monthPadded}-${dayPadded}T${timeFormatted}:00`;
    
    console.log('   Fecha parseada:', isoDateString);
    console.log('   Hora convertida a 24h:', timeFormatted);
    
    // Calcular hora de fin (agregar duración en minutos)
    const [hStart, mStart] = timeFormatted.split(':').map(Number);
    const minutosTotal = hStart * 60 + mStart + duracionMinutos;
    const hEnd = Math.floor(minutosTotal / 60);
    const mEnd = minutosTotal % 60;
    const timeFormattedEnd = `${String(hEnd).padStart(2, '0')}:${String(mEnd).padStart(2, '0')}:00`;
    const isoDateStringEnd = `${year}-${monthPadded}-${dayPadded}T${timeFormattedEnd}`;
    
    console.log('   Hora fin:', timeFormattedEnd);
    
    const event = {
      summary: `Asesoría Personalizada - ${nombre}`,
      description: `Asesoría personalizada por Google Meet con ${nombre}\n\nCorreo: ${email}`,
      start: {
        dateTime: isoDateString,
        timeZone: 'America/Bogota',
      },
      end: {
        dateTime: isoDateStringEnd,
        timeZone: 'America/Bogota',
      },
      attendees: [
        {
          email: email,
          responseStatus: 'needsAction',
        },
      ],
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    console.log('📋 Evento objeto:', JSON.stringify(event, null, 2));
    console.log('📊 Calendar ID:', process.env.VITE_GOOGLE_CALENDAR_ID);

    const response = await calendarApi.events.insert({
      calendarId: process.env.VITE_GOOGLE_CALENDAR_ID,
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    console.log('✅ Evento creado en Google Calendar:', response.data.id);
    
    const meetLink = response.data.conferenceData?.entryPoints?.[0]?.uri || 'Pendiente';
    const horaFormato = hora.includes(':') ? hora : `${hora}:00`;
    
    // Enviar emails de confirmación
    try {
      await sendConfirmationEmail(email, nombre, `${year}-${monthPadded}-${dayPadded}`, horaFormato, meetLink);
      await sendAdminEmail(nombre, email, req.body.whatsapp || 'No proporcionado', `${year}-${monthPadded}-${dayPadded}`, horaFormato, meetLink);
      console.log('✅ Emails de confirmación enviados');
    } catch (emailError) {
      console.warn('⚠️  Error enviando emails:', emailError.message);
      // No bloqueamos si los emails fallan
    }
    
    res.json({
      success: true,
      message: 'Evento creado exitosamente',
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
      meetLink: meetLink,
    });
  } catch (error) {
    console.error('❌ Error creando evento:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error creando evento en calendario',
      error: error.message,
    });
  }
});

// Obtener horarios disponibles
app.post('/api/calendar/available-slots', async (req, res) => {
  try {
    if (!isAuthenticated || !accessToken) {
      return res.status(401).json({
        success: false,
        message: '❌ No autenticado. Ejecuta http://localhost:3000/api/auth/login primero',
      });
    }

    oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });
    const calendarApi = google.calendar({ version: 'v3', auth: oauth2Client });

    const { fecha } = req.body;
    const [day, month, year] = fecha.split('/');
    const date = new Date(`${year}-${month}-${day}T00:00:00`);

    console.log('⏰ Obteniendo horarios para:', fecha);

    // Obtener eventos del día
    const response = await calendarApi.events.list({
      calendarId: process.env.VITE_GOOGLE_CALENDAR_ID,
      timeMin: date.toISOString(),
      timeMax: new Date(date.getTime() + 24 * 60 * 60000).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    const busyTimes = events.map(e => ({
      start: new Date(e.start.dateTime || e.start.date),
      end: new Date(e.end.dateTime || e.end.date),
    }));

    // Generar slots disponibles (7 AM a 8 PM)
    const allSlots = [];
    for (let hour = 7; hour <= 20; hour++) {
      const timeStr = hour > 12 
        ? `${hour - 12}:00 PM` 
        : hour === 12 
        ? '12:00 PM' 
        : `${hour}:00 AM`;
      allSlots.push(timeStr);
    }

    const availableSlots = allSlots.filter(slot => {
      // Convertir slot a hora
      const [time, period] = slot.split(' ');
      let [hours] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      const slotStart = new Date(`${year}-${month}-${day}T${String(hours).padStart(2, '0')}:00:00`);
      const slotEnd = new Date(slotStart.getTime() + 60 * 60000);

      // Verificar si hay conflicto
      return !busyTimes.some(busy => {
        return slotStart < busy.end && slotEnd > busy.start;
      });
    });

    console.log(`✅ Encontrados ${availableSlots.length} horarios disponibles`);

    res.json({
      success: true,
      availableSlots: availableSlots.length > 0 ? availableSlots : allSlots,
      busyCount: events.length,
    });
  } catch (error) {
    console.error('❌ Error obteniendo slots:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo horarios disponibles',
      error: error.message,
    });
  }
});

// Error 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.path}`,
    availableEndpoints: [
      'GET /api/health',
      'GET /api/auth/login',
      'GET /oauth/callback',
      'POST /api/sheets/append',
      'POST /api/calendar/create-event',
      'POST /api/calendar/available-slots',
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n📝 PRÓXIMO PASO:`);
  console.log(`   Abre tu navegador en: http://localhost:${PORT}/api/auth/login`);
  console.log(`\n📊 Endpoints disponibles:`);
  console.log(`   • POST /api/sheets/append`);
  console.log(`   • POST /api/calendar/create-event`);
  console.log(`   • POST /api/calendar/available-slots`);
  console.log(`   • GET /api/health`);
  console.log(`\n${'='.repeat(60)}\n`);
});
