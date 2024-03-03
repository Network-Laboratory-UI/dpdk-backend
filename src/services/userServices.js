const user = require("../models/user");

async function addUser(data) {
  try {
    const result = await user.create(data);
    return result;
  } catch (error) {
    throw new Error("Error creating user");
  }
}

async function checkEmail(email) {
  try {
    const result = await user.findOne({
      where: {
        email: email,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Error checking email");
  }
}

async function readUser(data) {
  try {
    const result = await user.findOne({
      where: {
        email: data.email,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Error reading user");
  }
}

async function checkUser(id) {
  try {
    const result = await user.findOne({
      where: {
        id: id,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Error checking user");
  }
}

module.exports = {
  addUser,
  checkEmail,
  readUser,
  checkUser,
};
