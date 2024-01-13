const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log("Passed from Authentication")
    return next();
  } else {
    res.status(200).json({
        message: "Not authenticated"
    })
    // res.redirect("/login"); // Redirect to login page if not authenticated
  }
};

module.exports = {
    isAuthenticated
}