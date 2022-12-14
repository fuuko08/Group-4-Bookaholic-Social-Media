const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const fileupload = require('express-fileupload'); 
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

  app.use(session(sess));

  // Inform Express.js on which template engine to use
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
 
  app.use(fileupload({useTempFiles: true}))
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({ extended: true ,limit: '50mb'}));
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(routes);
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public"));
  });
  
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, function() { console.log(`App listening on port ${PORT}!`)});
  }).catch((error)=>{
    console.log(error);
  });
