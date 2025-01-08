const { Router } = require('express')
const { authenticate } = require('../middleware/auth')
const { getRoles } = require('../controllers/role')

const router = Router()

router.use(authenticate)

router.get('/', getRoles )


module.exports = router