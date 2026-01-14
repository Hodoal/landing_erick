#!/bin/bash

echo "🧪 TEST ESPECÍFICO: Google Sheets Append"
echo "========================================"
echo ""

# Primero verifica autenticación
echo "Verificando autenticación..."
AUTH=$(curl -s http://localhost:3000/api/health | grep -o '"authenticated":[^,}]*')
echo "Status: $AUTH"

if echo "$AUTH" | grep -q "false"; then
  echo "❌ Backend NO está autenticado"
  echo "   Abre: http://localhost:3000/api/auth/login"
  exit 1
fi

echo "✅ Backend autenticado"
echo ""

# Test con datos reales
echo "Enviando datos a /api/sheets/append..."
echo ""

RESPONSE=$(curl -s -X POST http://localhost:3000/api/sheets/append \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "whatsapp": "+57 300 123 4567",
    "instagram": "@juanperez",
    "meta": "Aumentar ingresos",
    "obstaculo": "Falta de clientes",
    "ingresoPromedio": "$1000-$2000",
    "dedicacion": "Tiempo completo",
    "clientes": "10",
    "inversion": "$500",
    "confirmacion": true,
    "fechaAgendada": "14/01/2026",
    "horaAgendada": "10:00"
  }')

echo "Respuesta Completa:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"

echo ""
echo "========================================"

if echo "$RESPONSE" | grep -q '"success":true'; then
  echo "✅ Datos guardados en Google Sheets"
  echo ""
  echo "Próximo paso:"
  echo "1. Abre tu Google Sheet"
  echo "2. Verifica que aparezca una nueva fila con los datos"
else
  echo "❌ Error guardando en Sheets"
  echo ""
  echo "Posibles problemas:"
  echo "1. El nombre de la hoja podría no ser 'Clientes'"
  echo "   Verifica: sheets.google.com"
  echo "2. La primera fila debería tener headers"
  echo "3. Verifica que el Sheets ID es correcto"
fi

echo ""
