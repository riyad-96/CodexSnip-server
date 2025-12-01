// External imports
import express from 'express';
import {
  addNewCodeFolder,
  getCodeFolders,
  getSingleCodeFolder,
  updateCodeFolder,
  deleteCodeFolder,
} from '../controllers/codeFolder.controller.js';

const router = express.Router();

router.post('/codefolder/add', addNewCodeFolder);
router.get('/codefolder/get', getCodeFolders);
router.get('/codefolder/get/:id', getSingleCodeFolder)
router.patch('/codefolder/update', updateCodeFolder);
router.delete('/codefolder/delete', deleteCodeFolder);

export default router;
