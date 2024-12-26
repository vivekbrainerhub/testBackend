const User = require("../../model/users/UsersModel");

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      role,
    } = req.body;

    const emailExist = await User.findOne({ email });
    if (emailExist) throw new Error("Email is Already Registered");

    if (password !== confirmPassword)
      throw new Error("password does not match");

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      role,
    });

    // Save user to the database
    await user.save();

    res.status(201).json({
      status: "success",
      data: user,
      message: "User Created sucessfull",
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({ status: "error", data: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await User.comparePassword(email, password);
    const { token } = await User.generateAuthToken(result?._id);

    res.status(200).send({
      status: "success",
      data: {
        token: token,
        result,
        message: "Login sucessfull",
      },
    });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.toString() });
  }
};

const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;

    const user = await User.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select("-password");
    const totalUsers = await User.countDocuments();

    const totalPages = Math.ceil(totalUsers / pageSize);

    res.status(200).send({
      status: "success",
      data: user,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.toString() });
  }
};
const updateProfile = async (req, res) => {
  const id = req.params.id; // Get the user ID from route parameters
  const { firstName, lastName, phoneNumber, email } = req.body; // Destructure the fields to update
  try {
 
    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, phoneNumber, email },
      { new: true, runValidators: true } 
    ).select("-password"); 

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).send({
      status: "success",
      data: user, 
      message:"Update profile sucessfull"
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

module.exports = {
  createUser,
  login,
  getAllUser,
  updateProfile,
};
