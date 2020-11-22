import { Request, Response } from 'express';
import * as CryptoJS from 'crypto-js';

import { ServerParams } from '../ServerParams';

class AESCriptoController {

    public async getEncrypted (req:Request, res:Response) { //AES, 256 bits key, CTR mode, 128 bits IV
        try{
            const serverParams = ServerParams.getInstance();

            let plainText = `Hello World! I'm listening at port ${serverParams.getPort()}`;
            console.log(`\nPlain text: ${plainText}`);

            let IV = CryptoJS.lib.WordArray.random(128/8); //128 bits IV
            console.log(`Generated IV: ${IV}`);

            let cipherText = CryptoJS.AES.encrypt(plainText, serverParams.getAESkey(), {iv: IV, mode:CryptoJS.mode.CTR}).toString();
            console.log(`Encrypted text: ${cipherText}`);

            res.status(200).json({'c': cipherText, 'iv': IV.toString()});
        }
        catch{
            res.status(500).json({'c': 'Internal Server Error'});
        }
    }

    public async decrypt (req:Request, res:Response) { //AES, 256 bits key, CTR mode, 128 bits IV
        try{
            const serverParams = ServerParams.getInstance();

            let { c, iv } = req.body;
            let IV = iv;
            console.log(`\nCipher text sent from Client: ${c}`);
            console.log(`IV sent from Client: ${IV}`);

            let plainText = CryptoJS.AES.decrypt(c, serverParams.getAESkey(), {iv: IV, mode:CryptoJS.mode.CTR}).toString(CryptoJS.enc.Utf8);
            console.log(`Decrypted text: ${plainText}`);

            res.status(200).json({'m': plainText});
        }
        catch{
            res.status(500).json({'m': 'Internal Server Error'});
        }
    }

}

const controller: AESCriptoController = new AESCriptoController();
export default controller;