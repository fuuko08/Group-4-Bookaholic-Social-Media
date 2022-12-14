const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const { User } = require('../../models');
const withAuth = require('../../utils/auth'); 
const urlCompiler = require('../../utils/helpers');
const bcrypt = require('bcrypt');

// Get one User to login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            raw: true,
            where: { username: req.body.username },
        });
        
        if (!dbUserData) {
            res.status(404).json({ message: `User id ${req.params.id} is not valid.` });
            return;
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            dbUserData.password
          );
          if (!validPassword) {
            res.status(400).json({ message: "Incorrect Password" });
            return;
          }
          req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ success: true });
          });
    } catch (err) {
        res.status(500).json(err);      
    }    
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
        username: req.body.username,
        password: req.body.password,
    });
    req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.status(201).json({ message: `Account created for ${dbUserData.username}`});
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', withAuth, async (req, res) => {
  try {
    if (req.session.loggedIn) {
        const dbUserData = await req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
      console.log("err" + err);
        res.status(404).end();
    }
} catch {
    res.status(400).end();
}
});

router.get('/user', (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).json({ user: req.session.user.id });
  } else {
    res.status(404).end();
  }
});

module.exports = router;