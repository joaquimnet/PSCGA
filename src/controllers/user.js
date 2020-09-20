const { User } = require('../models');

exports.get_login = (req, res) => {
  if (req.user) {
    return res.redirect('/profile');
  }
  res.render('login');
};

exports.get_logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};

exports.get_profile = (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('user', { user: req.user });
};

exports.get_profile_specific = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('user', { user });
  } catch (err) {
    if (err.message.match(/Cast to ObjectId/)) {
      res.render('user', { user: null });
    }
  }
};
