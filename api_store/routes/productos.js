const { Router } = require('express')
const { getProductos, getProducto, postProducto, putProducto, deleteProducto } = require('../controllers/producto')
const { upload } = require('../config/multer')
const { authenticate } = require('../middleware/auth')


const router = Router()

router.use(authenticate)

router.get('/', getProductos )
router.get('/:id', getProducto )
router.post('/', upload.single('image'), postProducto )
router.put('/:id', putProducto )
router.delete('/:id', deleteProducto )

module.exports = router