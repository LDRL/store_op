const { response, request } = require('express')
const {dbConnect} = require('../config/db/connection');

const { body, validationResult } = require('express-validator'); 


const getCategorias = async (req= request, res= response) => {
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
            'EXEC CategoriaListar @Page = :page, @Limit = :limit, @Search = :search',
            {
                replacements: { page: pageNumber, limit: limitNumber, search: search },
                type: dbConnect.QueryTypes.SELECT
            }
        );

        const total = result[result.length - 1]?.Total || 0; 

        // Calcular el número total de páginas
        const totalPages = Math.ceil(total / limitNumber);

        res.json({
            msg: 'Categorias obtenidos con éxito',
            data: result,
            total: total,
            limit: limitNumber,
            currentPage: pageNumber,
            totalPages: totalPages
        });

    } catch (error) {
        console.error('Error al ejecutar el procedimiento:', error);
        res.status(500).json({
            msg: 'Hubo un error al obtener las categorias',
            error: error.message,
        });
    }
}

const getCategoria = (req= request, res= response) => {
    const { id } = req.params;
    res.json({
        msg: 'getUsuario',
        id
    })
}


const validarCategoriaProducto = [
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacío')  // Verifica que no esté vacío
        .isLength({ max: 45 }).withMessage('El nombre no puede exceder los 45 caracteres'), // Validar longitud
];


const postCategoria = async (req, res= response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre } = req.body;
    
    try {
        const result = await dbConnect.query(
            'EXEC CategoriaProductoInsertar @P_NOMBRE = :nombre',
            {
                replacements: {nombre},
                type: dbConnect.QueryTypes.SELECT
            }
        );
        res.status(201).json({
            msg: 'Categoría creada correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al insertar la categoría:', error);
        res.status(500).json({
            msg: 'Hubo un error al insertar la categoría',
            error: error.message
        });
    }
}
const putCategoria = async (req, res= response) => {
    const {id} = req.params
    const { nombre } = req.body;
    
    try {
        const result = await dbConnect.query(
            `EXEC CategoriaProductoActualizar @P_NOMBRE = ?,
            @P_ID_CATEGORIA_PRODUCTO = ?`,            
            {
                replacements: [nombre, id],
                type: dbConnect.QueryTypes.SELECT
            }
        );

        res.status(201).json({
            msg: 'Categoría actualizada correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la categoría',
            error: error.message
        });
    }
}
const deleteCategoria = async (req, res= response) => {
    const { id } = req.params;
    try {
        const result = await dbConnect.query(
            `EXEC CategoriaProductoEliminar @P_ID_CATEGORIA_PRODUCTO = ?`,            
            {
                replacements: [id],
                type: dbConnect.QueryTypes.SELECT
            }
        );
        
        res.status(201).json({
            msg: 'Categoría eliminada correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la categoría',
            error: error.message
        });
    }
}

module.exports = {getCategorias, getCategoria, postCategoria, putCategoria, deleteCategoria, validarCategoriaProducto}