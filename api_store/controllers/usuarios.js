const bcrypt = require('bcrypt');
const { response, request } = require('express')


const {dbConnect} = require('../config/db/connection');
const { hashPassword } = require('../utils/auth');

// const sql = require('mssql');

const usuariosGet = async (req= request, res= response) => {
    const { page = 1, limite = 10, search = '' } = req.query;

    // Asegurarse de que los valores de la página y límite sean enteros válidos
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

        // Ejecutar una segunda consulta para obtener el total de registros
        const totalCountResult = await dbConnect.query(
            'EXEC UsuarioListar @Page = :page, @Limit = :limit, @Search = :search',
            {
                replacements: { page: pageNumber, limit: limitNumber, search: search },
                type: dbConnect.QueryTypes.SELECT
            });

        const total = result[result.length - 1]?.Total || 0; 


        // Calcular el número total de páginas
        const totalPages = Math.ceil(total / limitNumber);

        res.json({
            msg: 'Usuarios obtenidos con éxito',
            data: result,  // Los registros de la página solicitada
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
const usuariosPut = (req, res= response) => {
    const {id} = req.params
    const { body } = req
    res.status(500).json({
        msg: 'put API - controller',
        id,
        body
    })
}
const usuariosDelete = (req, res= response) => {
    const { id } = req.params;
    res.json({
        msg: 'delete API - controller',
        id
    })
}

module.exports = {usuariosGet, getUsuario, usuariosPost, usuariosPut, usuariosDelete}