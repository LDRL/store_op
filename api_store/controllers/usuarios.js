const bcrypt = require('bcrypt');
const { response, request } = require('express')


const {dbConnect} = require('../config/db/connection');
const { hashPassword } = require('../utils/auth');

// const sql = require('mssql');

const usuariosGet = async (req= request, res= response) => {
    const { page = 1, limite = 10, search = '' } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limite);

    if (isNaN(pageNumber) || pageNumber < 1) {
        return res.status(400).json({ msg: 'Página inválida' });
    }

    if (isNaN(limitNumber) || limitNumber < 1) {
        return res.status(400).json({ msg: 'Límite inválido' });
    }


    try {
        const result = await dbConnect.query(
            'EXEC UsuarioListar @Page = :page, @Limit = :limit, @Search = :search',
            {
                replacements: { page: pageNumber, limit: limitNumber, search: search },
                type: dbConnect.QueryTypes.SELECT
            }
        );

        const total = result[result.length - 1]?.Total || 0; 

        const totalPages = Math.ceil(total / limitNumber);

        res.json({
            msg: 'Usuarios obtenidos con éxito',
            data: result, 
            total: total,
            limit: limitNumber,
            currentPage: pageNumber,
            totalPages: totalPages
        });

    } catch (error) {
        console.error('Error al ejecutar el procedimiento:', error);
        res.status(500).json({
            msg: 'Hubo un error al obtener los usuarios',
            error: error.message,
        });
    }
}

const getUsuario = (req= request, res= response) => {
    const { id } = req.params;
    res.json({
        msg: 'getUsuario',
        id
    })
}

const usuariosPost = async (req, res= response) => {
    const { email, nombre, contraseña, telefono, fecha_nacimiento, id_rol } = req.body;
    const hashedPassword = await hashPassword(contraseña)

    try {
        const result = await dbConnect.query(
            `EXEC UsuarioInsertar @P_CORREO_ELECTRONICO = ?,
            @P_NOMBRE = ?,
            @P_PASSWORD = ?,
            @P_TELEFONO = ?,
            @P_FECHA_NACIMIENTO = ?,
            @P_ID_ROL = ?`,
            {
                replacements: [email, nombre, hashedPassword, telefono, fecha_nacimiento, id_rol],
                type: dbConnect.QueryTypes.SELECT
            }
        );
        res.status(201).json({
            msg: 'usuaio creado correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al insertar el usuario:', error);
        res.status(500).json({
            msg: 'Hubo un error al insertar el producto',
            error: error.message
        });
    }
}

const usuariosPut = async (req, res= response) => {
    const {id} = req.params
    const { email, nombre, telefono, fecha_nacimiento, id_rol } = req.body;
    
    try {
        const result = await dbConnect.query(
            `EXEC UsuarioActualizar @P_CORREO_ELECTRONICO = ?,
            @P_NOMBRE = ?,
            @P_TELEFONO = ?,
            @P_FECHA_NACIMIENTO = ?,
            @P_ID_ROL = ?,
            @P_ID_USUARIO = ?`,
            
            {
                replacements: [email, nombre, telefono, fecha_nacimiento, id_rol, id],
                type: dbConnect.QueryTypes.SELECT
            }
        );

        res.status(201).json({
            msg: 'usuario actualizada correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al actualizar la usuario:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la usuario',
            error: error.message
        });
    }
}
const usuariosDelete = async (req, res= response) => {
    const { id } = req.params;
    try {
        const result = await dbConnect.query(
            `EXEC UsuarioEliminar @P_ID_USUARIO = ?`,
            {
                replacements: [id],
                type: dbConnect.QueryTypes.SELECT
            }
        );
        
        res.status(201).json({
            msg: 'usuario eliminada correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al eliminar la usuario:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la usuario',
            error: error.message
        });
    }
}

module.exports = {usuariosGet, getUsuario, usuariosPost, usuariosPut, usuariosDelete}