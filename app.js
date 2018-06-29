const
 createError = require('http-errors'),
 express = require('express'),
 path = require('path'),
 cookieParser = require('cookie-parser'),
 logger = require('morgan'),
 diaryController = require('./controllers/diaryController')
// skillsRouter = require('./routes/skills'),
 mongoose = require( 'mongoose' );
 session = require("express-session"),
 GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
 passport = require('passport')
 configPassport = require('./config/passport')
 configPassport(passport)

mongoose.connect( 'mongodb://localhost/diary' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

var mainpageRouter = require('./routes/mainpage');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newdiaryRouter = require('./controllers/diaryController');
var exploreRouter = require('./routes/explore');
var accountRouter = require('./routes/account');
var exploreresultRouter = require('./routes/exploreresult');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'zzbbyanana' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainpageRouter);
app.use('/home', diaryController.attachDiary, indexRouter);
app.use('/users', usersRouter);
app.use('/newdiary', diaryController.getAllDiary);
app.use('/savediary', diaryController.saveDiary);
app.use('/explore',exploreRouter);
app.use('/account',accountRouter);
app.use('/exploreresult',exploreresultRouter);
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
// catch 404 and forward to error handler


app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})

app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
console.log("about to call google")
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

console.log("called google")
app.get('/login/authorized',
        passport.authenticate('google', {
                successRedirect : '/home',
                failureRedirect : '/loginerror'
        }));


app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
