import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js"

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (_, __, profile, next) => {
        // Check if the user with email already exist
        const user = await User.findOne({ email: profile._json.email });
        if (user) {
          if (user.loginType !== UserLoginType.GOOGLE) {
           
            next(
              new ApiError(
                400,
                "You have previously registered using " +
                  user.loginType?.toLowerCase()?.split("_").join(" ") +
                  ". Please use the " +
                  user.loginType?.toLowerCase()?.split("_").join(" ") +
                  " login option to access your account."
              ),
              null
            );
          } else{
            next(null, user);
          }
        } else {
          const createdUser = await User.create({
            email: profile._json.email,
            password: profile._json.sub, 
            username: profile._json.email?.split("@")[0], 
            isEmailVerified: true, 
            role: UserRolesEnum.USER,
            avatar: {
              url: profile._json.picture,
              localPath: "",
            }, 
            loginType: UserLoginType.GOOGLE,
          });
          if (createdUser) {
            next(null, createdUser);
          } else {
            next(new ApiError(500, "Error while registering the user"), null);
          }
        }
      }
    )
  );
