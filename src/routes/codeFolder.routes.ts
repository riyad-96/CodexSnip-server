// External imports
import express from 'express';
import addNewCodeFolder from '../controllers/code_folder/addNewCodeFolder.js';
import getCodeFolders from '../controllers/code_folder/getCodeFolders.js';
import getSingleCodeFolder from '../controllers/code_folder/getSingleCodeFolder.js';
import updateCodeFolder from '../controllers/code_folder/updateCodeFolder.js';
import deleteCodeFolder from '../controllers/code_folder/deleteCodeFolder.js';

const router = express.Router();

router.post('/add', addNewCodeFolder);
router.get('/getall', getCodeFolders);
router.get('/get/:id', getSingleCodeFolder);
router.patch('/update', updateCodeFolder);
router.delete('/delete/:id', deleteCodeFolder);

export default router;
