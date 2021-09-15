const mongoose = require('mongoose')
const User = mongoose.model('User')

const getUserById = async (req, res, next, id) => {
  if (id !== null) {
    req.profile = await User.findOne({_id: id}).exec();
    const profileId = mongoose.Types.ObjectId(req.profile._id)
    if (req.user && profileId.equals(req.user._id)) {
      req.isAuthUser = true;
      return next();
    }
  }
  next();
}

module.exports = {
  getUserById
}
