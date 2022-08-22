const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createToken = ({ id, role, email }) => {
  return jwt.sign({ id, role, email }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
};

const handleNewUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  // check if user exist in database
  const duplicate = await User.findOne({ email });
  if (duplicate) return res.status(409).json({ message: "User already exist" });

  try {
    // encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    //create and store new user
    const createUser = await User.create({
      email: email,
      password: hashedPwd,
    });

    return res.status(201).json(createUser);

    // res.setHeader("Content-Type", "application/json");
  } catch (error) {
    console.log(error);
  }
});

//get all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

//update user
const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);

  const update = await User.findByIdAndUpdate(
    id,
    { email, password: hashedPwd },
    {
      new: true,
    }
  );
  // const users = await User.find();
  res.status(200).json(update);
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    // throw new Error("User not found");
  }
  await user.remove();
  const users = await User.find();
  res.status(200).json(users);
});

//login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  //check if user exist
  const isUser = await User.findOne({ email });
  if (!isUser)
    return res
      .status(404)
      .json({ message: `User with this email is: ${email} not found` });

  try {
    //Encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    //validating user password
    const validatePassword = await bcrypt.compare(password, isUser.password);

    //log user in
    if (validatePassword) {
      return res.status(200).json(isUser);
    } else {
      return res.status(409).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = { handleNewUser, getUsers, updateUser, deleteUser, login };
