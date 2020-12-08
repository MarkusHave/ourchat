const express = require('express');
const { Users, Groups, Messages, GroupUsers } = require('../models');
const router = express.Router();
const { verifyToken } = require('../middleware');

// Get all groups
router.get('/', verifyToken, async (req, res) => {
  await Groups.findAll({
    include: [{ model: Users }, { model: Messages }],
  })
    .then((group) => {
      res.json({ group });
    })
    .catch(() => res.sendStatus(400));
});

// Get group messages
router.get('/get/:id', verifyToken, async (req, res) => {
  await Groups.findByPk(req.params.id, {
    include: [{ model: Messages }, { model: Users }],
  })
    .then((group) => {
      if (group.Messages) {
        // Get messages
        let messages = group.Messages.map((message) => {
          // Find message sender
          let user = group.Users.find((item) => {
            return item.id === message.userId;
          });

          return {
            id: message.id,
            groupId: message.groupId,
            userId: message.userId,
            sender: user.userName,
            content: message.message,
            createdAt: message.createdAt,
          };
        });

        // Send response to client
        res.json({
          groupId: group.id,
          groupName: group.groupName,
          createdAt: group.createdAt,
          messages: messages,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// New group
router.post('/', verifyToken, async (req, res) => {
  if (!req.body.groupName) {
    return res.status(400).json({
      msg: 'Give group name',
    });
  }

  await Groups.create({
    groupName: req.body.groupName,
  })
    .then((group) => {
      if (group) {
        // Add group creator to created group
        GroupUsers.create({
          userId: req.body.userId,
          groupId: group.id,
        })
          .then(() => {
            res.status(201).json({
              msg: 'Group created!',
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({
              msg: 'No user id given!',
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        msg: 'Error when creating group!',
      });
    });
});

// Delete group
router.delete('/', verifyToken, async (req, res) => {
  await Groups.destroy({
    where: { id: req.body.id },
  })
    .then(() => {
      res.status(200).json({
        msg: 'Group deleted',
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Update group name
router.put('/', verifyToken, async (req, res) => {
  Groups.update(
    { groupName: req.body.groupName },
    { where: { id: req.body.id } }
  )
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Add user to group
router.post('/addUser', verifyToken, async (req, res) => {
  let userId;

  console.log(req.body);

  if (!req.body.userName) {
    return res.status(400).send('Give a name!');
  }

  // Get user id by username
  await Users.findOne({
    where: { userName: req.body.userName },
  })
    .then((user) => {
      console.log(user);
      userId = user.id;
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: 'No user found',
      });
    });

  await GroupUsers.create({
    userId: userId,
    groupId: req.body.groupId,
  })
    .then(() => {
      res.status(201).json({
        msg: 'User added to group!',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        msg: 'Error when adding user to group!',
      });
    });
});

module.exports = router;
