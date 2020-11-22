import { Request, Response } from 'express';
import * as bigintConversion from 'bigint-conversion';

import { ServerParams } from '../ServerParams';
import RSAPublicKey from '../models/RSAPublicKey';

class RSAcriptoController {

    public async keyExchange(req: Request, res: Response){ //RSA Key exchange between Client and Server (triggered when Client generates its keys)
        try{
            const serverParams = ServerParams.getInstance();

            let { e, n } = req.body; //HEX encoded (in JSON)

            if ((e != null) && (n != null)) {
                serverParams.setClientRSAkpub(new RSAPublicKey(bigintConversion.hexToBigint(e), bigintConversion.hexToBigint(n)));
                console.log(`\nReceived Client RSA Public Key\ne = ${serverParams.getClientRSAkpub().e}\nn = ${serverParams.getClientRSAkpub().n}`)

                res.status(200).json({'e': bigintConversion.bigintToHex(serverParams.getRSAkub().e), 'n': bigintConversion.bigintToHex(serverParams.getRSAkub().n) }); //HEX coded, we send Server's RSA public key
            }
            else
                res.status(400).json({ 'e': `Bad Request: Missing Client's key's Public Exponent or Modulus` });
        }
        catch{
            res.status(500).json({ 'e': 'Internal Server Error'});
        }
    }

    public async getEncrypted(req: Request, res: Response) {
        try {
            const serverParams = ServerParams.getInstance();
            
            let plainText = `Hello World! I'm listening at port ${serverParams.getPort()}`;
            console.log(`\nPlain text: ${plainText}`);

            let cipherText = serverParams.getClientRSAkpub().encrypt(bigintConversion.textToBigint(plainText)); //BigInt encoded
            console.log(`Encrypted text: ${cipherText}`);

            res.status(200).json({ 'c': bigintConversion.bigintToHex(cipherText) }); //HEX encoded (in JSON)
        }
        catch {
            res.status(500).json({ 'c': 'Internal Server Error' });
        }
    }

    public async decrypt(req: Request, res: Response) {
        try {
            const serverParams = ServerParams.getInstance();

            let { c } = req.body; //HEX encoded (in JSON)
            let cipherText = bigintConversion.hexToBigint(c as string);
            console.log(`\nCipher text sent from Client: ${cipherText}`);

            let m = serverParams.getRSAkpriv().decrypt(cipherText); //BigInt encoded

            let plainText: string = bigintConversion.bigintToText(m); //TEXT encoded
            console.log(`Decrypted text: ${plainText}`);

            res.status(200).json({ 'm': plainText });
        }
        catch {
            res.status(500).json({ 'm': 'Internal Server Error' });
        }
    }

    public async getSigned(req: Request, res: Response) {
        try {
            const serverParams = ServerParams.getInstance();

            let input: string = `My identity is SCCBD-Server`;
            console.log(`\nInput to be signed: ${input}`);

            let signature = serverParams.getRSAkpriv().sign(bigintConversion.textToBigint(input));
            console.log(`Signature: ${signature}`); //BigInt encoded
            
            res.status(200).json({ 's': signature });
        }   
        catch {
            res.status(500).json({ 's': 'Internal Server Error'});
        }
    }

    public async verify(req: Request, res: Response) {
        try {
            const serverParams = ServerParams.getInstance();

            let { s } = req.body; //HEX encoded (in JSON)

            let v = serverParams.getClientRSAkpub().verify(bigintConversion.hexToBigint(s));

            let verification = bigintConversion.bigintToText(v); //TEXT encoded
            console.log(`\nVerification: ${verification}`);

            res.status(200).json({ 'v': verification });
        }
        catch {
            res.status(500).json({ 'v': 'Internal Server Error' });
        }
    }

}

const controller: RSAcriptoController = new RSAcriptoController();
export default controller;