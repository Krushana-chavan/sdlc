const { AuthModel } = require("../models/auth.model");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AuthModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};




const UserController = {
  getUser
};

module.exports = {
  UserController,
};
