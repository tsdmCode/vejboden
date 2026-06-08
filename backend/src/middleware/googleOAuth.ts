import passport from 'passport';
import { Strategy as GoogleStrategy, type Profile } from 'passport-google-oauth20';
import { prisma } from '../prisma.js';
import type { Users } from '@prisma/client';

declare global {
  namespace Express {
    interface User {
      id: number;
      firstname: string;
      lastname: string;
      username: string;
      email: string;
      password: string | null;
      googleId: string | null;
      profilePicture: string | null;
      role: string;
    }
  }
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      callbackURL: GOOGLE_CALLBACK_URL!,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (err: any, user?: Users | false) => void,
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const photo = profile.photos?.[0]?.value;

        if (!email || !name) {
          return done(new Error('No email from Google'));
        }

        const safeEmail: string = email;
        const safeName: string = name;

        let user = await prisma.users.findUnique({
          where: { email: safeEmail },
        });

        if (!user) {
          user = await prisma.users.create({
            data: {
              email: safeEmail,
              firstname: safeName.split(' ')[0] || '',
              lastname: safeName.split(' ')[1] || '',
              username: safeEmail.split('@')[0] || "user",
              googleId: profile.id,
              profilePicture: photo || null,
              role: 'USER',
            },
          });
        } else {
          if (!user.googleId) {
            user = await prisma.users.update({
              where: { id: user.id },
              data: {
                googleId: profile.id,
                profilePicture: photo || null,
              },
            });
          }
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.serializeUser((user: Express.User, done: (err: any, id?: number) => void) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done: (err: any, user?: Users | null) => void) => {
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
