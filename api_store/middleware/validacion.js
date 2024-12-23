const { Response, Request, NextFunction } = require('express')
const { validationResult } =require ("express-validator");

const handleInputErrors = (req= Request, res =Response, next= NextFunction) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()
}

module.exports = {handleInputErrors}