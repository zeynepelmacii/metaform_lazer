const validateNewUser = ({ fname, lname, email, password, isOrganisation }) => {
  if (!email || !password || !fname || !lname) {
    return { valid: false, message: 'All fields are required' };
  }

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Invalid email format' };
  }

  // Password regex
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  if (!passwordRegex.test(password)) {
    return { 
      valid: false, 
      message: 'Password must be at least 6 characters and include at least 1 special character'
    };
  }

  // isOrganisation validation
  const isOrganisationValues = ['yes', 'no'];
  if (!isOrganisationValues.includes(isOrganisation)) {
    return { valid: false, message: 'isOrganisation must be either "yes" or "no"' };
  }

  return { valid: true };
};

module.exports = validateNewUser;