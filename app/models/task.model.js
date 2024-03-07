export const taskModel = (sequelize, Sequelize) => {
  const task = sequelize.define('Task', {
    taskId: {
      type: Sequelize.DataTypes.UUID,
      default: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    task: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  });

  return task;
};
