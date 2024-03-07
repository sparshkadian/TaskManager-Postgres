import { db } from '../config/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../../utils/AppError.js';

const User = db.user;

function generateToken(user, res) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

  const { password, ...rest } = user;

  res.cookie('access_token', token, { httpOnly: true }).status(200).json({
    status: 'success',
    user: rest,
  });
}

export function verifyUser(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new AppError('Unauthorized', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
}

export const signup = async (req, res, next) => {
  try {
    let { userName, email, password } = req.body;
    const newUser = await User.create({ userName, email, password });
    generateToken(newUser.dataValues, res);
  } catch (error) {
    console.log(error);
    next(new AppError(error.message, 500));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Both Email and Password are required', 400));
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(new AppError('No user found', 404));
    }

    const comparePasswords = bcrypt.compareSync(
      password,
      user.dataValues.password
    );
    if (!comparePasswords) {
      return next(new AppError('Incorrect Credentials', 400));
    }

    generateToken(user.dataValues, res);
  } catch (error) {
    console.log(error);
    next(new AppError(error.message, 500));
  }
};
