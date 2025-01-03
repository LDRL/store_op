const { response, request } = require('express')
const {dbConnect} = require('../config/db/connection');
const { checkPassword, hashPassword } = require('../utils/auth');
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
        // res.send(token)


        res.json({
            msg: 'Inicio de sesion correcto',
            data: token,
        });
        
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


const resetPassword = async (req, res= response) => {

    try {
        const {id} = req.params
        const { contraseña } = req.body;

        const hashedPassword = await hashPassword(contraseña)

        const result = await dbConnect.query(
            `EXEC UsuarioPasswordActualizar @P_PASSWORD = ?,
            @P_ID_USUARIO = ?`,            
            {
                replacements: [hashedPassword, id],
                type: dbConnect.QueryTypes.SELECT
            }
        );

        res.status(201).json({
            msg: 'contraseña actualizada correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error con el usuario:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la contraseña',
            error: error.message
        });
    }
}

const user = async (req, res = response) => {
    return res.json(req.user)
}

const verify = async(req, res, next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({msg: 'Acceso denegado'})
    }

    try {
        const newToken = token.startsWith('Bearer ') ? token.slice(7) : token;
        
        jwt.verify(newToken,  process.env.JWT_SECRET, (err,decoded) =>{
            if(err){
                return res.status(401).json({mensaje: 'Token no valido'});
            }

            // req.user = decoded;
            next();
        })
    } catch (error) {
        return res.status(400).json({msg: 'Error al validar token'})
    }
}

module.exports = {login, resetPassword, user}