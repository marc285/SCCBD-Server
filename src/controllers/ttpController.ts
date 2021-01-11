import { Request, Response } from 'express';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import * as bigintConversion from 'bigint-conversion';
import * as objectSha from 'object-sha';

import { ServerParams } from '../ServerParams';

class ttpController {

    public async getContent(req: Request, res: Response){
        
        try{
            const serverParams = ServerParams.getInstance();

            //First we generate the Shared Key (K of the TTP schema)
            let AESkey: string = CryptoJS.lib.WordArray.random(256/8).toString(); //AES 256 bits PRIVATE KEY
            let IV = CryptoJS.lib.WordArray.random(128/8); //128 bits IV
            let sharedKey: object = {
                'k': AESkey,
                'iv': IV
            }

            serverParams.setTTPSharedKey(sharedKey);
            console.log(`\nGenerated AES Shared Key For the TTP: ${Object.values(sharedKey)}`)

            //Then we encrypt the Content
            let cipherText = CryptoJS.AES.encrypt(serverParams.getTTPcontent(), serverParams.getTTPSharedKey().k, {iv: serverParams.getTTPSharedKey().iv, mode:CryptoJS.mode.CTR}).toString();
            console.log(`Encrypted text: ${cipherText}`);

            let body: object = {
                'type': "1", 'src': "A", 'dst': "B", 'ttp': "TTP", 'ts': Date.now(), 'msg': cipherText
            }

            const serializedBody = objectSha.hashable(body);
            const digest = await objectSha.digest(serializedBody);
            const signature = serverParams.getRSAkpriv().sign(bigintConversion.hexToBigint(digest));

            const obj: object = {
                'body' : body,
                'proof': { 'type': "Origin", 'value': bigintConversion.bigintToHex(signature) }
            }

            console.log(Object.values(obj));
            res.status(200).json({'obj': obj}); //TYPE 1: Sends to the Client the Content
        }
        catch{
            res.status(500).json({'obj': 'Internal Server Error'});
        }
    }

    public async sendInterest(req: Request, res: Response){
        try{
            const serverParams = ServerParams.getInstance();
            
            let { obj } = req.body;

            let serializedBody = objectSha.hashable(obj.body);
            const hashObj: string = await objectSha.digest(serializedBody); //HEX
            const hashProof: bigint = serverParams.getClientRSAkpub().verify(bigintConversion.hexToBigint(obj.proof.value));
            
            if(hashObj == bigintConversion.bigintToHex(hashProof)){

                let body: object = {
                    'type': "3", 'src': "A", 'dst': "B", 'ttp': "TTP", 'ts': Date.now(), 'msg': serverParams.getTTPSharedKey()
                }

                serializedBody = objectSha.hashable(body);
                const digest = await objectSha.digest(serializedBody);
                const signature = serverParams.getRSAkpriv().sign(bigintConversion.hexToBigint(digest));

                obj = {
                    'body' : body,
                    'proof': { 'type': "Proof of origin of K", 'value': bigintConversion.bigintToHex(signature) }
                }

                console.log(Object.values(obj));

                let req = {
                    'obj': obj
                  };

                //TYPE 3: We publish the Shared Key in the TTP
                axios.post(`${serverParams.getTTPip()}:${serverParams.getTTPport()}/ttp/publishKey`, req)
                .then(async axiosRes => {
                    obj = axiosRes.data.obj;
                    
                    let serializedBody = objectSha.hashable(obj.body);
                    const hashObj: string = await objectSha.digest(serializedBody); //HEX
                    const hashProof: bigint = serverParams.getTTPRSAkpub().verify(bigintConversion.hexToBigint(obj.proof.value));
            
                    if(hashObj == bigintConversion.bigintToHex(hashProof)){
                        console.log("\nShared Key successfully published in the TTP");
                        res.status(200).json({'obj': 'Shared Key successfully published in the TTP'});
                    }
                    else{
                        console.log("\nError: Can't verify the proof of publication of K of the TTP");
                        res.status(403).json({'obj': `Error: Can't verify the proof of publication of K of the TTP`});
                    }
                })
                .catch(err => {
                    if(err.response.status == 403){
                        console.log(`\n${err.response.data}`);
                        res.status(403).json({'obj': err.response.data});
                    }
                    else{
                        console.log(`\nError while publishing Shared Key in the TTP: ${err.response.data}`);
                        res.status(500).json({'obj': `Error while publishing Shared Key in the TTP: ${err.response.data}`});
                    }
                });
            }
            else{
                console.log("\nError: Can't verify the proof of reception");
                res.status(403).json({'obj': `Error: Can't verify the proof of reception`});
            }
        }
        catch{
            res.status(500).json({'obj': 'Internal Server Error'});
        }
    }

}

const controller: ttpController = new ttpController();
export default controller;