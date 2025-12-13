import jwt from 'jsonwebtoken';

// 1. Middleware para verificar que el usuario está logueado
export const verifyToken = (req, res, next) => {
    // Esperamos el header: "Authorization: Bearer <token>"
    const authHeader = req.headers['authorization'];
    
    // Separamos "Bearer" del token real
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado: Token requerido' });
    }

    try {
        // Verificamos el token con la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // ¡IMPORTANTE! Guardamos los datos del usuario en la request
        // decoded tendrá: { id: 1, role: 'admin', iat: ..., exp: ... }
        req.user = decoded; 
        
        next(); // Pasamos al siguiente middleware
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

// 2. Middleware para verificar que el usuario es ADMIN
// ESTE SIEMPRE DEBE IR DESPUÉS DE verifyToken
export const verifyAdmin = (req, res, next) => {
    // Verificamos si verifyToken hizo su trabajo y si el rol es 'admin'
    if (req.user && req.user.role === 'admin') {
        next(); // Es admin, puede pasar
    } else {
        return res.status(403).json({ 
            error: 'Acceso prohibido: Se requieren permisos de administrador' 
        });
    }
};