// External imports
import express from 'express';

// Local imports
import verifyFirebaseToken from '../middlewares/verifyFirebaseToken.js';
import codeRoutes from './code.routes.js';
import codeFolderRoutes from './codeFolder.routes.js';

const router = express.Router();

router.use(verifyFirebaseToken, codeFolderRoutes);
router.use(verifyFirebaseToken, codeRoutes);

export default router;
