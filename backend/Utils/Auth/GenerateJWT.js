const jwt = require('jsonwebtoken');

const generateJWT = (UserSchema) => {
    UserSchema.methods.generateToken = function () {
        return jwt.sign(
            { id: this._id, email: this.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
    };
}

module.exports = generateJWT;