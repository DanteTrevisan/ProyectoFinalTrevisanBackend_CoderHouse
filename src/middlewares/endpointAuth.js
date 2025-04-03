function endpointAuth(requiredRoles) {
  return function (req, res, next) {
    const { user, admin } = req.session;
    // ADMIN
    if (requiredRoles.includes("admin") && admin) {
      return next();
    }
    // USERS
    if (user) {
      const { rol } = user;
      if (requiredRoles.includes(rol)) {
        return next();
      }
    }

    return res.status(403).json({ message: "Unauthorized" });
  };
}

export default endpointAuth;