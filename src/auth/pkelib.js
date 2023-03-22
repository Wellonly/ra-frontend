
const ms = require('ms');
const crypto = require('crypto');

// const curves = ['secp521r1', 'secp256k1', 'brainpoolP512t1', 'sect571k1', 'prime256v1', 'c2pnb272w1', 'brainpoolP256t1', 'SM2'];
// const crypta = ['sha256', 'sha512'];

const curve = process.env.REACT_APP_ECDH || 'secp256k1'; //secp521r1
const calgo = process.env.REACT_APP_PKE_ALGO || 'sha256';
const saltlength = Number.parseInt(process.env.REACT_APP_SALT_LENGTH, 10) || 32;

const clientServerPubs = new Map(); // let serverPub = [];// let clientPub = [];

//TODO: remove "withoutsalt" and change it to a random number!!!

// WARN: may throw exceptions...
export const encryptText = (text, pass, salt = "withoutsalt", iv = Buffer.alloc(16, pass), keylen = 24, alg = 'aes-192-cbc') => { // aes-256-cbc 'aes-192-cbc' 'chacha20-poly1305'
  let key = crypto.pbkdf2Sync(pass, salt, salt2iterations(salt), keylen, calgo); // const key = Buffer.alloc(keylen, pass);
  // console.log("zv encryptText(key, iv):", key, iv);
  // const cipher = crypto.createCipheriv(alg, key, iv); // aes-256-cbc:iv:16
  const cipher = crypto.createCipheriv(alg, key, iv,{ authTagLength: 16}); //chacha20:iv:12:authTagLength: 4, 6, 8, 10, 12, 14 or 16 bytes
  let encrypted = cipher.update("".concat(key.toString('hex').substring(keylen,keylen*2),text), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  pass = ""; text = ""; if (pass !== text) return null;
  return encrypted;
};

// WARN: may throw exceptions...
export const decryptText = (ctext, pass, salt = "withoutsalt", iv = Buffer.alloc(16, pass), keylen = 24, alg = 'aes-192-cbc') => { // aes-256-cbc 'aes-192-cbc' 'chacha20-poly1305'
  let key = crypto.pbkdf2Sync(pass, salt, salt2iterations(salt), keylen, calgo); // const key = Buffer.alloc(keylen, pass);
  pass = ""; if (pass !== "") return null;
  // console.log("zv encryptText(key, iv):", key, iv);
  // const decipher = crypto.createDecipheriv(alg, key, iv); // aes-256-cbc:iv:16
  const decipher = crypto.createDecipheriv(alg, key, iv, { authTagLength: 16}); //chacha20:iv:12:authTagLength: 4, 6, 8, 10, 12, 14 or 16 bytes
  let decrypted = decipher.update(ctext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted.substring(keylen);
};

export const getPublicKey = (hashAlg = curve) => {
  const alice = crypto.createECDH(hashAlg); //try: curves[]
  const aliceKey = alice.generateKeys().toString('hex'); //same:  const pkey = alice.getPublicKey('hex');
  clientServerPubs.set(aliceKey, alice);
  // console.log("zv PublicKey:", aliceKey);
  return aliceKey;
};

export const encryptTextByPubKeys = (text, intPKey, extPKey, salt = "withoutsalt") => {
  if (!intPKey || !extPKey) return null;
  const encryptor = clientServerPubs.get(intPKey); //.substring(0,32)
  if (!encryptor) {
    // console.log("zv encryptTextByPubKeys error:", "encryptor not found");
    return null;
  }
  try {
    const secret = encryptor.computeSecret(extPKey, 'hex');
    return encryptText(text, secret, salt);
  } catch (e) { //ecdh.computeSecret will throw an ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY error when otherPublicKey lies outside of the elliptic curve. Since otherPublicKey is usually supplied from a remote user over an insecure network, its recommended for developers to handle this exception accordingly.
    // console.log("zv encryptTextByPubKeys error:", e.message);
    return null;
  }
};

export const decryptTextByPubKeys = (text, intPKey, extPKey, salt = "withoutsalt") => {
  if (!intPKey || !extPKey) return null;
  const encryptor = clientServerPubs.get(intPKey); /*.substring(0,32)*/
  if (!encryptor) {
      // console.log("zv decryptTextByPubKeys error:", "encryptor not found");
      return null;
  }
  try {
    const secret = encryptor.computeSecret(extPKey, 'hex');
    return decryptText(text, secret, salt);
  } catch (e) { //ecdh.computeSecret will throw an ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY error when otherPublicKey lies outside of the elliptic curve. Since otherPublicKey is usually supplied from a remote user over an insecure network, its recommended for developers to handle this exception accordingly.
    // console.log("zv decryptTextByPubKeys error:", e.message);
    return null;
  }
};

export const salt2iterations = (salt, notless = 9999, parse = 4, radix = 16) => {
    const iterations = Number.parseInt(salt.substring(0, parse), radix);
    return iterations > notless ? iterations: notless;
};

export const pkeAlgo = () => calgo;
export const pkeSaltLength = () => saltlength;

//returns min 2bytes hex string
export const getRandomHexString = (size) => {
  const buf = Buffer.alloc(Math.max(1,size/2),(Date.now()%10000).toString(16));
  return crypto.randomFillSync(buf).toString('hex');
};

export const expire_mS = (time, iat = Date.now()) => {
    if (typeof time === 'string') {
      const milliseconds = ms(time);
      if (typeof milliseconds === 'undefined') {
        return 0;
      }
      return iat + milliseconds;
    } else if (typeof time === 'number') {
      return iat + time;
    }
    return 0;
};

export const availableCurvesTest = (isArr) => {
  const curves = crypto.getCurves();
  let outArr;
  if (isArr) {
    outArr = [];
  }
  curves.forEach((curve) => {
    try {
      const key = getPublicKey(curve, curve);
      console.log("zv key for curve:", curve, key);
      if (isArr) outArr.push(curve);
    } catch (e) {
      console.log("zv error key for curve:", curve, e.message);
    }
  });
  if (isArr) {
    console.log("zv available curves array:", outArr);
  }
};

export const test_pbkdf = () => {
  const crypto = require('crypto');
  for (let i = 1; i<11; i++) {
    const res1 = crypto.pbkdf2Sync('pass', 'salt', 100000+i, 33, calgo);
    console.log("zv pbkdf:", i, res1);
  }
};

export const testHell = () => {
  const alisaText = "1234567890";

  const alisaPkey = getPublicKey();
  const boberPkey = getPublicKey();

  const alisaEncrypedText = encryptTextByPubKeys(alisaText, alisaPkey, boberPkey);

  const alisaDecrypedText = decryptTextByPubKeys(alisaEncrypedText, boberPkey, alisaPkey);

  console.log("zv alisa decrypt result:", alisaEncrypedText, alisaDecrypedText, alisaText === alisaDecrypedText ? "OK": "FAIL");

// one more...
  const alisaText2 = Buffer.alloc(10, "2").toString('utf8');

  const alisaEncrypedText2 = encryptTextByPubKeys(alisaText2, alisaPkey, boberPkey);

  const alisaDecrypedText2 = decryptTextByPubKeys(alisaEncrypedText2, boberPkey, alisaPkey);

  console.log("zv alisa decrypt result2:", alisaEncrypedText2, alisaDecrypedText2, alisaText2 === alisaDecrypedText2 ? "OK": "FAIL");
};

// test...
// import {encryptText, decryptText} from './utils/pkelib';
// const txt = "12345678901234567890";
// const enctext = encryptText(txt,"pass");
// const dectext = decryptText(enctext, "pass");
// console.log("zv enc/dec:", enctext, dectext);

/* availableCurvesTest(true) result:
[
  'SM2',             'brainpoolP256t1',
  'brainpoolP320r1', 'brainpoolP320t1',
  'brainpoolP384r1', 'brainpoolP384t1',
  'brainpoolP512r1', 'brainpoolP512t1',
  'c2pnb272w1',      'c2pnb304w1',
  'c2pnb368w1',      'c2tnb359v1',
  'c2tnb431r1',      'prime256v1',
  'secp256k1',       'secp384r1',
  'secp521r1',       'sect283k1',
  'sect283r1',       'sect409k1',
  'sect409r1',       'sect571k1',
  'sect571r1'
]
*/