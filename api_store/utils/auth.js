const bcrypt = require('bcrypt');

const hashPassword = async (contraseña) => {
    const salt = await bcrypt.genSalt(10)
    return hashedPassword = await bcrypt.hash(contraseña, salt)
}

const checkPassword = async (contraseña, contraseña_encriptada) => {
    return await bcrypt.compare(contraseña, contraseña_encriptada)
}

module.exports = {hashPassword, checkPassword};