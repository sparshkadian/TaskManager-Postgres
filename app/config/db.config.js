import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
  DB: process.env.DB,
  userName: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
};
