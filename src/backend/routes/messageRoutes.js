const express = require('express');
const { Users, Groups, Messages } = require('../models');
const router = express.Router();
const { verifyToken } = require('../middleware');

// Get all messages
router.get('/', verifyToken, async (req, res) => {
  await Messages.findAll({
    include: [{ model: Groups }, { model: Users }],
  })
    .then((message) => res.json(message))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// New message
router.post('/', verifyToken, async (req, res) => {
  await Messages.create({
    groupId: req.body.groupId,
    userId: req.body.userId,
    message: req.body.message,
  })
    .then((message) => {
      if (message) {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Get message by PK
router.get('/:id', async (req, res) => {
  await Messages.findByPk(req.params.id, {
    include: [{ model: Users }],
  }).then((message) => {
    res.json({
      id: message.id,
      groupId: message.groupId,
      userId: message.userId,
      sender: message.User.userName,
      content: message.message,
      createdAt: message.createdAt,
    });
  });
});

// Delete message
router.delete('/', verifyToken, async (req, res) => {
  await Messages.destroy({
    where: { id: req.body.id },
  })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

module.exports = router;
