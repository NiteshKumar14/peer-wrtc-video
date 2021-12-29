const mkcert = require('mkcert');
const mke = async()=>{

// create a certificate authority
const ca = await mkcert.createCA({
    organization: 'Mkcert',
    countryCode: 'IN',
    state: 'UttarPradesh',
    locality: 'Varanasi',
    validityDays: 365
  });
  
  // then create a tls certificate
  const cert = await mkcert.createCert({
    domains: ['127.0.0.1', 'localhost','192.168.0.107'],
    validityDays: 365,
    caKey: ca.key,
    caCert: ca.cert
  });
  const fs = require('fs');
  fs.appendFile('cert.pem',cert.cert,(err)=>{
    if(err) throw err;
    console.log('saved');
  })
  fs.appendFile('key.pem',cert.key,(err)=>{
    if(err) throw err;
    console.log('saved');
  })
  fs.appendFile('ca.pem',ca.cert,(err)=>{
    if(err) throw err;
    console.log('saved');
  })
  // console.log(cert.key, cert.cert); // certificate info
  // console.log(`${cert.cert}\n${ca.cert}`); // create a full chain certificate by merging CA and domain certificates
}
mke();