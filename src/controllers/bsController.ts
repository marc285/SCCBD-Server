import { Request, Response } from 'express';
import * as bigintConversion from 'bigint-conversion';

import { ServerParams } from '../ServerParams';

class bsController {

    public async getSigned(req: Request, res: Response){
        try{
            const serverParams = ServerParams.getInstance();

            let { bm } = req.body; //HEX
            let blindedMessage: bigint = bigintConversion.hexToBigint(bm);
            console.log(`\nBlinded Message sent from Client: ${blindedMessage}`);

            let blindSignature: bigint = serverParams.getRSAkpriv().sign(blindedMessage);
            console.log(`Blind Signature: ${blindSignature}`);

            res.status(200).json({'bs': bigintConversion.bigintToHex(blindSignature)});
        }
        catch{
            res.status(500).json({'bs': 'Internal Server Error'});
        }
    }

}

const controller: bsController = new bsController();
export default controller;