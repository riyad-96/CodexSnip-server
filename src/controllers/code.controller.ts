import type { Request, Response } from 'express';

async function addNewCode(req: Request, res: Response) {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

async function updateCode(req: Request, res: Response) {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

async function deleteCode(req: Request, res: Response) {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

export { addNewCode, updateCode, deleteCode };
