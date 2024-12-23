const { response, request } = require('express')


const {dbConnect} = require('../config/db/connection');



const getOrdenes = async (req= request, res= response) => {
    const { page = 1, limite = 10 } = req.query;

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
            'EXEC OrdenListar @Page = :page, @Limit = :limit',
            {
                replacements: { page: pageNumber, limit: limitNumber },
                type: dbConnect.QueryTypes.SELECT
            }
        );

        const total = result[result.length - 1]?.Total || 0; 

        const totalPages = Math.ceil(total / limitNumber);

        res.json({
            msg: 'ordenes obtenidos con éxito',
            data: result, 
            total: total,
            limit: limitNumber,
            currentPage: pageNumber,
            totalPages: totalPages
        });

    } catch (error) {
        console.error('Error al ejecutar el procedimiento:', error);
        res.status(500).json({
            msg: 'Hubo un error al obtener las ordenes',
            error: error.message,
        });
    }
}

const getOrden = (req= request, res= response) => {
    const { id } = req.params;
    res.json({
        msg: 'getOrden',
        id
    })
}

const postOrdenes = async (req, res= response) => {
    const { nombre, direccion, telefono, correo_electronico, fecha_entrega, id_usuario, detalle } = req.body;

    const detalleJson = JSON.stringify(detalle); 

    try {
        const result = await dbConnect.query(`
            EXEC [dbo].[OrdenInsertar] @P_NOMBRE = ?,
                @P_DIRECCION = ?,
                @P_TELEFONO = ?,
                @P_CORREO_ELECTRONICO = ?,
                @P_FECHA_ENTREGA = ?,
                @P_ID_USUARIO = ?,
                @P_DETALLE = ?`,
                {
                    replacements: [nombre, direccion, telefono, correo_electronico, fecha_entrega, id_usuario, detalleJson],
                    type: dbConnect.QueryTypes.SELECT
                }
            );

        res.json({
            message: 'Orden insertada correctamente',
            data: result
        });

    } catch (error) {
        console.error('Error al insertar la orden:', error);
        res.status(500).json({
            error: 'Hubo un error al insertar la orden',
            message: error.message
        });
    }
};



const deleteOrdenes = async (req, res= response) => {
    const { id } = req.params;
    try {
        const result = await dbConnect.query(
            `EXEC OrdenEliminar @P_ID_ORDEN = ?`,
            {
                replacements: [id],
                type: dbConnect.QueryTypes.SELECT
            }
        );
        
        res.status(201).json({
            msg: 'orden eliminada correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al eliminar la orden:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la orden',
            error: error.message
        });
    }
}

module.exports = {getOrdenes, postOrdenes, deleteOrdenes}