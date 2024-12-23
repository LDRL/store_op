const { response, request } = require('express')
const {dbConnect} = require('../config/db/connection');
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

    console.log(req.query, "query-----")
    console.log("limit number", limitNumber);
    console.log("----")

    // const result = await dbConnect.query('EXEC UsuarioListar', { type: dbConnect.QueryTypes.SELECT });

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
            
        // console.log(totalCountResult, "total count");


        const total = result[result.length - 1]?.Total || 0; 
        console.log(total);

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

const usuariosPost = (req, res= response) => {
    const { body} = req
    res.status(201).json({
        msg: 'post API - controller',
        body
    })
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