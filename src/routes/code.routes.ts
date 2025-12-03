// External imports
import express from 'express';
import {
  addNewCode,
  deleteCode,
  getCodes,
  getSingleCode,
  updateCode,
} from '../controllers/code.controller.js';

const router = express.Router();

router.post('/add', addNewCode);
router.get('/get', getCodes);
router.get('/get/:id', getSingleCode);
router.patch('/update', updateCode);
router.delete('/delete/:folder_id/:code_block_id', deleteCode);

export default router;
