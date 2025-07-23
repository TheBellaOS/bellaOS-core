import { BscConnector } from '@binance-chain/javascript-sdk';
import Web3 from 'web3';

export class BnbChainService {
  private web3: Web3;
  private chainId: number;
  
  constructor(rpcUrl: string, chainId: number) {
    this.web3 = new Web3(rpcUrl);
    this.chainId = chainId;
  }
  
  async createRandomWallet() {
    const account = this.web3.eth.accounts.create();
    
    return {
      address: account.address,
      privateKey: account.privateKey
    };
  }
  
  async createWalletFromPrivateKey(privateKey: string) {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    
    return {
      address: account.address,
      privateKey: account.privateKey
    };
  }
  
  async getBalance(address: string) {
    const balance = await this.web3.eth.getBalance(address);
    
    return {
      balance,
      formatted: this.web3.utils.fromWei(balance, 'ether')
    };
  }
  
  async getTokenBalance(tokenAddress: string, walletAddress: string) {
    const minABI = [
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
      }
    ];
    
    const contract = new this.web3.eth.Contract(minABI, tokenAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    const decimals = await contract.methods.decimals().call();
    const symbol = await contract.methods.symbol().call();
    
    return {
      balance,
      decimals,
      symbol,
      formatted: this.web3.utils.fromWei(balance, 'ether')
    };
  }
  
  async sendTransaction(privateKey: string, to: string, amount: string, gasPrice?: string) {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.web3.eth.accounts.wallet.add(account);
    
    const tx = {
      from: account.address,
      to,
      value: this.web3.utils.toWei(amount, 'ether'),
      gas: 21000,
      gasPrice: gasPrice ? this.web3.utils.toWei(gasPrice, 'gwei') : undefined,
      chainId: this.chainId
    };
    
    const receipt = await this.web3.eth.sendTransaction(tx);
    
    return receipt;
  }
  
  async sendTokenTransaction(
    privateKey: string, 
    tokenAddress: string, 
    to: string, 
    amount: string, 
    decimals: number,
    gasPrice?: string
  ) {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.web3.eth.accounts.wallet.add(account);
    
    const minABI = [
      {
        constant: false,
        inputs: [
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' }
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function',
      }
    ];
    
    const contract = new this.web3.eth.Contract(minABI, tokenAddress);
    const value = this.web3.utils.toWei(amount, 'ether');
    
    const tx = {
      from: account.address,
      to: tokenAddress,
      gas: 100000,
      gasPrice: gasPrice ? this.web3.utils.toWei(gasPrice, 'gwei') : undefined,
      chainId: this.chainId,
      data: contract.methods.transfer(to, value).encodeABI()
    };
    
    const receipt = await this.web3.eth.sendTransaction(tx);
    
    return receipt;
  }
  
  async getTransaction(txHash: string) {
    return this.web3.eth.getTransaction(txHash);
  }
  
  async getTransactionReceipt(txHash: string) {
    return this.web3.eth.getTransactionReceipt(txHash);
  }
  
  async getTransactionHistory(address: string) {
    // This is a simplified implementation
    // In a real-world scenario, you would use an indexer or API service like BscScan
    
    return {
      message: "Transaction history retrieval requires an indexer or API service like BscScan"
    };
  }
  
  async estimateGas(from: string, to: string, amount: string) {
    const gasEstimate = await this.web3.eth.estimateGas({
      from,
      to,
      value: this.web3.utils.toWei(amount, 'ether')
    });
    
    return gasEstimate;
  }
  
  async getGasPrice() {
    return this.web3.eth.getGasPrice();
  }
  
  async waitForTransaction(txHash: string) {
    return this.web3.eth.getTransactionReceipt(txHash);
  }
}
