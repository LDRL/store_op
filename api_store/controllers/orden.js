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
            data: result.slice(0, result.length -1), 
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

const getOrden = async (req= request, res= response) => {
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

const postOrdenes = async (req, res= response) => {
    const { nombre, direccion, telefono, correo_electronico, fecha_entrega, total_orden, detalle } = req.body;

    const detalleJson = JSON.stringify(detalle); 
    const fecha = new Date(fecha_entrega);
    const fechaFormateada = fecha.toISOString().split('T')[0];
    const { id_usuario } = req.user;

    try {
        const result = await dbConnect.query(`
            EXEC [dbo].[OrdenInsertar] @P_NOMBRE = ?,
                @P_DIRECCION = ?,
                @P_TELEFONO = ?,
                @P_CORREO_ELECTRONICO = ?,
                @P_FECHA_ENTREGA = ?,
                @P_ID_USUARIO = ?,
                @P_TOTAL = ?,
                @P_DETALLE = ?`,
                {
                    replacements: [nombre, direccion, telefono, correo_electronico, fechaFormateada, id_usuario, total_orden, detalleJson],
                    type: dbConnect.QueryTypes.SELECT
                }
            );

        res.json({
            message: 'Orden insertada correctamente',
            data: result[0]
        });

    } catch (error) {
        console.error('Error al insertar la orden:', error);
        res.status(500).json({
            error: 'Hubo un error al insertar la orden',
            message: error.message
        });
    }
};



const putOrden = async (req, res= response) => {
    const {id} = req.params
    const { estado } = req.body;

    console.log(id, estado)
    
    try {
        const result = await dbConnect.query(
             `EXEC OrdenEstadoActualizar @P_ID_ESTADO = ?, 
             @P_ID_ORDEN = ?`,            
             {
                 replacements: [estado, id],
                 type: dbConnect.QueryTypes.SELECT
             }
        );

        res.status(201).json({
        msg: 'orden actualizado correctamente',
        data: result[0]
        })
        
     } catch (error) {
         console.error('Error al actualizar la marca:', error);
         res.status(500).json({
             msg: 'Hubo un error al actualizar la marca',
             error: error.message
         });
    }
}
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

module.exports = {getOrdenes,getOrden, postOrdenes, putOrden,deleteOrdenes}