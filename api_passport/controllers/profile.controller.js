const getUserProfile = (req, res) => {
  if (!req.profile) {
    return res.status(404).json({
      message: "No user found"
    });
  }
  res.json(req.profile);
}

module.exports = {
  getUserProfile
}
