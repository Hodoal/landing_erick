import nodemailer from 'nodemailer';

// Configurar transporte de email usando Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Template de email minimalista para confirmación de cita
const confirmationEmailTemplate = (nombre, fecha, hora, meetLink) => {
  const fechaFormato = new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0; }
    .header h1 { margin: 0; font-size: 24px; color: #000; }
    .content { padding: 30px 0; }
    .detail { display: flex; margin-bottom: 15px; }
    .detail-label { font-weight: 600; min-width: 120px; color: #666; }
    .detail-value { color: #000; }
    .button-container { text-align: center; padding: 30px 0; }
    .button { background-color: #4285F4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: 600; display: inline-block; }
    .button:hover { background-color: #1967D2; }
    .footer { text-align: center; padding-top: 20px; border-top: 2px solid #f0f0f0; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Cita Confirmada</h1>
    </div>
    
    <div class="content">
      <p>Hola <strong>${nombre}</strong>,</p>
      <p>Tu cita ha sido confirmada exitosamente. Aquí están los detalles:</p>
      
      <div class="detail">
        <span class="detail-label">📅 Fecha:</span>
        <span class="detail-value">${fechaFormato}</span>
      </div>
      
      <div class="detail">
        <span class="detail-label">⏰ Hora:</span>
        <span class="detail-value">${hora}</span>
      </div>
      
      <div class="button-container">
        <a href="${meetLink}" class="button">Acceder a la Reunión</a>
      </div>
      
      <p>Se te enviará un recordatorio 15 minutos antes de la cita. Si necesitas reprogramar o tienes preguntas, no dudes en contactarnos.</p>
      <p>¡Nos vemos pronto!</p>
    </div>
    
    <div class="footer">
      <p>© 2026 Academia del Estratega - LATAM Juan Ads. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Template de email para el dueño/administrador
const adminEmailTemplate = (nombre, email, whatsapp, fecha, hora, meetLink) => {
  const fechaFormato = new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0; }
    .header h1 { margin: 0; font-size: 24px; color: #000; }
    .content { padding: 30px 0; }
    .detail { display: flex; margin-bottom: 15px; }
    .detail-label { font-weight: 600; min-width: 120px; color: #666; }
    .detail-value { color: #000; }
    .button-container { text-align: center; padding: 30px 0; }
    .button { background-color: #4285F4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: 600; display: inline-block; }
    .button:hover { background-color: #1967D2; }
    .footer { text-align: center; padding-top: 20px; border-top: 2px solid #f0f0f0; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📌 Nueva Cita Agendada</h1>
    </div>
    
    <div class="content">
      <p>Se ha agendado una nueva cita. Aquí están los detalles del cliente:</p>
      
      <div class="detail">
        <span class="detail-label">👤 Nombre:</span>
        <span class="detail-value">${nombre}</span>
      </div>
      
      <div class="detail">
        <span class="detail-label">📧 Email:</span>
        <span class="detail-value">${email}</span>
      </div>
      
      <div class="detail">
        <span class="detail-label">📱 WhatsApp:</span>
        <span class="detail-value">${whatsapp}</span>
      </div>
      
      <div class="detail">
        <span class="detail-label">📅 Fecha:</span>
        <span class="detail-value">${fechaFormato}</span>
      </div>
      
      <div class="detail">
        <span class="detail-label">⏰ Hora:</span>
        <span class="detail-value">${hora}</span>
      </div>
      
      <div class="button-container">
        <a href="${meetLink}" class="button">Acceder a la Reunión</a>
      </div>
    </div>
    
    <div class="footer">
      <p>© 2026 Academia del Estratega - LATAM Juan Ads. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
  `;
};

// Función para enviar email de confirmación
export const sendConfirmationEmail = async (clientEmail, nombre, fecha, hora, meetLink) => {
  try {
    console.log('📧 Enviando email de confirmación a:', clientEmail);
    
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: clientEmail,
      subject: '✅ Tu cita ha sido confirmada - Academia del Estratega',
      html: confirmationEmailTemplate(nombre, fecha, hora, meetLink),
    });
    
    console.log('✅ Email de confirmación enviado exitosamente');
  } catch (error) {
    console.error('❌ Error enviando email de confirmación:', error.message);
    throw error;
  }
};

// Función para enviar email al administrador
export const sendAdminEmail = async (nombre, email, whatsapp, fecha, hora, meetLink) => {
  try {
    console.log('📧 Enviando email al administrador');
    
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: `📌 Nueva cita agendada - ${nombre}`,
      html: adminEmailTemplate(nombre, email, whatsapp, fecha, hora, meetLink),
    });
    
    console.log('✅ Email al administrador enviado exitosamente');
  } catch (error) {
    console.error('❌ Error enviando email al administrador:', error.message);
    throw error;
  }
};

export default transporter;
