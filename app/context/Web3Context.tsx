import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

interface Web3ContextType {
  account: string | null;
  provider: ethers.providers.Web3Provider | null;
  contract: ethers.Contract | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) throw new Error('useWeb3 must be used within a Web3Provider');
  return context;
};

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      network: "goerli", // Use the appropriate network
      cacheProvider: true,
    });
    setWeb3Modal(web3Modal);
  }, []);

  const connectWallet = async () => {
    if (web3Modal) {
      try {
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        // Replace with your contract address and ABI
        const contractAddress = "YOUR_CONTRACT_ADDRESS";
        const contractABI = []; // Your contract ABI here
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        setAccount(address);
        setProvider(provider);
        setContract(contract);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  const disconnectWallet = () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      setAccount(null);
      setProvider(null);
      setContract(null);
    }
  };

  return (
    <Web3Context.Provider value={{ account, provider, contract, connectWallet, disconnectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};