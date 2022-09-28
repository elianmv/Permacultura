const bcrypt = require("bcryptjs");
// Primero vamos a hashear la contraseña

const rondasSal = bcrypt.genSalt(10);
const hashear = (password) => {
    bcrypt.hash(password, rondasSal, (err, passwordHash) => {
        if (err) {
            console.log(err)
            return err;
        } else {
            console.log(passwordHash)
            return passwordHash;
        }
    });

}

module.exports = {
    hashear
}
