import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { db } from './app/config/index.js';
import authRouter from './app/routes/auth.routes.js';
import taskRouter from './app/routes/task.routes.js';
import { globalErrorHandler } from './app/controllers/ErrorController.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Route handlers
app.use('/api/auth', authRouter);
app.use('/api/task', taskRouter);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

const checkConnection = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('DB Connection successfull🎉');
  } catch (error) {
    console.log('Error Connecting to DB💥', error);
  }
};
checkConnection();

// To Sync Models and Tables in Database
// (async () => {
//   await db.sequelize.sync({ force: true });
//   console.log('All models were synchronized successfully.');
// })();
