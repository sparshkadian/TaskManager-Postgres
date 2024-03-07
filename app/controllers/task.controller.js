import { db } from '../config/index.js';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../../utils/AppError.js';

const Task = db.task;

function authenticateUser(req, msg, statuCode, next) {
  const UserId = parseInt(req.params.userId);
  if (req.user.id !== UserId) {
    return next(new AppError(msg, statuCode));
  }
}

async function checkTaskExists(req, next) {
  const taskId = req.params.taskId;
  const taskExists = await Task.findOne({ where: { taskId } });
  if (!taskExists) {
    return next(new AppError('No such task Exists!', 404));
  } else return taskExists;
}

export const getAllTasks = async (req, res, next) => {
  try {
    const UserId = parseInt(req.params.userId);
    const tasks = await Task.findAll({ where: { UserId } });
    res.status(200).json({
      status: 'success',
      tasks,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message, 500));
  }
};

export const createTask = async (req, res, next) => {
  const UserId = parseInt(req.params.userId);
  req.body.taskId = uuidv4();
  try {
    const newTask = await Task.create({ ...req.body, UserId });
    res.status(202).json({
      status: 'success',
      newTask,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message, 500));
  }
};

export const deleteTask = async (req, res, next) => {
  authenticateUser(req, 'You can only delete your own tasks', 401, next);
  try {
    const task = await checkTaskExists(req, next);

    await task.destroy();
    res.status(200).json({
      status: 'success',
      message: 'Task Deleted',
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message, 500));
  }
};

export const updateTask = async (req, res, next) => {
  authenticateUser(req, 'You can only update your own tasks', 401, next);
  try {
    const task = await checkTaskExists(req, next);

    // For now can only update Task field in Task Table, so
    task.task = req.body.task;
    const updatedTask = await task.save();
    res.status(200).json({
      status: 'success',
      updatedTask,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message, 500));
  }
};
