const { response, request } = require('express')
const {dbConnect} = require('../config/db/connection');
const { body, validationResult } = require('express-validator');


const getMarcas = async (req= request, res= response) => {
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
            'EXEC MarcaListar @Page = :page, @Limit = :limit, @Search = :search',
            {
                replacements: { page: pageNumber, limit: limitNumber, search: search },
                type: dbConnect.QueryTypes.SELECT
            }
        );

        const total = result[result.length - 1]?.Total || 0; 
        console.log(total);

        // Calcular el número total de páginas
        const totalPages = Math.ceil(total / limitNumber);

        res.json({
            msg: 'Marcas obtenidas con éxito',
            data: result,  // Los registros de la página solicitada
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

const getMarca = (req= request, res= response) => {
    const { id } = req.params;
    res.json({
        msg: 'getUsuario',
        id
    })
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
    console.log(nombre, "------- NOMBRE")
    
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
const putMarcas = (req, res= response) => {
    const {id} = req.params
    const { body } = req
    res.status(500).json({
        msg: 'put API - controller',
        id,
        body
    })
}
const deleteMarca = (req, res= response) => {
    const { id } = req.params;
    res.json({
        msg: 'delete API - controller',
        id
    })
}

module.exports = {getMarcas, getMarca, postMarcas, putMarcas, deleteMarca,validarMarca}