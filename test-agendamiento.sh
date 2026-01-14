#!/bin/bash

echo "🧪 TEST: Verificar que el Agendamiento Funciona"
echo "=================================================="
echo ""

# Test 1: Health Check
echo "Test 1: Health Check del Backend"
echo "--------------------------------"
HEALTH=$(curl -s http://localhost:3000/api/health)
echo "Respuesta: $HEALTH"
if echo "$HEALTH" | grep -q "ok"; then
  echo "✅ Backend está corriendo"
else
  echo "❌ Backend NO está corriendo"
  echo "   Inicia con: cd backend && npm start"
  exit 1
fi

echo ""
echo "Test 2: Verificar Autenticación"
echo "-------------------------------"
AUTH=$(curl -s http://localhost:3000/api/health | grep -o '"authenticated":[^,}]*')
echo "Status: $AUTH"
if echo "$AUTH" | grep -q "true"; then
  echo "✅ Backend está autenticado con Google"
else
  echo "⚠️  Backend NO está autenticado"
  echo "   Abre: http://localhost:3000/api/auth/login"
  echo "   Y completa la autenticación con Google"
fi

echo ""
echo "Test 3: Test POST a /api/sheets/append"
echo "-------------------------------------"
SHEET_TEST=$(curl -s -X POST http://localhost:3000/api/sheets/append \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "apellido": "Usuario",
    "email": "test@example.com",
    "whatsapp": "+57 300 123 4567",
    "instagram": "@test",
    "meta": "Test",
    "obstaculo": "Test",
    "ingresoPromedio": "$1000",
    "dedicacion": "Full-time",
    "clientes": "5",
    "inversion": "$100",
    "confirmacion": true,
    "fechaAgendada": "14/01/2026",
    "horaAgendada": "10:00"
  }')

echo "Respuesta: $SHEET_TEST"
if echo "$SHEET_TEST" | grep -q "success"; then
  echo "✅ Endpoint /api/sheets/append funciona"
else
  echo "❌ Error en /api/sheets/append"
fi

echo ""
echo "Test 4: Test POST a /api/calendar/create-event"
echo "---------------------------------------------"
CAL_TEST=$(curl -s -X POST http://localhost:3000/api/calendar/create-event \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "fecha": "14/01/2026",
    "hora": "10:00"
  }')

echo "Respuesta: $CAL_TEST"
if echo "$CAL_TEST" | grep -q "success"; then
  echo "✅ Endpoint /api/calendar/create-event funciona"
else
  echo "❌ Error en /api/calendar/create-event"
fi

echo ""
echo "=================================================="
echo "✅ Tests completados"
echo ""
