const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.userRole === "admin") {
    // User is an admin, allow access
    next();
  } else {
    res.status(403);
    throw new Error("Forbidden, You don't have access to this Route please check your role");
  }
};

module.exports = {
  isAdmin,
};
