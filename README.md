# SCCBD-Server
Server of the Cibersecurity (SCCBD) test project by Marc Cayuelas  
  
## Scripts
`npm run dev` Run in development  
`npm run prod` Run in production  
`npm run build` Build (transpile) to production  
  
## API Endpoints
  
**POST** `/keyExchange` RSA Key Exchange between the Client and the Server, then between the Server and the TTP  
___  
**GET** `/txt/get` Sends to the Client a sample Text  
**POST** `/txt/post` Receives a Text from the Client  
___  
**GET** `/cripto/AES/getEncrypted` Server Encrypts (with AES) a sample Text and sends it back to the Client  
**POST** `/cripto/AES/decrypt` Receives an encrypted Text (with AES) from the Client, decrypts it and sends it back  
___  
**GET** `/cripto/RSA/getEncrypted` Server Encrypts (with RSA) a sample Text and sends it back to the Client  
**POST** `/cripto/RSA/decrypt` Receives an encrypted Text (with RSA) from the Client, decrypts it and sends it back  
**GET** `/cripto/RSA/getSigned` Server signs a sample Text and sends it back to the Client  
**POST** `/cripto/RSA/verify` Receives a signature from the Client and verifies it  
___  
**POST** `/bs/sign` Server Signs (blindly) a Blinded Message (sent by the Client) and sends it back to the Client  
___  
**GET** `/ttp/getMessage` [TTP TYPE 1] Sends to the Client the Content to be decrypted with the TTP shared key  
**POST** `/ttp/sendInterest` [TTP TYPE 2] Client sends to the Server its interest to decrypt the Content 
___  