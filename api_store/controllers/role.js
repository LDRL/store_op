const { response, request } = require('express')
const {dbConnect} = require('../config/db/connection');

const { body, validationResult } = require('express-validator'); 


const getRoles = async (req= request, res= response) => {

    try {
        const result = await dbConnect.query(
            'EXEC RoleListar',
            {
                type: dbConnect.QueryTypes.SELECT
            }
        );


        res.json({
            msg: 'Categorias obtenidos con éxito',
            data: result,
        });

    } catch (error) {
        console.error('Error al ejecutar el procedimiento:', error);
        res.status(500).json({
            msg: 'Hubo un error al obtener las categorias',
            error: error.message,
        });
    }
}



module.exports = {getRoles}