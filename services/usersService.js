const { User } = require("../models/user");

const error = "An unexpected error was encountered.";

async function getAll() {
  const users = await User.find().select("-passwordHash");
  if (!users) return { success: false, message: error };
  return { success: true, users: users };
}

async function getById(id) {
  const user = await User.findById(id)
    .select("-passwordHash")
    .catch((err) => {
      return { success: false, message: err };
    });
  if (!user)
    return {
      success: false,
      message: "The user with the given ID was not found!",
    };
  return { success: true, user: user };
}

async function getCount() {
  const userCount = await User.countDocuments();
  if (!userCount) return { success: false, message: error };
  return { success: true, userCount: userCount };
}

async function deleteById(id) {
  await User.findByIdAndRemove(id)
    .then((user) => {
      if (user) return { success: true, message: "The user is deleted!" };
      else return { success: false, message: "user not found!" };
    })
    .catch((err) => {
      return { success: false, error: err };
    });
}

module.exports = {
  getAll,
  getById,
  getCount,
  deleteById,
};
