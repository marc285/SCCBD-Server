import RSAPublicKey from './models/RSAPublicKey';
import RSAPrivateKey from './models/RSAPrivateKey';

export class ServerParams {  //Singleton Pattern

    private static instance: ServerParams;

    private port: number;
    private AESkey: string; //HEX
    private RSAkpub: RSAPublicKey; //e,n BigInt
    private RSAkpriv: RSAPrivateKey; //d,n Bigint
    private clientRSAkpub: RSAPublicKey; //Public key of the Client
    private ttpIP: string; //IP address of the TTP to connect with (for some exchanges)
    private ttpPort: number; //Port of the TTP to connect with (for some exchanges)
    private ttpRSAkpub: RSAPublicKey; //Public key of the TTP 
    private ttpSharedKey: any; //(K of the TTP schema) HEX
    private ttpContent: any; //Content to be delivered (M of the TTP schema)

    private constructor() { //Empty initialization 
        this.port = 0;
        this.AESkey = '';
        this.RSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.RSAkpriv = new RSAPrivateKey(BigInt(0), BigInt(0));
        this.clientRSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.ttpIP = '';
        this.ttpPort = 0;  
        this.ttpRSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.ttpSharedKey = {};
        this.ttpContent = '';
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

    public getRSAkpub(): RSAPublicKey {
        return this.RSAkpub;
    }

    public setRSAkpub(RSAkpub: RSAPublicKey) {
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

    public getTTPip(): string {
        return this.ttpIP;
    }

    public setTTPip(ttpIP: string){
        this.ttpIP = ttpIP;
    }

    public getTTPport(): number {
        return this.ttpPort;
    }

    public setTTPport(ttpPort: number){
        this.ttpPort = ttpPort;
    }

    public getTTPRSAkpub(): RSAPublicKey {
        return this.ttpRSAkpub;
    }

    public setTTPRSAkpub(RSAkpub: RSAPublicKey) {
        this.ttpRSAkpub = RSAkpub;
    }

    public getTTPSharedKey(): any {
        return this.ttpSharedKey;
    }

    public setTTPSharedKey(ttpSharedKey: any) {
        this.ttpSharedKey = ttpSharedKey;
    }

    public getTTPcontent(): any {
        return this.ttpContent;
    }

    public setTTPcontent(ttpContent: any) {
        this.ttpContent = ttpContent;
    }

}