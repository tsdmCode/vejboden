import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
import { userRoutes } from './routes/userRoutes.js';
import { boothRoutes } from './routes/boothRoutes.js';
import { ratingsRoutes } from './routes/ratingsRoutes.js';

const port = process.env.PORT || 3000;
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/booths', boothRoutes);
app.use('/api/ratings', ratingsRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
