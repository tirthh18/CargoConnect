const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role ,city :user.city },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const staticAdmins = [
  {
    email: 'adminnadiad@cargoconnect.com',
    password: 'adminnadiad',
    city: 'nadiad',
    role: 'admin'
  },
  {
    email: 'adminsurat@cargoconnect.com',
    password: 'adminsurat',
    city: 'surat',
    role: 'admin'
  }
];

exports.register = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user); 
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {

    const staticAdmin = staticAdmins.find(admin => admin.email === email && admin.password === password);
    if (staticAdmin) {
      const token = generateToken(staticAdmin);
      return res.json({ user: staticAdmin, token });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });
    

    const token = generateToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
