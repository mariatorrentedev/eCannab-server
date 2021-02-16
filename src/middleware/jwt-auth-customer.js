const AuthService = require("../auth/auth-service-c");

function requireAuth(req, res, next) {
  const authToken = req.get("Authorization") || "";

  let bearerToken;
  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }
  try {
    const payload = AuthService.verifyJwt(bearerToken);

    AuthService.getCustomerWithEmail(req.app.get("db"), payload.sub).then(
      (customer) => {
        if (!customer) {
          return res.status(401).json({ error: "Unauthorized request" });
        }
        req.customer = customer;
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
}

module.exports = {
  requireAuth,
};
