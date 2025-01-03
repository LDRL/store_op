const jwt = require('jsonwebtoken');
const { Response, Request, NextFunction } = require('express');
const { dbConnect } = require('../config/db/connection');

// Middleware para autenticar al usuario
const authenticate = async (req = Request, res = Response, next = NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error('No autorizado');
        return res.status(401).json({ error: error.message });
    }

    const [, token] = bearer.split(' ');

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decoded === 'object' && decoded.mail) {

            const user = await buscarUsuarioPorCorreo(decoded.mail); 

            if (user) {
                req.user = user[0]; 
                return next(); 
            } else {
                return res.status(401).json({ error: 'Usuario no encontrado en la base de datos' });
            }
        } else {
            return res.status(401).json({ error: 'Token inválido o mal formado' });
        }

    } catch (error) {
        return res.status(401).json({ error: 'Token no válido' });
    }
};

// Función para buscar un usuario por correo
const buscarUsuarioPorCorreo = async (correo) => {
    try {
        const result = await dbConnect.query(
            `EXEC BuscarUsuarioPorCorreo @email = ?`,
            {
                replacements: [correo],
                type: dbConnect.QueryTypes.SELECT
            }
        );

        // Si el usuario no existe, retornamos null
        if (result && result.length === 0) {
            return null;  // No se encuentra usuario
        }

        return result;  // Retornamos el usuario encontrado
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return null;  // En caso de error, retornamos null
    }
};

module.exports = { authenticate };
