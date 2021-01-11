import { Request, Response } from 'express';
import axios from 'axios';
import * as bigintConversion from 'bigint-conversion';

import { ServerParams } from '../ServerParams';
import RSAPublicKey from '../models/RSAPublicKey';

class keyExchangeController {

    public async keyExchange(req: Request, res: Response){ //RSA Key exchange between Client and Server (triggered when Client generates its keys)
        try{
            const serverParams = ServerParams.getInstance();

            let { ttpFlag, e, n } = req.body; //HEX encoded (in JSON)

            if ((ttpFlag != null) && (e != null) && (n != null)) {
                serverParams.setClientRSAkpub(new RSAPublicKey(bigintConversion.hexToBigint(e), bigintConversion.hexToBigint(n)));
                console.log(`\nReceived Client RSA Public Key\ne = ${serverParams.getClientRSAkpub().e}\nn = ${serverParams.getClientRSAkpub().n}`)

                res.status(200).json({'e': bigintConversion.bigintToHex(serverParams.getRSAkpub().e), 'n': bigintConversion.bigintToHex(serverParams.getRSAkpub().n)}); //HEX coded, we send Server's RSA public key

                if(ttpFlag){
                    //We make an RSA Key Exchange between Server and the TTP
                    axios.post(`${serverParams.getTTPip()}:${serverParams.getTTPport()}/keyExchange/server`, {'e': bigintConversion.bigintToHex(serverParams.getRSAkpub().e), 'n': bigintConversion.bigintToHex(serverParams.getRSAkpub().n)})
                    .then(res => {
                        serverParams.setTTPRSAkpub(new RSAPublicKey(bigintConversion.hexToBigint(res.data.e), bigintConversion.hexToBigint(res.data.n)) );
                        console.log(`\nReceived TTP RSA Public Key\ne = ${serverParams.getTTPRSAkpub().e}\nn = ${serverParams.getTTPRSAkpub().n}`)
                    })
                    .catch(err => {
                        console.log('\n', err);
                    });
                }
            }
            else
                res.status(400).json({'e': `Bad Request: Missing Client's key's Public Exponent or Modulus`});
        }
        catch{
            res.status(500).json({'e': 'Internal Server Error'});
        }
    }

}

const controller: keyExchangeController = new keyExchangeController();
export default controller;