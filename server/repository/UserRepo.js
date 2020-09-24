const User = require('../models/User');


async function findByEmail(email) {
  return await User.findOne(
    {
      attributes: [
        'password'
      ],
      where: {
        email: email
      }
    }
  );
}


async function registerUser(name, email, password, birthday, city, uf) {
  return await User.create({
    name,
    email,
    password,
    birthday,
    city,
    uf,
  });
}

module.exports = { registerUser, findByEmail };
