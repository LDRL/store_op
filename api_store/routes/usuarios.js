// import {body} from 'express-validator';
// import { body } from 'express-validator';
const { body } = require('express-validator')

const { handleInputErrors } = require('../middleware/validacion') ;
const { usuariosGet, getUsuario, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios')

const { Router } = require('express')


const router = Router()

router.get('/', usuariosGet )
router.get('/:id', getUsuario )
router.post('/',
    body('nombre')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('contraseña')
        .isLength({min:8}).withMessage('La contraseña es muy corta, debe contener 8 caracteres minimo'),
    // body('confirmar_contraseña').custom((value,{req}) => {
    //     if(value !== req.body.contraseña){
    //         throw new Error('La contraseña no son iguales')
    //     }
    //     return true
    // }),
    body('email')
        .isEmail().withMessage('Email no válido'),
    handleInputErrors,
    usuariosPost )
    
router.put('/:id', usuariosPut )
router.delete('/:id', usuariosDelete )


module.exports = router