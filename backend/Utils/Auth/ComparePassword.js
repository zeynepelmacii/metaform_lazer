const bcrypt = require('bcrypt');

const comparePassword = (UserSchema) => {
    UserSchema.methods.comparePassword = async function (inputPassword) {
        return await bcrypt.compare(inputPassword, this.password);
    };
}

module.exports = comparePassword;