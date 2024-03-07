import bcrypt from 'bcrypt';

export const userModel = (sequelize, Sequelize) => {
  const user = sequelize.define('User', {
    userName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  });

  // Hooks
  user.beforeCreate(async (user) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
  });

  return user;
};
