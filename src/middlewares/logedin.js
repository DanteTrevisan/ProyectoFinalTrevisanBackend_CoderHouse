function logedin(req, res, next) {
  if (req.session.user) {
    return res.redirect("/profile");
  }
  next();
}

export default logedin;