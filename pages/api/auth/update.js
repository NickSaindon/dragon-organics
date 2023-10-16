import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { getToken } from 'next-auth/jwt';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send({ message: 'signin required' });
  }

  const { 
    name, 
    email, 
    birthDate,
    phone,
    companyName,
    address,
    city,
    state,
    zipCode,
    password 
  } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();
  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.name = name;
  toUpdateUser.email = email;
  toUpdateUser.birthDate = birthDate;
  toUpdateUser.phone = phone;
  toUpdateUser.companyName = companyName;
  toUpdateUser.address = address;
  toUpdateUser.city = city;
  toUpdateUser.state = state;
  toUpdateUser.zipCode = zipCode;

  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  await db.disconnect();
  res.send({
    message: 'User updated',
  });
}

export default handler;