const User = require("../models/User.model");
const Worker = require("../models/worker.model");
const Client = require("../models/client.model");
const jwt = require("jsonwebtoken");

// Handle errors function
const handleErrors = (err) => {
  console.error("Error:", err.message, err.code);
  let errors = { email: "", password: "" };

  // Incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // Incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // Duplicate email error (MongoDB error code 11000)
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  // Validation errors
  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Token creation (JWT)
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "maher secret", {
    expiresIn: maxAge,
  });
};

// Signup (GET)
const signup_get = async (req, res) => {
  res.status(200).send("Signup page (if needed)");
};

// Login (GET)
const login_get = async (req, res) => {
  res.status(200).send("Login page (if needed)");
};

// Signup (POST)
const signup_post = async (req, res) => {
  const { role } = req.params;

  if (!["worker", "client"].includes(role)) {
    return res.status(400).json({ error: "Invalid role specified" });
  }

  try {
    if (role === "worker") {
      const {
        firstname,
        lastname,
        email,
        password,
        num_tel,
        date_of_birth,
        speciality,
        description,
        location,
        price,
        rate,
        number_of_messages,
        certification,
        autre_service,
        photo,
        work_photo,
        validated,
      } = req.body;

      const worker = await Worker.create({
        firstname,
        lastname,
        email,
        password,
        num_tel,
        date_of_birth,
        speciality,
        description,
        location,
        price,
        rate,
        number_of_messages,
        certification,
        autre_service,
        photo,
        work_photo,
        validated,
      });
      const id = worker._id;
      const user = await User.create({ email, password, role, id_role: id });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      return res.status(201).json({ user });
    } else if (role === "client") {
      const {
        firstname,
        lastname,
        email,
        password,
        num_tel,
        Date_of_birth,
        photo,
      } = req.body;

      const client = await Client.create({
        firstname,
        lastname,
        email,
        password,
        num_tel,
        Date_of_birth,
        photo,
      });
      const id = client._id;
      const user = await User.create({ email, password, role, id_role: id });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      return res.status(201).json({ user: user, client: client });
    }
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
};

// Login (POST)
const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password); // Assuming `User.login` method exists
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res
      .status(200)
      .json({ user: user._id, token: token, role: user.role });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
};

// Logout (GET)
const logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); // Clear JWT
  res.status(200).json({ message: "You logged out successfully" });
};

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get,
};
