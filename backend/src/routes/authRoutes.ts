import { Router } from 'express';
import { googleCallback } from '../controllers/authController.js';
import passport from '../middleware/googleOAuth.js';
const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate("google"), googleCallback);

export const authRoutes = router;
