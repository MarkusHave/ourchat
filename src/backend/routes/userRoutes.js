const express = require('express');
const { Users, Groups, Messages } = require('../models');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware');

// Parse JSON bodies (as sent by API clients)
router.use(express.json());

// Get all users
router.get('/', verifyToken, async (req, res) => {
  await Users.findAll({
    include: [{ model: Groups }, { model: Messages }],
  })
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

// Find user by id
router.get('/get/:id', verifyToken, async (req, res) => {
  // console.log(`Getting user with id: ${req.params.id}`)
  await Users.findByPk(req.params.id, {
    include: [{ model: Groups }, { model: Messages }],
  })
    .then((user) => {
      // Get user groups
      let groups = user.Groups.map((group) => {
        return {
          id: group.id,
          groupName: group.groupName,
          createdAt: group.createdAt,
        };
      });

      // Get user messages
      let messages = user.Messages.map((message) => {
        return {
          id: message.id,
          groupId: message.groupId,
          userId: message.userId,
          message: message.message,
          createdAt: message.createdAt,
        };
      });

      // Return only needed data
      res.json({
        userId: user.id,
        username: user.userName,
        email: user.email,
        groups,
        messages,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// New user
router.post('/register', async (req, res) => {
  await Users.create({
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.passwd, 10),
  })
    .then((user) => {
      if (user) {
        res.status(201).json({
          msg: 'User registered!',
        });
      }
    })
    .catch((err) => {
      // console.log(err.errors);
      // console.log(err.errors[0].message);
      let errors = err.errors[0];
      let message;
      switch (errors.type) {
        case 'unique violation':
          if (errors.path == 'userName') {
            message = 'Username already taken!';
            break;
          } else if (errors.path == 'email') {
            message = 'Email already registered!';
            break;
          }
          message = 'Something outoo.';
          break;
        default:
          message = 'Something went wrong at our end.';
          // console.log(err);
          break;
      }
      res.status(400).json({
        message,
        errors,
      });
    });
});

// Delete user
router.delete('/delete', verifyToken, async (req, res) => {
  await Users.destroy({
    where: { id: req.body.id },
  })
    .then((deletedUser) => {
      console.log(deletedUser);
      res.status(200).json({
        msg: 'User deleted!',
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Update user
router.put('/update', verifyToken, async (req, res) => {
  let passwd;

  // Check if request body contains password
  if (req.body.passwd != null) {
    passwd = bcrypt.hashSync(req.body.passwd, 10);
  } else {
    return res.status(400).json({
      msg: 'Please give password',
    });
  }

  await Users.update(
    {
      userName: req.body.userName,
      email: req.body.email,
      password: passwd,
    },
    { where: { id: req.body.id } }
  )
    .then(() =>
      res.status(200).json({
        msg: 'User updated!',
      })
    )
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Auth user
router.post('/login', async (req, res) => {
  console.log(req.body);
  await Users.findOne({
    where: { userName: req.body.userName },
  })
    .then((user) => {
      bcrypt.compare(req.body.passwd, user.password, (err, isMatch) => {
        if (err) res.sendStatus(403);

        // Send token if password correct
        if (isMatch) {
          jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
            if (err) res.send(err);
            // console.log('Correct user')
            res.json({ token, user });
          });
        } else {
          res.status(400).send('Login error!'); // This way bc unified error message in frontend
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
});

module.exports = router;
