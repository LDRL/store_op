const { Router } = require('express')
const { handleInputErrors } = require('../middleware/validacion')
const { body } = require('express-validator')
const { login } = require('../controllers/auth')

const router = Router()

router.post('/login', 
    body('email').isEmail().withMessage('Email no válido'),
    body('contraseña').notEmpty().withMessage('La contraseña no puede ir vacia'),
    handleInputErrors,
    login)



module.exports = router

