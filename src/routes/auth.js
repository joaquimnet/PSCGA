const { Router } = require('express');
const passport = require('passport');

const authRoutes = Router();

authRoutes.get('/discord', passport.authenticate('discord'));
// // authRoutes.get('/google', passport.authenticate('google'));

authRoutes.get(
  '/redirect/discord',
  passport.authenticate('discord', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/profile');
  },
);

module.exports = authRoutes;
