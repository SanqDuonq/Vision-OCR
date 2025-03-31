import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import dotenv from "dotenv";
import User from "../models/user.model";

dotenv.config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			callbackURL: "http://localhost:3000/api/auth/google/callback",
			scope: ["profile", "email"],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await User.findOne({ googleId: profile.id });

				if (!user) {
					user = await User.create({
						googleId: profile.id,
						fullname: profile.displayName,
						email: profile.emails?.[0]?.value || "",
						avatar: profile.photos?.[0]?.value || "",
					});
				}
				return done(null, user);
			} catch (error) {
				return done(error, null!);
			}
		}
	)
);

passport.use(
	new GithubStrategy({
		clientID: process.env.GITHUB_CLIENT_ID!,
		clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		callbackURL: "http://localhost:3000/api/auth/github/callback",
		scope: ["user:email"],
	},
  async (accessToken:any, refreshToken:any, profile:any, done:any) => {
    try {
        let user = await User.findOne({githubId: profile.id})
        if (!user) {
            user = await User.create({
                githubId: profile.id,
				fullname: profile.displayName,
				email: profile.emails?.[0]?.value || "",
				avatar: profile.photos?.[0]?.value || "",
            })
        }
		return done(null, user);
    } catch (error) {
        return done(error, null!);
    }
  }
));
