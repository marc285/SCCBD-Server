import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Request, Response } from 'express';

import Router from './routes/index';

//INITIALIZATIONS
const serverParams: any = {
    "port": 3000
}
const app:express.Application = express();  //To create an Express application

//CONFIGS
app.set('port', serverParams.port || process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({'extended': false}));
app.use(morgan('dev'));
app.use(cors());

//ROUTER
app.get('/test', (req:Request, res:Response) => {
    res.status(200).send(`Hello World! I'm listening at port ${app.get('port')}`);
});
app.use('', Router);

//SERVER STARTUP
app.listen(app.get('port'), () => {
    console.log(`Server started. Listening at port ${app.get('port')}\n`);
});

export default serverParams;