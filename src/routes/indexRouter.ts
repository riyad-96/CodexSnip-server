// External imports
import express from 'express';

// Local imports
import verifyFirebaseToken from '../middlewares/verifyFirebaseToken.js';
import codeRoutes from './code.routes.js';
import codeFolderRoutes from './codeFolder.routes.js';

const router = express.Router();

router.use('/codefolder', verifyFirebaseToken, codeFolderRoutes);
router.use('/code', verifyFirebaseToken, codeRoutes);

export default router;
