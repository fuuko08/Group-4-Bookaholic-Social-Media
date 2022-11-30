const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth'); //we need to utilize this middleware

// Get all users
router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get 1 user
router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: { id: req.params.id },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'like', 'content', 'image', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['content'],
                    },
                },
                {
                    model: Post,
                    attributes: ['content'],
                },
            ],
        });
        if (!dbUserData) {
            res.status(404).json({ message: `User id ${req.params.id} is not valid.`});
            return;
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(400).json(err);
    }
});


// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);
    console.table(req.body);
    req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.status(201).json({ message: `Account created for ${dbUserData.username}`});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
      return;
    };

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
        eq.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

      res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const dbUserData = await req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch {
        res.status(400).end();
    }
});

module.exports = router;