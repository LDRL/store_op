const { Router } = require('express')
const { authenticate } = require('../middleware/auth')
const { getCliente, Getclientes, postCliente, putCliente, deleteCliente } = require('../controllers/cliente')
const { handleInputErrors } = require('../middleware/validacion')
const { body } = require('express-validator')

const router = Router()

router.use(authenticate)


router.get('/', Getclientes )
router.get('/:id', getCliente )
router.post('/',
    body('razon_social').notEmpty().withMessage('razon social no puede ir vacio'),
    body('nombre_comercial').notEmpty().withMessage('razon social no puede ir vacio'),
    body('direccion_entrega').notEmpty().withMessage('razon social no puede ir vacio'),
    body('telefono').notEmpty().withMessage('razon social no puede ir vacio'),
    body('email').isEmail().withMessage('Email no válido'),
    body('contraseña').isLength({min:8}).withMessage('La contraseña es muy corta, debe contener 8 caracteres minimo'),
    body('confirmar_contraseña').custom((value,{req}) => {
        if(value !== req.body.contraseña){
            throw new Error('La contraseña no son iguales')
        }
        return true
    }),
    body('fecha_nacimiento').notEmpty().withMessage('razon social no puede ir vacio'),
    handleInputErrors 
    ,postCliente )

router.put('/:id',
    body('razon_social').notEmpty().withMessage('razon social no puede ir vacio'),
    body('nombre_comercial').notEmpty().withMessage('razon social no puede ir vacio'),
    body('direccion_entrega').notEmpty().withMessage('razon social no puede ir vacio'),
    body('telefono').notEmpty().withMessage('razon social no puede ir vacio'),
    body('email').isEmail().withMessage('Email no válido'),
    body('fecha_nacimiento').notEmpty().withMessage('razon social no puede ir vacio'), 
    putCliente )
router.delete('/:id', deleteCliente )


module.exports = router