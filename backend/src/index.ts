import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
import passport from "./middleware/googleOAuth.js";
import { userRoutes } from './routes/userRoutes.js';
import { boothRoutes } from './routes/boothRoutes.js';
import { ratingsRoutes } from './routes/ratingsRoutes.js';
import { authRoutes } from './routes/authRoutes.js';


const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.initialize();

app.use('/api/users', userRoutes);
app.use('/api/booths', boothRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use("api/auth", authRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
