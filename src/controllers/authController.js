const bcrypt = require('bcryptjs');
const { userRegisterDB } = require('../models/authModel');

async function userRegister(req, res) {
  try {
    const hashedPass = bcrypt.hashSync(req.body.password, 10);
    const data = await userRegisterDB(req.body.email, hashedPass);
    if (!data) {
      return res
        .status(500)
        .send('Something went wrong, please check entered data');
    }

    return res.send({
      msg: 'Successfully created account',
      userId: data.userID,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ err: 'Something went wrong, please check entered data' });
  }
}

module.exports = {
  userRegister,
};
