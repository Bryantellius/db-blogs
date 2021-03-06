import * as passport from "passport";
import * as BearerStrategy from "passport-http-bearer";

import { ValidToken } from "../utils/security/tokens";
import db from "../db";

passport.use(
  new BearerStrategy.Strategy(async (token, done) => {
    console.log(`bearer strategy`);
    try {
      let payload = await ValidToken(token);
      let [user] = await db.Users.findOneById(payload.userid);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (e) {
      done(e);
    }
  })
);
