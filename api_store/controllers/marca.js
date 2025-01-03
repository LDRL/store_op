const { response, request } = require('express')
const {dbConnect} = require('../config/db/connection');
const { body, validationResult } = require('express-validator');


const getMarcas = async (req= request, res= response) => {
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
            'EXEC MarcaListar @Page = :page, @Limit = :limit, @Search = :search',
            {
                replacements: { page: pageNumber, limit: limitNumber, search: search },
                type: dbConnect.QueryTypes.SELECT
            }
        );

        const total = result[result.length - 1]?.Total || 0; 


        const totalPages = Math.ceil(total / limitNumber);

        res.json({
            msg: 'Marcas obtenidas con éxito',
            data: result.slice(0, result.length -1),
            total: total,
            limit: limitNumber,
            currentPage: pageNumber,
            totalPages: totalPages
        });

    } catch (error) {
        console.error('Error al ejecutar el procedimiento:', error);
        res.status(500).json({
            msg: 'Hubo un error al obtener las marcas',
            error: error.message,
        });
    }
}

const getMarca = async (req= request, res= response) => {
    const { id } = req.params;
    try {
        const result = await dbConnect.query(
            `EXEC MarcaBuscarId @id = ?`,
            {
                replacements: [id],
                type: dbConnect.QueryTypes.SELECT
            }
        );

        if (result && result.length === 0) {
            return null;  
        }

        res.json({
            msg: 'get marca',
            data: result[0]
        })
    } catch (error) {
        console.error('Error al obtener la marca:', error);
        return null;  // En caso de error, retornamos null
    }
}

const validarMarca = [
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacío') 
];

const postMarcas = async (req, res= response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre } = req.body;
    
    try {
        const result = await dbConnect.query(
            'EXEC MarcaInsertar @P_NOMBRE = :nombre',
            {
                replacements: {nombre},
                type: dbConnect.QueryTypes.SELECT
            }
        );
        res.status(201).json({
            msg: 'Marca creada correctamente',
            data: result[0]
        })
        
    } catch (error) {
        console.error('Error al insertar la marca:', error);
        res.status(500).json({
            msg: 'Hubo un error al insertar la marca',
            error: error.message
        });
    }
}
const putMarcas = async (req, res= response) => {
    const {id} = req.params
    const { nombre } = req.body;
    
    try {
        const result = await dbConnect.query(
            `EXEC MarcaActualizar @P_NOMBRE = ?,
            @P_ID_MARCA = ?`,            
            {
                replacements: [nombre, id],
                type: dbConnect.QueryTypes.SELECT
            }
        );

        res.status(201).json({
            msg: 'marca actualizada correctamente',
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
const deleteMarca = async (req, res= response) => {
    const { id } = req.params;
    try {
        const result = await dbConnect.query(
            `EXEC MarcaEliminar @P_ID_MARCA = ?`,            
            {
                replacements: [id],
                type: dbConnect.QueryTypes.SELECT
            }
        );
        
        res.status(201).json({
            msg: 'marca eliminada correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al eliminar la marca:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la marca',
            error: error.message
        });
    }
}

module.exports = {getMarcas, getMarca, postMarcas, putMarcas, deleteMarca,validarMarca}