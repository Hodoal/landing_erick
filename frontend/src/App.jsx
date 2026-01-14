import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import FormModal from './components/FormModal';
import DateSelectionPage from './components/DateSelectionPage';
import ThankYouPage from './components/ThankYouPage';
import { validateConfig } from './config/environment';
import { saveFormDataToSheet } from './services/sheetsService';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'dateSelection', 'thankYou'
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [dateData, setDateData] = useState(null);

  // Validar configuración al montar
  useEffect(() => {
    validateConfig();
  }, []);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitForm = (data) => {
    console.log('✅ FormModal.handleSubmit completado, datos:', data);
    setFormData(data);
    setShowForm(false);
    setCurrentPage('dateSelection');
  };

  const handleDateSubmit = async (dateData) => {
    console.log('🚀 handleDateSubmit iniciado');
    console.log('📋 formData:', formData);
    console.log('📅 dateData:', dateData);
    
    setDateData(dateData);
    
    // Guardar datos en Google Sheets y crear evento en Calendar
    try {
      console.log('📤 Paso 1: Enviando a Google Sheets...');
      
      // Primero guardar en Sheets
      const sheetResult = await saveFormDataToSheet(formData, dateData);
      console.log('✅ Resultado Sheets:', sheetResult);
      
      if (!sheetResult.success) {
        console.error('⚠️ Sheets retornó error:', sheetResult.message);
      }
      
      console.log('📤 Paso 2: Enviando a Google Calendar...');
      
      // Convertir hora 12h (AM/PM) a 24h
      const timeParts = dateData.time.split(' ');
      const timeOnly = timeParts[0]; // ej: "02:00"
      const meridiem = timeParts[1]; // ej: "PM"
      let [hours, minutes] = timeOnly.split(':').map(Number);
      
      if (meridiem === 'PM' && hours !== 12) {
        hours += 12;
      } else if (meridiem === 'AM' && hours === 12) {
        hours = 0;
      }
      
      const hora24 = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      console.log(`   Hora convertida: ${dateData.time} -> ${hora24}`);
      
      // Luego crear evento en Calendar
      const calendarResult = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/calendar/create-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          fecha: dateData.date.toLocaleDateString('es-ES'),
          hora: hora24,
        }),
      });

      console.log('📦 Respuesta Calendar recibida');
      const calendarData = await calendarResult.json();
      console.log('✅ Calendar Data:', calendarData);
      
      if (calendarData.success) {
        console.log('✅ Evento creado en Google Calendar');
      } else {
        console.error('❌ Error en Calendar:', calendarData.message);
      }
    } catch (error) {
      console.error('💥 Error en handleDateSubmit:', error);
      console.error('📍 Stack:', error.stack);
    }
    
    console.log('✅ Mostrando página de agradecimiento');
    setCurrentPage('thankYou');
  };

  return (
    <div className="app">
      {currentPage === 'landing' && (
        <>
          <Navbar />
          <Landing onOpenForm={handleOpenForm} />
        </>
      )}
      {currentPage === 'dateSelection' && (
        <DateSelectionPage onDateSubmit={handleDateSubmit} />
      )}
      {currentPage === 'thankYou' && <ThankYouPage />}

      {showForm && (
        <FormModal onClose={handleCloseForm} onSubmit={handleSubmitForm} />
      )}
    </div>
  );
}

export default App;
