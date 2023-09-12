var bip39 = require('bip39')
var crypto = require('crypto')
var bitcoin = require('bitcoinjs-lib')
var b58 = require('bs58check')

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

// what you describe as 'seed'
var  randomBytes = crypto.randomBytes(16) // 128 bits is enough

// your 12 word phrase
var mnemonic = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"

// "when aunt guess group anxiety country rival inspire rug advice emerge party"; //bip39.entropyToMnemonic(randomBytes.toString('hex')) 

// what is accurately described as the wallet seed
var seed = bip39.mnemonicToSeedSync(mnemonic) // you'll use this in #3 below

console.log("mnemonic ", mnemonic);
console.log("seed ", seed);

//const path = "m/44'/0/0"
//console.log("path ", path);

// const mnemonic = 'praise you muffin lion enable neck grocery crumble super myself license ghost'
// const seed = bip39.mnemonicToSeed(mnemonic)
const root = bip32.fromSeed(seed)
console.log("root ", root);

var acct = root.derivePath("m/44'/5'/0'");
console.log("acct ", acct);
const DASH = {
    messagePrefix: '\x19Dash Signed Message:\n',
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
    },
    pubKeyHash: 0x4c,
    scriptHash: 0x10,
    wif: 0xcc,
};


// private: 0xcc,
// public: 0x4c,
// scripthash: 0x10

//testnet
// versions: {
//     bip32: {
//       private: 0x04358394,
//       public: 0x043587cf
//     },
//     bip44: 1,
//     private: 0xef,
//     public: 0x8c,
//     scripthash: 0x13
//   }

const child1 = root.derivePath("m/44'/5'/0'/0/0")
const child2 = root.derivePath("m/44'/5'/0'/0/1")
const child3 = root.derivePath("m/44'/5'/0'/0/2")

console.log("child1 ", child1);
console.log("child2 ", child2);
console.log("child3 ", child3);

const xpub = acct.neutered().toBase58();
console.log("xpub ", xpub);

//const xpriv = acct.toBase58();
//console.log("xpriv ", xpriv);

// let data = b58.decode(xpub)
// data = data.slice(4);
// data = Buffer.concat([Buffer.from('04b24746','hex'), data]); // see https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2017-September/014907.html for tenative (non-BIP-official) version bytes
// let zpub = b58.encode(data);
// console.log("zpub ", zpub);

const child1Address = bitcoin.payments.p2pkh({ pubkey: child1.publicKey, network: DASH }).address
const child2Address = bitcoin.payments.p2pkh({ pubkey: child2.publicKey, network: DASH }).address
const child3Address = bitcoin.payments.p2pkh({ pubkey: child3.publicKey, network: DASH }).address

console.log("child1Address ", child1Address);
console.log("child2Address ", child2Address);
console.log("child3Address ", child3Address);