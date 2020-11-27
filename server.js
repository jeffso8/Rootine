const express = require("express") // our express server
const bodyParser = require("body-parser") // requiring the body-parser
const db = require('./database');
const passport = require('./passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const session = require('express-session');
const User = require('./models/Users');
const Habits = require('./models/Habits');
const { Schema } = require("./database");
const e = require("express");
const Tracker = require("./models/Tracker");
const Completion = require("./models/Completion");
const moment = require("moment");
const path = require("path");



const PORT = process.env.PORT || 3001 // port that the server is running on => localhost:3001

const app = express() // generate an app object


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser('woot'));
app.use(bodyParser.json());
app.use(session({ cookie: { maxAge: 86400000}, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: true,
                  passport: {user: {_id: ''}}
                }));
app.use(passport.initialize());
app.use(passport.session());


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Next tells the middleware to move on to the next instruction
    next();
});

// app.get('/logins', function(req, res) {
//   console.log("Hello");
// });

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'secret_project/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'secret_project/build', 'index.html'));
});

app.get('/users', function(req,res){
    User.find(function(err, foundUsers) {
      if (!err) {
        console.log(foundUsers);
        res.send(foundUsers);
      } else {
        console.log(err);
      }
  });
});

app.post('/tracker', function(req,res){
  Tracker.findOneAndUpdate({date: moment().format('L'), user: req.user.id}, 
  {$set: {"habits.$[el].done": !req.body.done}}, {arrayFilters: [{"el._id": req.body._id}], new: true}, 
  function (err, obj) {
    console.log('err', err);
    console.log('obj', obj);
  });
});

app.get('/tracker', function(req, res){
  //TODO: find habits that have that userid
  const dayMap = {
    'Monday' : 0,
    'Tuesday' : 1,
    'Wednesday' : 2,
    'Thursday' : 3,
    'Friday' : 4,
    'Saturday' : 5,
    'Sunday' : 6,
  }
  const day = moment().format('dddd');
  const dayToIndexFilter = dayMap[day];

  Tracker.find({date: moment().format('L'), user: req.user.id}, function(err, foundTracker) {
    if(foundTracker.length) {
      res.send(foundTracker[0].habits);
    } else {
      Habits.find({user: req.user.id }, function(err, foundHabits) {
        if (!err) {
          const filteredHabits = foundHabits.filter(habit => habit.days[dayToIndexFilter]);
          const parsedHabits = filteredHabits.map(habit => {
            return {
              habit_name: habit.habit_name,
              done: false,
            }
          });
          Completion.find({user: req.user.id}, function(err, foundCompletion) {
            if(!foundCompletion.length) {
              newCompletion = new Completion({
                user: req.user.id,
                dates: [
                  {
                  month: "10",
                  days: ["22","23","24"]
                  }, 
                  {
                  month: "11",
                  days: ["6","7","8","10","11","12","22"]
                  }]
              });

              newCompletion.save();
            } else {
              Tracker.find({date: moment().subtract(1, "day").format('L'), user: req.user.id}, function(err, foundTracker) {
                const foundTrackerHabits = foundTracker[0].habits;
                const uncompletedList = foundTrackerHabits.filter(habit => !habit.done);
                console.log('uncompletedList', uncompletedList);
                if (!uncompletedList.length) {
                  Completion.findOneAndUpdate({user: req.user.id, "dates.$.month": moment().format('M')},
                  {$addToset: {"dates.$[el.month].days": moment().subtract(1,"day").format('D')}}, {arrayFilters: [{"el.month": moment().format('M')}], upsert: true}, 
                      function (err, obj) {
                        console.log('err', err);
                        console.log('obj', obj);
                    });
                }
              });
            }
          })

          newTracker = new Tracker({
            date: moment().format('L'),
            habits: parsedHabits,
            user: req.user.id
          });
          newTracker.save();

          res.send(newTracker.habits);
        } else {
          console.log(err);
        }
      })
    }
  });
});

app.get('/completion', function(req,res){
  Completion.find({user: req.user.id}, function(err, foundCompletions) {
    if(!err || foundCompletions) {
      res.send(foundCompletions);
    } else {
      res.redirect('/dashboard');
      console.log(err);
    }
  })
});

app.post('/habits', function(req, res){
  const dayMap = {
    'Monday' : 0,
    'Tuesday' : 1,
    'Wednesday' : 2,
    'Thursday' : 3,
    'Friday' : 4,
    'Saturday' : 5,
    'Sunday' : 6,
  }
  const day = moment().format('dddd');
  const dayToIndexFilter = dayMap[day];

    newHabit = new Habits({
      habit_name: req.body.name,
      //TODO: need to find a way to have user ID of person logged in to be added to every habit
      user: req.user.id,
      days: req.body.dates
    });
    newHabit.save();

    if (newHabit.days[dayToIndexFilter]){
    const modifyHabit = {
      habit_name: newHabit.habit_name,
      days: newHabit.days,
      done: false
    };

    Tracker.findOneAndUpdate({date: moment().format('L'), user: req.user.id}, {$push: {habits: modifyHabit}}, 
      function(err, obj) {
        console.log('err', err);
        console.log('obj', obj);
      }
    ); 
    }
      res.redirect('/dashboard');
});

app.get('/habits', function(req, res){
  Habits.find({user: req.user.id }, function(err, foundHabits) {
    if (!err) {
       res.send(foundHabits);
    } else {
      console.log(err);
    }});
});

app.get('/habits/:habitID', function(req, res) {
  const requestedHabitId = req.params.habitID;
  Habits.find({_id: requestedHabitId, user: req.user.id}, function(err, habit){
    if(!err) {
      res.send(habit);
    } else {
      console.log(err);
    }
  });
});

//login via email and password
app.post('/login',
  passport.authenticate('local-login', { successRedirect: '/dashboard',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

//signup via email and password
app.post('/signup',
  passport.authenticate('local-signup', { successRedirect: '/dashboard',
                                   failureRedirect: '/',
                                   failureFlash: true,
                                   isLoggedIn: true })
);


app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile", "email"] })
);

app.get('/auth/google/rootine', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

app.listen(PORT, () => {
  // listening on port 3001
  console.log(`listening on port ${PORT}`) // print this when the server starts
})
