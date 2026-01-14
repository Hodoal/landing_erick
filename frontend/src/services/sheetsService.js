// Servicio para guardar datos en Google Sheets
import { config } from '../config/environment';

export const saveFormDataToSheet = async (formData, dateData) => {
  try {
    // Preparar los datos para la hoja de cálculo
    const timestamp = new Date().toLocaleString();
    const rowData = {
      timestamp,
      nombre: formData.nombre,
      apellido: formData.apellido,
      whatsapp: formData.whatsapp,
      email: formData.email,
      instagram: formData.instagram,
      meta: formData.meta,
      obstaculo: formData.obstaculo,
      ingresoPromedio: formData.ingresoPromedio,
      dedicacion: formData.dedicacion,
      clientes: formData.clientes,
      inversion: formData.inversion,
      confirmacion: formData.confirmacion,
      fechaAgendada: dateData.date.toLocaleDateString('es-ES'),
      horaAgendada: dateData.time,
    };

    console.log('📤 sheetsService: Iniciando envío a backend');
    console.log('   Endpoint:', config.api.endpoint);
    console.log('   Datos:', rowData);

    // Enviar datos al backend que se conectará con Google Sheets
    const response = await fetch(`${config.api.endpoint}/sheets/append`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowData),
    });

    console.log('📦 Respuesta recibida - Status:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Resultado del servidor:', result);
    return result;
  } catch (error) {
    console.error('❌ Error guardando datos en Google Sheets:', error);
    console.error('   Message:', error.message);
    console.error('   Stack:', error.stack);
    return {
      success: false,
      message: 'Error al guardar los datos',
      error: error.message,
    };
  }
};

export const getSheetData = async () => {
  try {
    if (!config.api.endpoint) {
      console.warn('API endpoint no configurado');
      return null;
    }

    const response = await fetch(`${config.api.endpoint}/sheets/read`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error leyendo Google Sheets');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error leyendo datos de Google Sheets:', error);
    return null;
  }
};
