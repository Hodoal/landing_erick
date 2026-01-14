import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_FILE = path.join(__dirname, '.auth_token.json');

// Guardar token en archivo
export const saveToken = (token) => {
  try {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(token, null, 2));
    console.log('💾 Token guardado en:', TOKEN_FILE);
    return true;
  } catch (error) {
    console.error('❌ Error guardando token:', error.message);
    return false;
  }
};

// Cargar token del archivo
export const loadToken = () => {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      const token = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
      console.log('📂 Token cargado desde:', TOKEN_FILE);
      return token;
    }
    return null;
  } catch (error) {
    console.error('❌ Error cargando token:', error.message);
    return null;
  }
};

// Verificar si el token existe
export const tokenExists = () => {
  return fs.existsSync(TOKEN_FILE);
};

// Eliminar token
export const deleteToken = () => {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      fs.unlinkSync(TOKEN_FILE);
      console.log('🗑️  Token eliminado');
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Error eliminando token:', error.message);
    return false;
  }
};
