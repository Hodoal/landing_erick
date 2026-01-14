import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAvailableTimeSlots } from '../services/calendarService';
import './DateSelectionPage.css';

function DateSelectionPage({ onDateSubmit }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar horarios disponibles cuando cambia la fecha
  useEffect(() => {
    const loadAvailableSlots = async () => {
      setLoading(true);
      try {
        const slots = await getAvailableTimeSlots(selectedDate);
        setAvailableTimeSlots(slots);
        // Seleccionar el primer horario disponible
        if (slots.length > 0) {
          setSelectedTime(slots[0]);
        }
      } catch (error) {
        console.error('Error cargando horarios:', error);
        setAvailableTimeSlots([]);
      } finally {
        setLoading(false);
      }
    };

    loadAvailableSlots();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    console.log('🔵 DateSelectionPage.handleSubmit iniciado');
    console.log('   selectedDate:', selectedDate);
    console.log('   selectedTime:', selectedTime);
    
    if (!selectedTime) {
      alert('Por favor selecciona una hora');
      return;
    }
    
    const dateData = { date: selectedDate, time: selectedTime };
    console.log('📤 Enviando dateData a App:', dateData);
    
    onDateSubmit(dateData);
  };

  return (
    <div className="date-selection-page">
      <div className="date-selection-content">
        <h1 className="date-selection-title">ESTE ES EL ULTIMO PASO</h1>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '80%' }}></div>
          <span className="progress-text">80% PARA FINALIZAR</span>
        </div>

        <p className="date-selection-subtitle">
          Ya has pasado satisfactoriamente todos los filtros, verdaderamente tienes un potencial <span className="gigante">GIGANTE</span> para convertirte en un Trafficker y Estratega 5.0 lo único que falta es que puedas agendar una videollamada.
        </p>

        <div className="date-selection-container">
          <div className="academy-info">
            <h2>Academia del estratega - LATAM Juan Ads</h2>
            <p className="duration">⏱ 60 Min</p>
            <div className="description">
              <p>Descubre cómo ser parte del gremio de estrategas digitales de mayores resultados en habla hispana</p>
              <p>En esta sesión 1 a 1 hablaremos sobre tus metas, tu situación actual y cómo la Academia del Estratega puede ayudarte a construir una agencia rentable, escalar tus servicios y conseguir clientes que paguen bien.</p>
              <p>Este espacio es 100% personalizado con</p>
            </div>
          </div>

          <div className="calendar-section">
            <p className="select-date-label">Seleccione la Fecha & Hora</p>
            <div className="calendar-wrapper">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
              />
            </div>

            <div className="time-slots">
              {loading ? (
                <p className="loading-text">Cargando horarios disponibles...</p>
              ) : availableTimeSlots.length > 0 ? (
                availableTimeSlots.map(time => (
                  <button
                    key={time}
                    className={`time-slot ${selectedTime === time ? 'active' : ''}`}
                    onClick={() => handleTimeChange(time)}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p className="no-slots-text">No hay horarios disponibles para esta fecha</p>
              )}
            </div>

            <div className="timezone">
              <label>Zona horaria</label>
              <select>
                <option>🌐 GMT-05:00 America/Bogota (GMT-5)</option>
              </select>
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
              Confirmar y Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateSelectionPage;
