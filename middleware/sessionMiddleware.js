const isAuthenticated = (req, res, next) => {
    console.log("inside isAuthenticated")
  if (req.session && req.session.user) {
    console.log("inside isAuthenticated if")
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