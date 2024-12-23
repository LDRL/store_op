const { Router } = require('express')
const { getCategorias, getCategoria, postCategoria, putCategoria, deleteCategoria, validarCategoriaProducto } = require('../controllers/categoria')
const { authenticate } = require('../middleware/auth')

const router = Router()

router.get('/',authenticate, getCategorias )
router.get('/:id', getCategoria )
router.post('/', validarCategoriaProducto,postCategoria )
router.put('/:id', putCategoria )
router.delete('/:id', deleteCategoria )


module.exports = router