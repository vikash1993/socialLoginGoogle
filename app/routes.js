module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.redirect('/');
    });

    // route for showing the profile page
    app.get('/home', isLoggedIn, function(req, res) {
        res.redirect('/#/home');
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.send(200);
        res.redirect('/');
    });

    // process the login form
    app.post("/login", passport.authenticate('local-login'), function(req, res) {
        res.json(req.user);
      });
  
    // handle logout
    app.post("/logout", function(req, res) {
        req.logOut();
        res.send(200);
      })
  
      // loggedin
    app.get("/loggedin", function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
      });
  
      // signup
      app.post("/signup", function(req, res) {
        db.User.findOne({
          username: req.body.username
        }, function(err, user) {
          if (user) {
            res.json(null);
            return;
          } else {
            var newUser = new db.User();
            newUser.username = req.body.username.toLowerCase();
            newUser.password = newUser.generateHash(req.body.password);
            newUser.save(function(err, user) {
              req.login(user, function(err) {
                if (err) {
                  return next(err);
                }
                res.json(user);
              });
            });
          }
        });
      }); 

    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/home',
                failureRedirect : '/'
        }
    ));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
