import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
import helmet from 'helmet';
import passport from "./middleware/googleOAuth.js";
import { userRoutes } from './routes/userRoutes.js';
import { boothRoutes } from './routes/boothRoutes.js';
import { ratingsRoutes } from './routes/ratingsRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import session from "express-session"

const port = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());



app.use('/api/users', userRoutes);
app.use('/api/booths', boothRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use("/api/auth", authRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
