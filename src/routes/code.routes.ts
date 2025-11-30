// External imports
import express from 'express';
import { addNewCode, deleteCode, updateCode } from '../controllers/code.controller.js';

const router = express.Router();

router.get('/add', addNewCode);
router.patch('/update', updateCode);
router.delete('/delete', deleteCode);

export default router;
