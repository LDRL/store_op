const jwt = require('jsonwebtoken') 

const generateJWT = (id, nombre, mail) =>{

    const data = {
        id: id,
        nombre: nombre,
        mail: mail
        
    }
    const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })

    return token

}

module.exports = {generateJWT}