const userRepository = require('../repository/UserRepo');
const { compare, hash } = require('bcrypt');
const admEmail = require('../config/env').admEmail;


async function login(email, password) {
  try {
    let user = await userRepository.findByEmail(email)
    
    if(user !== null) 
      user = user.toJSON();
    else
      throw Error('the email address does not match any user account');

    let match = await compare(password, user.password);
    if (!match)
      throw Error('password does not match your account');

    delete user.password;
    if (email === admEmail)
      user.adm = true;
    else
      user.adm = false;

    return user;

  } catch (err) {
    throw err;
  }
}


async function registerUser(name, email, password, birthday, city, uf) {
  try {

    let user = await userRepository.findByEmail(email);
    if(user !== null)
      throw Error('this email address is already in use by other account');
      
    let hashedPassword = await hash(password, 8);

    return await userRepository.registerUser(
      name,
      email,
      hashedPassword,
      birthday,
      city,
      uf,
    );

  } catch (err) {
    throw err;
  }
}

module.exports = { login, registerUser };
