#!/bin/bash

echo "🚀 Iniciando Landing Page con Agendamiento"
echo "==========================================="
echo ""

# Verificar que estamos en la carpeta correcta
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
  echo "❌ Error: Ejecuta este script desde la raíz del proyecto (erick_landin/)"
  exit 1
fi

echo "📋 Paso 1: Instalar dependencias (si falta)"
echo ""

if [ ! -d "backend/node_modules" ]; then
  echo "📦 Instalando dependencias backend..."
  cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
  echo "📦 Instalando dependencias frontend..."
  cd frontend && npm install && cd ..
fi

echo ""
echo "✅ Dependencias listas"
echo ""
echo "==========================================="
echo "🚀 INSTRUCCIONES: Abre 3 terminales"
echo "==========================================="
echo ""
echo "Terminal 1 (Backend - Puerto 3000):"
echo "  cd backend && npm start"
echo ""
echo "Terminal 2 (Autenticación):"
echo "  Abre en navegador: http://localhost:3000/api/auth/login"
echo "  Aprueba con tu Google Account"
echo ""
echo "Terminal 3 (Frontend - Puerto 5173):"
echo "  cd frontend && npm run dev"
echo ""
echo "Luego accede a: http://localhost:5173"
echo ""
