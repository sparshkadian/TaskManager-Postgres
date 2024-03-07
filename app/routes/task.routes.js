import express from 'express';
import {
  createTask,
  deleteTask,
  updateTask,
  getAllTasks,
} from '../controllers/task.controller.js';
import { verifyUser } from '../controllers/auth.controller.js';

const Router = express.Router();

Router.route('/:userId').post(verifyUser, createTask).get(getAllTasks);
Router.route('/:userId/:taskId')
  .delete(verifyUser, deleteTask)
  .patch(verifyUser, updateTask);

export default Router;
