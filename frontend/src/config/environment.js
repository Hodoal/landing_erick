// Configuración de variables de entorno
// Las variables deben empezar con VITE_ para ser accesibles en el cliente

export const config = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    calendarId: import.meta.env.VITE_GOOGLE_CALENDAR_ID,
    sheetsId: import.meta.env.VITE_GOOGLE_SHEETS_ID,
  },
  api: {
    endpoint: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api',
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validar que las variables necesarias estén configuradas
export const validateConfig = () => {
  console.log('🔧 Validando configuración...');
  console.log('   API Endpoint:', config.api.endpoint);
  console.log('   Ambiente:', config.isDevelopment ? 'DESARROLLO' : config.isProduction ? 'PRODUCCIÓN' : 'DESCONOCIDO');
  
  if (import.meta.env.DEV) {
    console.log('✅ Configuración de desarrollo:', {
      apiEndpoint: config.api.endpoint,
      hasGoogleClientId: !!config.google.clientId,
      hasGoogleCalendarId: !!config.google.calendarId,
      hasGoogleSheetsId: !!config.google.sheetsId,
    });
  }

  // En producción, validar variables críticas
  if (import.meta.env.PROD) {
    if (!config.google.clientId) {
      console.warn('⚠️  VITE_GOOGLE_CLIENT_ID no está configurado');
    }
    if (!config.google.calendarId) {
      console.warn('⚠️  VITE_GOOGLE_CALENDAR_ID no está configurado');
    }
    if (!config.google.sheetsId) {
      console.warn('⚠️  VITE_GOOGLE_SHEETS_ID no está configurado');
    }
  }
};
