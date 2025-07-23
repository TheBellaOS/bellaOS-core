import { ethers } from 'ethers';
import * as bip39 from 'bip39';

export class EthereumService {
  private provider: ethers.providers.JsonRpcProvider;
  private chainId: number;
  
  constructor(rpcUrl: string, chainId: number) {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.chainId = chainId;
  }
  
  async generateMnemonic() {
    return bip39.generateMnemonic();
  }
  
  async createWalletFromMnemonic(mnemonic: string) {
    return ethers.Wallet.fromMnemonic(mnemonic);
  }
  
  async createRandomWallet() {
    return ethers.Wallet.createRandom();
  }
  
  async getBalance(address: string) {
    return this.provider.getBalance(address);
  }
  
  async getTokenBalance(tokenAddress: string, walletAddress: string) {
    const abi = [
      'function balanceOf(address owner) view returns (uint256)',
      'function decimals() view returns (uint8)',
      'function symbol() view returns (string)'
    ];
    
    const contract = new ethers.Contract(tokenAddress, abi, this.provider);
    const balance = await contract.balanceOf(walletAddress);
    const decimals = await contract.decimals();
    const symbol = await contract.symbol();
    
    return {
      balance,
      decimals,
      symbol,
      formatted: ethers.utils.formatUnits(balance, decimals)
    };
  }
  
  async sendTransaction(privateKey: string, to: string, amount: string, gasPrice?: string) {
    const wallet = new ethers.Wallet(privateKey, this.provider);
    
    const tx = await wallet.sendTransaction({
      to,
      value: ethers.utils.parseEther(amount),
      gasPrice: gasPrice ? ethers.utils.parseUnits(gasPrice, 'gwei') : undefined,
      chainId: this.chainId
    });
    
    return tx;
  }
  
  async sendTokenTransaction(
    privateKey: string, 
    tokenAddress: string, 
    to: string, 
    amount: string, 
    decimals: number,
    gasPrice?: string
  ) {
    const wallet = new ethers.Wallet(privateKey, this.provider);
    
    const abi = [
      'function transfer(address to, uint amount) returns (bool)',
      'function balanceOf(address owner) view returns (uint256)'
    ];
    
    const contract = new ethers.Contract(tokenAddress, abi, wallet);
    
    const tx = await contract.transfer(
      to,
      ethers.utils.parseUnits(amount, decimals),
      {
        gasPrice: gasPrice ? ethers.utils.parseUnits(gasPrice, 'gwei') : undefined,
        chainId: this.chainId
      }
    );
    
    return tx;
  }
  
  async getTransaction(txHash: string) {
    return this.provider.getTransaction(txHash);
  }
  
  async getTransactionReceipt(txHash: string) {
    return this.provider.getTransactionReceipt(txHash);
  }
  
  async getTransactionHistory(address: string, startBlock: number = 0, endBlock: number = 'latest') {
    // This is a simplified implementation
    // In a real-world scenario, you would use an indexer or API service like Etherscan
    const currentBlock = await this.provider.getBlockNumber();
    const finalEndBlock = endBlock === 'latest' ? currentBlock : endBlock;
    
    const sentFilter = {
      fromBlock: startBlock,
      toBlock: finalEndBlock,
      fromAddress: address
    };
    
    const receivedFilter = {
      fromBlock: startBlock,
      toBlock: finalEndBlock,
      toAddress: address
    };
    
    // Note: This approach has limitations and is not suitable for production
    // It's better to use an indexer or API service
    
    return {
      message: "Transaction history retrieval requires an indexer or API service like Etherscan",
      currentBlock
    };
  }
  
  async estimateGas(from: string, to: string, amount: string) {
    const gasEstimate = await this.provider.estimateGas({
      from,
      to,
      value: ethers.utils.parseEther(amount)
    });
    
    return gasEstimate;
  }
  
  async getGasPrice() {
    return this.provider.getGasPrice();
  }
  
  async waitForTransaction(txHash: string, confirmations: number = 1) {
    return this.provider.waitForTransaction(txHash, confirmations);
  }
}
