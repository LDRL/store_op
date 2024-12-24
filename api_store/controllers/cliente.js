const bcrypt = require('bcrypt');
const { response, request } = require('express')


const {dbConnect} = require('../config/db/connection');
const { hashPassword } = require('../utils/auth');

const Getclientes = async (req= request, res= response) => {
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
            'EXEC ClienteListar @Page = :page, @Limit = :limit, @Search = :search',
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

const getCliente = (req= request, res= response) => {
    const { id } = req.params;
    res.json({
        msg: 'get cliente',
        id
    })
}

const postCliente = async (req, res= response) => {
    const { razon_social, nombre_comercial, direccion_entrega, contraseña, telefono, fecha_nacimiento, email } = req.body;
    const hashedPassword = await hashPassword(contraseña)

    try {
        const result = await dbConnect.query(
            `EXEC UsuarioClienteInsertar @P_RAZON_SOCIAL = ?,
            @P_NOMBRE_COMERCIAL = ?,
            @P_DIRECCION_ENTREGA = ?,
            @P_TELEFONO = ?,
            @P_EMAIL = ?,
            @P_PASSWORD = ?,
            @P_FECHA_NACIMIENTO = ?`,
            {
                replacements: [razon_social, nombre_comercial, direccion_entrega, telefono, email, hashedPassword, fecha_nacimiento],
                type: dbConnect.QueryTypes.SELECT
            }
        );
        res.status(201).json({
            msg: 'cliente creado correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al insertar el cliente:', error);
        res.status(500).json({
            msg: 'Hubo un error al insertar el cliente',
            error: error.message
        });
    }
}

const putCliente = async (req, res= response) => {
    const {id} = req.params
    const { razon_social, nombre_comercial, direccion_entrega,telefono, email } = req.body;
    
    try {
        const result = await dbConnect.query(
            `EXEC ClienteActualizar @P_RAZON_SOCIAL = ?,
            @P_NOMBRE_COMERCIAL = ?,
            @P_DIRECCION_ENTREGA = ?,
            @P_TELEFONO = ?,
            @P_EMAIL = ?,
            @P_ID_CLIENTE = ?`,
            
            {
                replacements: [razon_social, nombre_comercial, direccion_entrega, telefono, email, id],
                type: dbConnect.QueryTypes.SELECT
            }
        );

        res.status(201).json({
            msg: 'cliente actualizado correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el cliente',
            error: error.message
        });
    }
}
const deleteCliente = async (req, res= response) => {
    const { id } = req.params;
    try {
        const result = await dbConnect.query(
            `EXEC ClienteEliminar @P_ID_CLIENTE = ?`,
            {
                replacements: [id],
                type: dbConnect.QueryTypes.SELECT
            }
        );
        
        res.status(201).json({
            msg: 'cliente eliminada correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el cliente',
            error: error.message
        });
    }
}

module.exports = {Getclientes, getCliente, postCliente, putCliente, deleteCliente}