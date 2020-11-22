import { Request, Response } from 'express';

import { ServerParams } from '../ServerParams';

class TextController {

    public async postText(req: Request, res: Response) {
        try {
            let { txt } = req.body;
            console.log(`\nText sent from Client: ${txt}`);
            res.status(200).json({ 'text': txt });
        }
        catch {
            res.status(500).json({ 'text': 'Internal Server Error' });
        }
    }

    public async getText(req: Request, res: Response) {
        try {
            const serverParams = ServerParams.getInstance();

            console.log(`\nTest: Hello World! I'm listening at port ${serverParams.getPort()}`);
            res.status(200).json({ 'text': `Hello World! I'm listening at port ${serverParams.getPort()}` });
        }
        catch {
            res.status(500).json({ 'text': 'Internal Server Error' });
        }
    }
}

const controller: TextController = new TextController();
export default controller;