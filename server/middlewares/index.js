import expressJwt from "express-jwt";

export const RequireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
