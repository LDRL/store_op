const { Router } = require('express')
const { getCategorias, getCategoria, postCategoria, putCategoria, deleteCategoria, validarCategoriaProducto } = require('../controllers/categoria')

const router = Router()

router.get('/', getCategorias )
router.get('/:id', getCategoria )
router.post('/', validarCategoriaProducto,postCategoria )
router.put('/:id', putCategoria )
router.delete('/:id', deleteCategoria )


module.exports = router