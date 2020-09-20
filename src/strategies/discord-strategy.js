const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');

const { User } = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ _id: id }).exec();
  if (user) {
    done(null, user);
  } else {
    done('User Not Found');
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ['identify', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const user = await User.findOne({ discordId: profile.id }).exec();
        if (user) {
          done(null, user);
        } else {
          const createdUser = new User({ discordId: profile.id, username: profile.username });
          await createdUser.save();
          done(null, createdUser);
        }
      } catch (err) {
        console.log(err);
        done(err);
      }
    },
  ),
);
