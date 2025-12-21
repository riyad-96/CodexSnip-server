// External imports
import express from 'express';
import addNewCode from '../controllers/code/addNewCode.js';
import getSingleCode from '../controllers/code/getSingleCode.js';
import updateCode from '../controllers/code/updateCode.js';
import deleteCode from '../controllers/code/deleteCode.js';

const router = express.Router();

router.post('/add', addNewCode);
router.get('/get/:id', getSingleCode);
router.patch('/update', updateCode);
router.delete('/delete/:folder_id/:code_block_id', deleteCode);

export default router;
