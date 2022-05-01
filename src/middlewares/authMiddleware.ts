import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import { NextFunction, Request, Response } from "express";

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => done(null, payload)
  )
);

// ------------------------------------ Is Authenticated ---------------------------------------------------------------

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, payload) => {
    if (payload) {
      req.user = payload;
      return next();
    }
    return res.status(403).json("You are not authorized");
  })(req, res, next);
};

export default { isAuthenticated };
