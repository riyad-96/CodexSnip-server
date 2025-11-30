// External imports
import express from 'express';

// Local imports
import codeRoutes from './code.routes.js';
import verifyFirebaseToken from '../middlewares/verifyFirebaseToken.js';

const router = express.Router();

router.use(verifyFirebaseToken, codeRoutes);

export default router;
