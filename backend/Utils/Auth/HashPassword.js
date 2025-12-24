const bcrypt = require('bcrypt');

const hashPassword = (schema) => {
  schema.pre('save', async function() {
    // Eğer password değişmemişse exit
    if (!this.isModified('password')) return;

    // Hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
};

module.exports = hashPassword;
