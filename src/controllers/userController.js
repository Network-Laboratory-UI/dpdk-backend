const userServices = require("../services/userServices");
const hash = require("../utils/hashUtils");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send("Bad Request");
  }
  try {
    const check = await userServices.checkEmail(email);
    if (check) {
      return res
        .status(208)
        .json({ error: true, message: "email already in use" });
    }

    const hashed = await hash.hashPw(password);
    const data = {
      name: name,
      email: email,
      password: hashed,
    };
    const result = await userServices.addUser(data);
    if (!result.id) {
      return res.status(500).json({ error: true, message: "add data failed" });
    }
    return res
      .status(200)
      .json({ error: false, message: "User added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Bad Request");
  }
  try {
    const data = {
      email: email,
      password: password,
    };
    const result = await userServices.readUser(data);
    if (!result) {
      return res.status(401).json({ error: true, message: "Email Not Found" });
    }
    // Assuming 'result' is a row from a PostgreSQL query
    const resultId = result.id;
    const resultPassword = result.password;
    const resultName = result.name;

    const compared = await hash.comparePw(password, resultPassword);
    if (compared) {
      // Generate JWT token
      const token = jwt.sign({ userId: resultId }, "hashed");

      const loginResult = {
        userId: resultId,
        name: resultName,
        token: token,
      };
      return res
        .status(200)
        .json({ error: false, message: "Success", loginResult });
    }
    return res.status(401).json({ error: true, message: "Invalid Password" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error", data: error });
  }
}

async function getProfile(req, res) {
  try {
    const id = req.userId;
    const result = await userServices.checkUser(id);
    console.log("result:", result);
    if (!result)
      return res.status(404).json({ error: true, message: "User not found" });

    const data = {
      name: result.get("name"),
      email: result.get("email"),
    };
    return res.status(200).json({ error: false, message: "Success", data });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
}


module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
