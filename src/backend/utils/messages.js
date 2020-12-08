const { Messages, Users } = require('../models');

const insertNewMsgToDB = async (data) => {
  return await Messages.create({
    groupId: data.groupId,
    userId: data.userId,
    message: data.message,
  })
    .then(async (data) => {
      return await Messages.findByPk(data.dataValues.id, {
        include: [{ model: Users }],
      })
        .then((message) => {
          return {
            id: message.id,
            groupId: message.groupId,
            userId: message.userId,
            sender: message.User.userName,
            content: message.message,
            createdAt: message.createdAt,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = { insertNewMsgToDB };
