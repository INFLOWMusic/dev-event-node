import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/event', async (req: Request, res: Response) => {
    try {
        const event = req.body;
        console.log(event);
        res.send(event);
    } catch (e) {
        res.status(500).send(e);
    }
});

export { router as eventRouter }

