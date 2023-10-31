import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isManufacturer: user.isManufacturer,
      isVendor: user.isVendor
    },

    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not suppiled' });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'User is not a admin' });
  }
};

const isManufacturer = async (req, res, next) => {
  if (req.user.isManufacturer) {
    next();
  } else {
    res.status(401).send({ message: 'User is not a manufacturer' });
  }
};

const isVendor = async (req, res, next) => {
  if (req.user.isVendor) {
    next();
  } else {
    res.status(401).send({ message: 'User is not a vendor' });
  }
};

export { signToken, isAuth, isAdmin, isManufacturer, isVendor };