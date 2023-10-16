import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { 
    name, 
    email, 
    birthDate,
    phone,
    companyName,
    streetName,
    city,
    province,
    postalCode,
    country,
    password 
} = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    birthDate,
    phone,
    companyName,
    streetName,
    city,
    province,
    postalCode,
    country,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
    isManufacturer: false
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    birthDate: user.birthDate,
    phone: user.phone,
    companyName: user.companyName,
    streetName: user.streetName,
    city: user.city,
    province: user.province,
    postalCode: user.postalCode,
    country: user.country,
    isAdmin: user.isAdmin,
    isManufacturer: user.isManufacturer
  });
}

export default handler;