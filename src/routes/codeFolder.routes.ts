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

router.post('/add', addNewCodeFolder);
router.get('/getall', getCodeFolders);
router.get('/get/:id', getSingleCodeFolder)
router.patch('/update', updateCodeFolder);
router.delete('/delete', deleteCodeFolder);

export default router;
