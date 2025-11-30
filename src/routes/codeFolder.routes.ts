// External imports
import express from 'express';
import {
  addNewCodeFolder,
  getCodeFolders,
  updateCodeFolder,
  deleteCodeFolder,
} from '../controllers/codeFolder.controller.js';

const router = express.Router();

router.post('/codefolder/add', addNewCodeFolder);
router.get('/codefolder/get', getCodeFolders);
router.patch('/codefolder/update', updateCodeFolder);
router.delete('/codefolder/delete', deleteCodeFolder);

export default router;
