// Servicio para manejar disponibilidad de horarios
// Esta es una versión simulada que demuestra la funcionalidad
import { config } from '../config/environment';

export const getAvailableTimeSlots = async (date) => {
  // En producción, aquí se haría una llamada a Google Calendar API
  // Para demostración, simulamos horarios disponibles basado en la fecha
  
  const allTimeSlots = [
    '07:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
  ];

  // Simulación: Los fines de semana tienen menos disponibilidad
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  if (isWeekend) {
    // Fines de semana: solo tarde
    return allTimeSlots.filter(time => {
      const hour = parseInt(time.split(':')[0]);
      return hour >= 2 && hour <= 8; // 2 PM a 8 PM
    });
  }

  // Entre semana: todos los horarios disponibles
  return allTimeSlots;
};

// Función para verificar conflictos con Google Calendar
export const checkCalendarConflicts = async (startTime, endTime) => {
  try {
    // Si no hay configuración de Google Calendar, simular respuesta
    if (!config.google.clientId || !config.google.calendarId) {
      console.warn('⚠️  Google Calendar no configurado, usando simulación');
      return false;
    }

    // Aquí iría la lógica para consultar Google Calendar API
    const apiEndpoint = `${config.api.endpoint}/calendar/check-conflicts`;
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        calendarId: config.google.calendarId,
        startTime,
        endTime,
      }),
    });

    if (!response.ok) {
      throw new Error('Error verificando calendario');
    }

    const data = await response.json();
    return data.hasConflict || false;
  } catch (error) {
    console.error('Error verificando calendario:', error);
    return false;
  }
};

// Función para obtener el ID de Google Calendar del usuario
export const getGoogleCalendarId = async () => {
  try {
    // Si hay un ID configurado en .env, usarlo
    if (config.google.calendarId) {
      return config.google.calendarId;
    }

    // En producción, esto haría una llamada autenticada a Google Calendar
    return 'primary'; // Por defecto el calendario primario
  } catch (error) {
    console.error('Error obteniendo ID de calendario:', error);
    return null;
  }
};
