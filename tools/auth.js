const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
  
  function generateToken(user) {
    const payload = {
      id: user.id,
      nombre: user.nombre,
      rol: user.rol,
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
  }
  
  function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  
  async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  
  function comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
  
  module.exports = {
    generateToken,
    verifyToken,
    hashPassword,
    comparePasswords,
  };



