const { Router } = require('express')
const { getOrdenes,getOrden, postOrdenes, deleteOrdenes ,putOrden} = require('../controllers/orden')
const { authenticate } = require('../middleware/auth')

const router = Router()

router.use(authenticate)

router.get('/', getOrdenes )
router.get('/:id', getOrden )
router.post('/',postOrdenes )
router.put('/:id', putOrden )
router.delete('/:id', deleteOrdenes )


module.exports = router