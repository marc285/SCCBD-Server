import { Request, Response } from 'express';

import serverParams from '../index'

class TextController {

    public async postText (req:Request, res:Response){
        try{
            let {txt} = req.body;
            console.log(`\nText sent from Client: ${txt}`);
            res.status(200).json({'text': txt});
        }
        catch{
            res.status(500).json({'text': 'Internal Server Error'});
        }
    }
    
    public async getText (req:Request, res:Response){
        try{
            console.log(`\nTest: Hello World! I'm listening at port ${serverParams.port}`);
            res.status(200).json({'text': `Hello World! I'm listening at port ${serverParams.port}`});
        }
        catch{
            res.status(500).json({'text': 'Internal Server Error'});
        }
    }
}

const controller: TextController = new TextController();
export default controller;