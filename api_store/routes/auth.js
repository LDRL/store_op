const { Router } = require('express')
const { handleInputErrors } = require('../middleware/validacion')
const { body } = require('express-validator')
const { login, resetPassword } = require('../controllers/auth')

const router = Router()

router.post('/login', 
    body('email').isEmail().withMessage('Email no válido'),
    body('contraseña').notEmpty().withMessage('La contraseña no puede ir vacia'),
    handleInputErrors,
    login)


router.put('/reset-password/:id',
    body('contraseña').isLength({min:8}).withMessage('La contraseña es muy corta, debe contener 8 caracteres minimo'),
    body('confirmar_contraseña').custom((value,{req}) => {
        if(value !== req.body.contraseña){
            throw new Error('La contraseña no son iguales')
        }
        return true
    }),
    handleInputErrors,
    resetPassword
)




module.exports = router

