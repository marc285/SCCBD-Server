import RSAPublicKey from './models/RSAPublicKey';
import RSAPrivateKey from './models/RSAPrivateKey';

export class ServerParams {  //Singleton Pattern

    private static instance: ServerParams;

    private port: number;
    private AESkey: string; //HEX
    private RSAkpub: RSAPublicKey; //e,n BigInt
    private RSAkpriv: RSAPrivateKey; //d,n Bigint
    private clientRSAkpub: RSAPublicKey; //Public key of the Client 

    private constructor() { //Empty initialization 
        this.port = 0;
        this.AESkey = '';
        this.RSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.RSAkpriv = new RSAPrivateKey(BigInt(0), BigInt(0));
        this.clientRSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
    };

    public static getInstance(): ServerParams {
        if (!ServerParams.instance) {
            ServerParams.instance = new ServerParams();
        }

        return ServerParams.instance;
    }

    public getPort(): number {
        return this.port;
    }

    public setPort(port: number) {
        this.port = port;
    }

    public getAESkey(): string {
        return this.AESkey;
    }

    public setAESkey(AESkey: string) {
        this.AESkey = AESkey;
    }

    public getRSAkub(): RSAPublicKey {
        return this.RSAkpub;
    }

    public setRSAkub(RSAkpub: RSAPublicKey) {
        this.RSAkpub = RSAkpub;
    }

    public getRSAkpriv(): RSAPrivateKey {
        return this.RSAkpriv;
    }

    public setRSAkpriv(RSAkpriv: RSAPrivateKey) {
        this.RSAkpriv = RSAkpriv;
    }

    public getClientRSAkpub(): RSAPublicKey {
        return this.clientRSAkpub;
    }

    public setClientRSAkpub(RSAkpub: RSAPublicKey) {
        this.clientRSAkpub = RSAkpub;
    }

}