import { Connection, Keypair, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as bip39 from 'bip39';

export class SolanaService {
  private connection: Connection;
  private network: string;
  
  constructor(rpcUrl: string, network: string) {
    this.connection = new Connection(rpcUrl);
    this.network = network;
  }
  
  async generateMnemonic() {
    return bip39.generateMnemonic();
  }
  
  async createWalletFromMnemonic(mnemonic: string) {
    // Note: This is a simplified implementation
    // In a real-world scenario, you would use a proper HD wallet derivation
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));
    
    return {
      publicKey: keypair.publicKey.toString(),
      secretKey: Buffer.from(keypair.secretKey).toString('hex')
    };
  }
  
  async createRandomWallet() {
    const keypair = Keypair.generate();
    
    return {
      publicKey: keypair.publicKey.toString(),
      secretKey: Buffer.from(keypair.secretKey).toString('hex')
    };
  }
  
  async getBalance(address: string) {
    const publicKey = new PublicKey(address);
    const balance = await this.connection.getBalance(publicKey);
    
    return {
      balance,
      formatted: balance / LAMPORTS_PER_SOL
    };
  }
  
  async getTokenBalance(tokenAddress: string, walletAddress: string) {
    const tokenPublicKey = new PublicKey(tokenAddress);
    const walletPublicKey = new PublicKey(walletAddress);
    
    // Get token accounts for this wallet
    const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
      walletPublicKey,
      { mint: tokenPublicKey }
    );
    
    if (tokenAccounts.value.length === 0) {
      return {
        balance: 0,
        formatted: '0'
      };
    }
    
    const tokenAccount = tokenAccounts.value[0];
    const tokenAmount = tokenAccount.account.data.parsed.info.tokenAmount;
    
    return {
      balance: tokenAmount.amount,
      decimals: tokenAmount.decimals,
      formatted: tokenAmount.uiAmount.toString()
    };
  }
  
  async sendTransaction(secretKey: string, to: string, amount: number) {
    const keypair = Keypair.fromSecretKey(
      Buffer.from(secretKey, 'hex')
    );
    
    const toPublicKey = new PublicKey(to);
    
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: toPublicKey,
        lamports: amount * LAMPORTS_PER_SOL
      })
    );
    
    // Get recent blockhash
    const { blockhash } = await this.connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = keypair.publicKey;
    
    // Sign transaction
    transaction.sign(keypair);
    
    // Send transaction
    const signature = await this.connection.sendRawTransaction(
      transaction.serialize()
    );
    
    // Confirm transaction
    await this.connection.confirmTransaction(signature);
    
    return {
      signature,
      amount,
      from: keypair.publicKey.toString(),
      to
    };
  }
  
  async getTransaction(signature: string) {
    return this.connection.getTransaction(signature);
  }
  
  async getTransactionHistory(address: string) {
    const publicKey = new PublicKey(address);
    const signatures = await this.connection.getSignaturesForAddress(publicKey);
    
    return signatures.map(sig => ({
      signature: sig.signature,
      slot: sig.slot,
      err: sig.err,
      memo: sig.memo,
      blockTime: sig.blockTime
    }));
  }
  
  async getTokenTransactionHistory(address: string, tokenAddress: string) {
    // This is a simplified implementation
    // In a real-world scenario, you would use an indexer or API service
    
    return {
      message: "Token transaction history retrieval requires an indexer or API service"
    };
  }
  
  async estimateFee() {
    const { feeCalculator } = await this.connection.getRecentBlockhash();
    return feeCalculator.lamportsPerSignature;
  }
  
  async waitForTransaction(signature: string) {
    return this.connection.confirmTransaction(signature);
  }
}
