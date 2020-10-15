import { Request, Response } from 'express';
import * as CryptoJS from 'crypto-js';
//import crypto from 'crypto';

import serverParams from '../index'
import keys from '../keys'

class CriptoController {

    public async AESencrypt (req:Request, res:Response) { //AES, 256 bits key, CTR mode, 128 bits IV
        try{
            let Plaintxt = `Hello World! I'm listening at port ${serverParams.port}`
            console.log(`\nPlain text: ${Plaintxt}`);

            //let IV = crypto.randomBytes(40).toString('hex');

            let IV = CryptoJS.lib.WordArray.random(128/8); //128 bits IV
            console.log(`Generated IV: ${IV}`);

            let Ciphertxt = CryptoJS.AES.encrypt(Plaintxt, keys.AES256.toString(), {iv: IV, mode:CryptoJS.mode.CTR}).toString();
            console.log(`Encrypted text: ${Ciphertxt}`);

            res.status(200).json({'ciphertxt': Ciphertxt, 'iv': IV.toString()});
        }
        catch{
            res.status(500).json({'ciphertxt': 'Internal Server Error'});
        }
    }

    public async AESdecrypt (req:Request, res:Response) { //AES, 256 bits key, CTR mode, 128 bits IV
        try{
            let {ciphertxt, iv} = req.body;
            let IV = iv;
            console.log(`\nCipher text sent from Client: ${ciphertxt}`);
            console.log(`IV sent from Client: ${IV}`);

            let Plaintxt = CryptoJS.AES.decrypt(ciphertxt, keys.AES256.toString(), {iv: IV, mode:CryptoJS.mode.CTR}).toString(CryptoJS.enc.Utf8);
            console.log(`Decrypted text: ${Plaintxt}`);

            res.status(200).json({'plaintxt': Plaintxt});
        }
        catch{
            res.status(500).json({'plaintxt': 'Internal Server Error'});
        }
    }

}

const controller: CriptoController = new CriptoController();
export default controller;