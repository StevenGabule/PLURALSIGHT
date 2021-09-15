const mongoose = require('mongoose')
const User = mongoose.model('User');
const passport = require('passport');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await new User({ name, email, password });
    await User.register(user, password, (err, user) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.json(user);
    });

}
const login =  (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    if (!user) {
      return res.status(400).json(info.message);
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json(err.message);
      }
      res.json(user);
    });
  })(req, res, next)
}

const signOut = (req, res) => {
  res.clearCookie('connect.sid');
  req.logout();
  res.json({ message: 'You are now signed out!' });
};


module.exports = {
  login,
  signOut,
  register
}
