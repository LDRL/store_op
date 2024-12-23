const { Router } = require('express')
const { getOrdenes, postOrdenes, deleteOrdenes } = require('../controllers/orden')
const { authenticate } = require('../middleware/auth')

const router = Router()

router.get('/', getOrdenes )
// router.get('/:id', getOrden )
router.post('/',postOrdenes )
// router.put('/:id', putOrden )
router.delete('/:id', deleteOrdenes )


module.exports = router