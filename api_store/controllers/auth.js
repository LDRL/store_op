const { response, request } = require('express')
const {dbConnect} = require('../config/db/connection');
const { checkPassword } = require('../utils/auth');
const { generateJWT } = require('../utils/jwt');


const login = async (req, res= response) => {

    try {
        const { email, contraseña } = req.body;

        const user = await buscarUsuarioPorCorreo(email);
        if(!user){
            const error = new Error('Usuario no encontrado')
            return res.status(401).json({error: error.message})
        }

        const contraseña_correcta = await checkPassword(contraseña, user[0].password)
        if(!contraseña_correcta){
            const error = new Error('Contraseña incorrecta')
            return res.status(401).json({error: error.message})
        }

        const token = generateJWT(user[0].id_usuario, user[0].nombre, user[0].correo_electronico)
        res.send(token)
        
    } catch (error) {
        console.error('Error con el usuario:', error);
        res.status(500).json({
            msg: 'Hubo un error al insertar el producto',
            error: error.message
        });
    }
}

const buscarUsuarioPorCorreo = async (correo) => {
    try {
        const result = await dbConnect.query(
            `EXEC BuscarUsuarioPorCorreo @email = ?`,
            {
                replacements: [correo],
                type: dbConnect.QueryTypes.SELECT
            }
        );
        
        if (result && result.length <=0) {
            return false;  // Usuario encontrado
        } 
        
        return result;
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return false;
    }
};


module.exports = {login}