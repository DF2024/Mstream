
// 1. Validar Email (Regex estándar)
export const isValidEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

// 2. Validar Username (Mínimo 3 letras)
export const isValidUsername = (username) => {
  return typeof username === 'string' && username.trim().length >= 3;
};

// 3. Validar Password (Ejemplo: Mínimo 6 caracteres)
export const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

// 4. Función principal que agrupa todo
export const validateRegisterInput = (username, email, password) => {
  if (!isValidUsername(username)) {
    return {
      isValid: false,
      error: 'El nombre de usuario debe tener al menos 3 caracteres.'
    };
  }
  
  if (!isValidEmail(email)) {
    return { 
      isValid: false, 
      error: 'El correo electrónico no es válido.' 
    };
  }

  if (!isValidPassword(password)) {
    return {
      isValid: false,
      error: 'La contraseña debe tener al menos 6 caracteres.'
    };
  }

  return { isValid: true };
};