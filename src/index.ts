import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Request, Response } from 'express';

import { ServerParams } from './ServerParams';
import Router from './routes/index';

import RSA from './models/RSA';
import RSAPublicKey from './models/RSAPublicKey';
import RSAPrivateKey from './models/RSAPrivateKey';

//INITIALIZATIONS
const serverParams = ServerParams.getInstance();
serverParams.setPort(3000);
serverParams.setTTPip("http://localhost");
serverParams.setTTPport(5000);
const app: express.Application = express();  //To create an Express application
//const AESkey: string = CryptoJS.lib.WordArray.random(256/8);
serverParams.setAESkey("edead000b97a69c30ef7cd357fe46c1af00bf079b9e0fb7729f163ec19c72ee5"); //AES 256 bits PRIVATE KEY
serverParams.setTTPcontent("This is a Test Message for the Non-Repudiation Protocol.");

//CONFIGS
app.set('port', serverParams.getPort() || process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ 'extended': false }));
app.use(morgan('dev'));
app.use(cors());

//ROUTER
app.get('/test', (req: Request, res: Response) => {
    res.status(200).send(`Hello World! I'm listening at port ${app.get('port')}`);
});
app.use('', Router);

//SERVER STARTUP
app.listen(app.get('port'), async () => {
    console.log(`Server started. Listening at port ${app.get('port')}`);

    //GENERATE (2048 bits) RSA KEY PAIR FOR THIS SESSION
    let kp = await RSA.generateKeys(2048);
    serverParams.setRSAkpub(kp.kpub as RSAPublicKey);
    serverParams.setRSAkpriv(kp.kpriv as RSAPrivateKey);
    console.log(`Server generated RSA Key Pair:\ne = ${kp.kpub.e}\nn = ${kp.kpub.n}\nd = ${kp.kpriv.d}\n`);

});