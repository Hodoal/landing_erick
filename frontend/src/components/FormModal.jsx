import React, { useState } from 'react';
import './FormModal.css';

function FormModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    whatsapp: '',
    email: '',
    instagram: '',
    meta: '',
    obstaculo: '',
    ingresoPromedio: '',
    dedicacion: '',
    clientes: '',
    inversion: '',
    confirmacion: '',
    terminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('📝 FormModal.handleSubmit iniciado');
    
    if (!formData.terminos) {
      console.warn('⚠️ Términos no aceptados');
      alert('Por favor acepta los términos y condiciones');
      return;
    }
    if (!formData.nombre || !formData.apellido || !formData.email) {
      console.warn('⚠️ Campos obligatorios faltando');
      alert('Por favor completa los campos obligatorios');
      return;
    }
    
    console.log('✅ Formulario validado, enviando datos:', formData);
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <small className="error">Nombre es obligatorio</small>
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido *</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="whatsapp">Cuál es tu WhatsApp *</label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              placeholder="Teléfono"
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="instagram">Cuál es tu usuario de Instagram? Ejemplo: @juan_adss *</label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              placeholder="Ingresa tu usuario de Instagram, ejemplo @juan_adss"
              value={formData.instagram}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="meta">Cuál es tu META de facturación mensual en dolares? *</label>
            <input
              type="text"
              id="meta"
              name="meta"
              placeholder="Monto en USD"
              value={formData.meta}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="obstaculo">¿Cuál sientes que ha sido tu principal obstáculo para lograr esta meta? *</label>
            <textarea
              id="obstaculo"
              name="obstaculo"
              placeholder="Escribe tu respuesta"
              value={formData.obstaculo}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>¿Cuál es tu ingreso mensual promedio? *</label>
            <div className="radio-group">
              {['200 usd - 500 usd', '500 usd - 1.000 usd', '1.000 usd - 3000 usd', '5.000 usd - 10.000 usd', '10.000 usd - 30.000 usd', '30.000 usd - 60.000 usd'].map(option => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name="ingresoPromedio"
                    value={option}
                    checked={formData.ingresoPromedio === option}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>¿A qué te dedicas actualmente? *</label>
            <div className="radio-group">
              {['Dueño de Agencia de Marketing Digital', 'Trafficker Independiente', 'Dueño de Agencia de Pauta Publicitaria', 'Trafficker trabajando en agencia'].map(option => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name="dedicacion"
                    value={option}
                    checked={formData.dedicacion === option}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Actualmente tienes clientes que les gestiones su publicidad? *</label>
            <div className="radio-group">
              {['No, actualmente no tengo clientes', 'Si, tengo entre 1 y 5 clientes', 'Si, tengo entre 6 y 10 clientes', 'Si, tengo entre 11 y 20 clientes', 'Si, tengo mas de 20 clientes'].map(option => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name="clientes"
                    value={option}
                    checked={formData.clientes === option}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>¿Si supieras que con una inversión de USD 800 mensuales te podemos garantizar escalar tu agencia o servicio de tráfico entre USD 5.000 a USD 10.000 mensuales, tú estás dispuest@ a invertir? *</label>
            <div className="radio-group">
              {['Si, los tengo', 'No lo tengo completo pero lo puedo gestionar', 'Estoy dispuest@ a gestionarlo', 'No estoy dispuest@'].map(option => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name="inversion"
                    value={option}
                    checked={formData.inversion === option}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Te CONTACTAREMOS por WhatsApp o Llamada para CONFIRMAR tu cita. Si no respondes, tendremos que cancelar la llamada. Esto lo hacemos porque estamos recibiendo muchas agendas falsas así que simplemente necesitamos confirmar que eres una persona real. *</label>
            <div className="radio-group">
              {['Si, lo entiendo y contestaré.', 'No, no contestaré, soy un bot, curioso o te estoy copiando el funnel.'].map(option => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name="confirmacion"
                    value={option}
                    checked={formData.confirmacion === option}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="terminos"
                checked={formData.terminos}
                onChange={handleChange}
              />
              Acepto los términos y condiciones. Al marcar esta casilla, acepto recibir mensajes de marketing y promocionales, incluyendo ofertas especiales, descuentos, novedades sobre productos, entre otros.
            </label>
          </div>

          <button type="submit" className="submit-button">¡QUIERO AGENDAR UNA LLAMADA AHORA!</button>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
