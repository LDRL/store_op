const { response, request } = require('express')
const {dbConnect} = require('../config/db/connection');
// const sql = require('mssql');

const getProductos = async (req= request, res= response) => {
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
            'EXEC ProductoListar @Page = :page, @Limit = :limit, @Search = :search',
            {
                replacements: { page: pageNumber, limit: limitNumber, search: search },
                type: dbConnect.QueryTypes.SELECT
            }
        );

        const total = result[result.length - 1]?.Total || 0; 


        const totalPages = Math.ceil(total / limitNumber);

        res.json({
            msg: 'productos obtenidos con éxito',
            data: result.slice(0, result.length -1), 
            total: total,
            limit: limitNumber,
            currentPage: pageNumber,
            totalPages: totalPages
        });

    } catch (error) {
        console.error('Error al ejecutar el procedimiento:', error);
        res.status(500).json({
            msg: 'Hubo un error al obtener los productos',
            error: error.message,
        });
    }
}

const getProducto = (req= request, res= response) => {
    const { id } = req.params;
    res.json({
        msg: 'getUsuario',
        id
    })
}

///

const postProducto = async (req, res = response) => {
    const { nombre, codigo, stock, precio, foto, id_usuario, id_categoria_producto, id_marca } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'No se subió alguna imagen' });
    }


    const stockFloat = parseFloat(stock);  // Convertir stock a FLOAT
    const precioFloat = parseFloat(precio);  // Convertir precio a FLOAT
    const idUsuarioInt = parseInt(id_usuario);  // Convertir id_usuario a INT
    const idCategoriaInt = parseInt(id_categoria_producto);  // Convertir id_categoria_producto a INT
    const idMarcaInt = parseInt(id_marca);  // Convertir id_marca a INT


    if (isNaN(stockFloat) || isNaN(precioFloat) || isNaN(idUsuarioInt) || isNaN(idCategoriaInt) || isNaN(idMarcaInt)) {
        return res.status(400).json({
            msg: 'Algunos parámetros numéricos no son válidos.'
        });
    }

    try {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        const result = await dbConnect.query(
            `EXEC ProductoInsertar @P_NOMBRE = :nombre, 
            @P_CODIGO = :codigo, 
            @P_STOCK = :stock, 
            @P_PRECIO = :precio, 
            @P_FOTO = :imageUrl, 
            @P_ID_USUARIO = :id_usuario, 
            @P_ID_CATEGORIA_PRODUCTO = :id_categoria_producto, 
            @P_ID_MARCA = :id_marca`,
            {
                replacements: {
                    nombre,
                    codigo,
                    stock: stockFloat,  // Usar stock como número flotante
                    precio: precioFloat,  // Usar precio como número flotante
                    imageUrl, 
                    id_usuario: idUsuarioInt, 
                    id_categoria_producto: idCategoriaInt, 
                    id_marca: idMarcaInt
                }
            }
        );

        res.status(201).json({
            msg: 'Producto creado correctamente',
            data: result
        });

    } catch (error) {
        console.error('Error al insertar el producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al insertar el producto',
            error: error.message,
        });
    }
};



const putProducto = (req, res= response) => {
    const {id} = req.params
    const { body } = req
    res.status(500).json({
        msg: 'put API - controller',
        id,
        body
    })
}



const deleteProducto = async (req, res= response) => {
    const { id } = req.params;
    try {
        const result = await dbConnect.query(
            `EXEC ProductoEliminar @P_ID_PRODUCTO = ?`,            
            {
                replacements: [id],
                type: dbConnect.QueryTypes.SELECT
            }
        );
        
        res.status(201).json({
            msg: 'producto eliminada correctamente',
            data: result
        })
        
    } catch (error) {
        console.error('Error al eliminar la producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la producto',
            error: error.message
        });
    }
}



module.exports = {getProductos, getProducto, postProducto, putProducto, deleteProducto}