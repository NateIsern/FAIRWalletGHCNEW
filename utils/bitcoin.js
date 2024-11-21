import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import axios from 'axios';

const network = bitcoin.networks.testnet;

export const createWallet = () => {
  const mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, network);
  const account = root.derivePath("m/44'/1'/0'");
  const node = account.derive(0).derive(0);
  const address = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
  return { mnemonic, address, privateKey: node.toWIF() };
};

export const importWallet = (mnemonic) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, network);
  const account = root.derivePath("m/44'/1'/0'");
  const node = account.derive(0).derive(0);
  const address = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
  return { address, privateKey: node.toWIF() };
};

export const getWalletAddress = async () => {
  // This function should return the wallet address
  // For now, it returns a placeholder address
  return 'tb1qexampleaddress';
};

export const sendBitcoin = async (recipientAddress, amount) => {
  const keyPair = bitcoin.ECPair.fromWIF('your-private-key', network);
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });

  const utxos = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}?unspentOnly=true`);
  const txb = new bitcoin.TransactionBuilder(network);

  let inputAmount = 0;
  utxos.data.txrefs.forEach((utxo) => {
    txb.addInput(utxo.tx_hash, utxo.tx_output_n);
    inputAmount += utxo.value;
  });

  const satoshiAmount = Math.floor(amount * 1e8);
  txb.addOutput(recipientAddress, satoshiAmount);
  txb.addOutput(address, inputAmount - satoshiAmount - 1000); // Subtract fee

  utxos.data.txrefs.forEach((_, index) => {
    txb.sign(index, keyPair);
  });

  const rawTx = txb.build().toHex();
  await axios.post('https://api.blockcypher.com/v1/btc/test3/txs/push', { tx: rawTx });
};

export const getTransactions = async () => {
  // This function should return the list of transactions
  // For now, it returns a placeholder list
  return [
    { id: '1', date: '2021-01-01', amount: 0.1, status: 'confirmed' },
    { id: '2', date: '2021-01-02', amount: 0.2, status: 'pending' },
  ];
};
