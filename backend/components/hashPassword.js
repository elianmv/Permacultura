const bcrypt = require("bcryptjs");
// Primero vamos a hashear la contraseña

const rondasSal = 10;
const hashear = (password) => {
    bcrypt.hash(password, rondasSal, (err, passwordHash) => {
        if (err) {
            return err;
        } else {
            return passwordHash;
        }
    });

}

module.exports = {
    hashear
}
