// External imports
import express from 'express';
import { addNewCode, deleteCode, getCode, updateCode } from '../controllers/code.controller.js';

const router = express.Router();

router.get('/code/get', getCode);
router.post('/code/add', addNewCode);
router.patch('/code/update', updateCode);
router.delete('/code/delete', deleteCode);

export default router;
