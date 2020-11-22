# SCCBD-Server
Server of the Cibersecurity (SCCBD) test project by Marc Cayuelas  
  
## Scripts
`npm run dev` Run in development  
`npm run prod` Run in production  
`npm run build` Build (transpile) to production  
  
## API ENDPOINTS  
  
**GET** `/txt/get` Sends to the Client a sample Text  
**POST** `/txt/post` Receives a Text from the Client  
  
**GET** `/cripto/AESgetEncrypted` Server Encrypts (with AES) a sample Text and sends it to the Client  
**POST** `/cripto/AESdecrypt` Receives an encrypted Text (with AES) from the Client, decrypts it and sends it back  
  
**GET** `/cripto/RSAgetEncrypted` Server Encrypts (with RSA) a sample Text and sends it to the Client  
**POST** `/cripto/RSAdecrypt` Receives an encrypted Text (with RSA) from the Client, decrypts it and sends it back  
**GET** `/cripto/RSAgetSigned` Server signs a sample Text and sends it to the Client  
**POST** `/cripto/RSAverify` Receives a signature from the Client and verifies it  
  