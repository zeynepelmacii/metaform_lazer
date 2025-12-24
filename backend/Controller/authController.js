const User = require('../Model/User');
const validateNewUser = require('../Utils/Auth/ValidateNewUser');
const comparePassword = require('../Utils/Auth/ComparePassword');

const register = async (req, res) => {
  try {
    const { fname, lname, email, password, isOrganisation, street, addressLine2, addressLine3, city, country, isActive, role, isVerified } = req.body;

    const validation = validateNewUser({ fname, lname, email, password, isOrganisation });
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'This e-mail already in use for an account' });

    const newUser = await User.create({ fname, lname, email, password, isOrganisation, street, addressLine2, addressLine3, city, country, isActive, role, isVerified  });

    res.status(201).json({
      message: 'Registration successful!',
      user: {
        id: newUser._id,
        fname: newUser.fname,
        lname: newUser.lname,   
        email: newUser.email,
        password: newUser.password,
        isOrganisation: newUser.isOrganisation, 
        street: newUser.street, 
        addressLine2: newUser.addressLine2, 
        addressLine3: newUser.addressLine3, 
        city: newUser.city, 
        country: newUser.country, 
        isActive: newUser.isActive, 
        role: newUser.role,
        isVerified: newUser.isVerified

      },
      token: newUser.generateToken()
    });
  } catch (err) {
    res.status(500).json({ message: 'Auth Error', error: err.message });
  }
}


const login = async (req, res) => {
 try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No User found with this email' });

    if (!user.isActive) {
      return res.status(403).json({
        message: 'Your account is inactive. Please contact support.'
      });
    }

    // Şifre kontrolü
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Token üret
    const token = user.generateToken();


    const roleMessages = {
      admin: 'Admin login successful!',
      employee: 'Employee login successful!'
    };

    res.json({
      message: roleMessages[user.role] || 'Login successful!',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token
    });

  } catch (err) {
    res.status(500).json({ message: 'Auth Error', error: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful!' });
};



module.exports = {
  login,
  register,
  logout
};