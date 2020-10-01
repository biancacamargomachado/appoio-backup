const userService = require('../services/UserService');


async function login(req, res) {
  let { email, password } = req.body;

  try {
    let user = await userService.login(email, password);
    req.session.userId = user.id;
    req.session.adm = user.adm;

    return res.json({
      resp: true,
      status: 200,
      msg: 'User logged',
      data: user
    });

  } catch (err) {
    console.log(err);

    return res.json({
      resp: false,
      status: 401,
      msg: 'Login failed. '+ err,
      data: {}
    });
  }
}


async function register(req, res) {
  let { name, email, password, birthday, city, uf } = req.body;

  try {

    let user = await userService
      .registerUser(
        name,
        email,
        password,
        birthday,
        city,
        uf,
      );

    req.session.userId = user.id;

    return res.json({
      resp: true,
      status: 201,
      msg: 'User registered',
      data: {
        user: {
          id: user.id
        }
      }
    });

  } catch (err) {
    console.log(err);

    return res.json({
      resp: false,
      status: 409,
      msg: 'Registration failed. '+ err,
      data: {}
    })
  }
}

module.exports = { login, register };
