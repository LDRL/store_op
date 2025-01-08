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
            data: result.slice(0, result.length -1), 
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

const getCliente = async (req= request, res= response) => {
    const { id } = req.params;

    try {
        const result = await dbConnect.query(
            `EXEC ClienteBuscarId @id = ?`,
            {
                replacements: [id],
                type: dbConnect.QueryTypes.SELECT
            }
        );

        if (result && result.length === 0) {
            return null;  
        }

        res.json({
            msg: 'get cliente',
            data: result[0]
        })
    } catch (error) {
        console.error('Error al buscar el cliente:', error);
        return null;  // En caso de error, retornamos null
    }
}


const postCliente = async (req, res= response) => {
    const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

    try {
        const result = await dbConnect.query(
            `EXEC ClienteInsertar @P_RAZON_SOCIAL = ?,
            @P_NOMBRE_COMERCIAL = ?,
            @P_DIRECCION_ENTREGA = ?,
            @P_TELEFONO = ?,
            @P_EMAIL = ?`,
            {
                replacements: [razon_social, nombre_comercial, direccion_entrega, telefono, email],
                type: dbConnect.QueryTypes.SELECT
            }
        );
        res.status(201).json({
            msg: 'cliente creado correctamente',
            data: result[0]
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



const GetclienteCheckOut = async (req= request, res= response) => {

    const { id_cliente } = req.user;

    try {
        const result = await dbConnect.query(
            `EXEC ClienteBuscarId @id = ?`,
            {
                replacements: [id_cliente],
                type: dbConnect.QueryTypes.SELECT
            }
        );

        if (result && result.length === 0) {
            return null;  
        }

        res.json({
            msg: 'get cliente',
            data: result[0]
        })
    } catch (error) {
        console.error('Error al buscar el cliente:', error);
        return null;  // En caso de error, retornamos null
    }
}

const GetOrden = async (req= request, res= response) =>{
    const { id_usuario } = req.user;

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
            'EXEC ClienteOrden @id=:id_usuario, @Page = :page, @Limit = :limit, @Search = :search',
            {
                replacements: { id_usuario:id_usuario, page: pageNumber, limit: limitNumber, search: search },
                type: dbConnect.QueryTypes.SELECT
            }
        );

        const total = result[result.length - 1]?.Total || 0; 

        const totalPages = Math.ceil(total / limitNumber);

        res.json({
            msg: 'ordenes obtenidos con éxito',
            data: result.slice(0, result.length -1), 
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


const GetOrdenDetalle = async (req= request, res= response) =>{
    const { id } = req.params;

    console.log(id, "-- id del detalle")

    try {
        const result = await dbConnect.query(
            `EXEC ClienteOrdenDetalle @id = ?`,
            {
                replacements: [id],
                type: dbConnect.QueryTypes.SELECT
            }
        );

        if (result && result.length === 0) {
            return null;  
        }
        console.log("respuesta ", result[0].id_orden)


        const orden = result[0]; // Accede al primer objeto del primer conjunto de resultados
        const detalles = result[1]; // El segundo conjunto de resultados son los detalles

        // Estructura el objeto con los detalles de la orden
        const responseData = {
            id_orden: result[0].id_orden,
            fecha_creacion: result[0].fecha_creacion,
            nombre: result[0].nombre,
            direccion: result[0].direccion,
            telefono: result[0].telefono,
            correo_electronico: result[0].correo_electronico,
            fecha_entrega: result[0].fecha_entrega,
            total_orden: result[0].total_orden,
            estado: result[0].estado,
            detalle: result.slice(1).map(det => ({
                cantidad: det.cantidad,
                precio: det.precio,
                subtotal: det.subtotal,
                id_producto: det.id_producto,
                id_orden_detalle: det.id_orden_detalle,
                nombre: det.nombre,
                foto: det.foto
            }))
        };

        console.log(responseData)

        res.json({
            msg: 'get cliente',
            data: responseData
        })
    } catch (error) {
        console.error('Error al buscar el cliente:', error);
        return null;  // En caso de error, retornamos null
    }
}

module.exports = {Getclientes, getCliente, postCliente, putCliente, deleteCliente,GetclienteCheckOut, GetOrden, GetOrdenDetalle}