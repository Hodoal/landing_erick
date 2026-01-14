# Integración con Google Sheets

## Cómo configurar Google Sheets para guardar los datos

### 1. Crear una hoja de cálculo en Google Sheets

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nombra la primera pestaña como `Clientes` o `Formularios`
4. Crea las siguientes columnas en la primera fila:
   - Timestamp
   - Nombre
   - Apellido
   - WhatsApp
   - Email
   - Instagram
   - Meta
   - Obstáculo
   - Ingreso Promedio
   - Dedicación
   - Clientes
   - Inversión
   - Confirmación
   - Fecha Agendada
   - Hora Agendada

### 2. Obtener el ID de la hoja

1. Abre tu hoja de cálculo en Google Sheets
2. En la URL, copia el ID (la parte entre `/d/` y `/edit`)
   ```
   https://docs.google.com/spreadsheets/d/1mZaIK6X7... ← Este es el ID
   ```
3. Guarda este ID en tu archivo `.env.local`:
   ```
   VITE_GOOGLE_SHEETS_ID=1mZaIK6X7...
   ```

### 3. Configurar el Backend (Node.js)

Para que funcione, necesitas un backend que:
- Autentique con Google usando OAuth2
- Escriba en la hoja de cálculo usando Google Sheets API

**Instalación:**
```bash
npm install googleapis google-auth-library express cors
```

**Ejemplo de endpoint (`server.js`):**
```javascript
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const sheets = google.sheets('v4');

app.post('/api/sheets/append', async (req, res) => {
  try {
    const { timestamp, nombre, apellido, ...data } = req.body;
    
    const auth = new google.auth.GoogleAuth({
      keyFile: 'path/to/credentials.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const values = [
      [
        timestamp,
        nombre,
        apellido,
        data.whatsapp,
        data.email,
        data.instagram,
        data.meta,
        data.obstaculo,
        data.ingresoPromedio,
        data.dedicacion,
        data.clientes,
        data.inversion,
        data.confirmacion,
        data.fechaAgendada,
        data.horaAgendada,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Clientes!A:O',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      },
      auth,
    });

    res.json({ success: true, message: 'Datos guardados exitosamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));
```

### 4. Obtener credenciales de Google

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita **Google Sheets API**
4. Crea una **Service Account**
5. Descarga el archivo JSON con las credenciales
6. Guarda este archivo como `credentials.json` en tu backend

### 5. Ejecutar el backend

```bash
node server.js
```

## Flujo de datos

```
Formulario → DateSelectionPage → saveFormDataToSheet() 
→ POST /api/sheets/append → Google Sheets
```

## Notas

- Los datos se guardan con timestamp automático
- Se pueden agregar más columnas según sea necesario
- En desarrollo, los datos se loguean en la consola
- En producción, se guardan en Google Sheets automáticamente
