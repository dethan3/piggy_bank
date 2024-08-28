// app/components/deposit.tsx

import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { deposit, getBalance } from '../utils/contractUtils';

const Deposit: React.FC = () => {
  const { account, contract } = useWeb3();
  const [balance, setBalance] = useState<string>('0');
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contract && account) {
      updateBalance();
    }
  }, [contract, account]);

  const updateBalance = async () => {
    if (contract) {
      const newBalance = await getBalance(contract);
      if (newBalance !== null) {
        setBalance(newBalance);
      }
    }
  };

  const handleDeposit = async () => {
    if (!contract || !amount) return;
    setIsLoading(true);
    setError(null);
    try {
      const success = await deposit(contract, amount);
      if (success) {
        await updateBalance();
        setAmount('');
      } else {
        throw new Error('Deposit failed');
      }
    } catch (error) {
      console.error("Error during deposit:", error);
      setError("Deposit failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!account) {
    return <div className="text-center mt-8">Please connect your wallet to use Deposit.</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Your Balance: {balance} ETH</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Deposit</h3>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in ETH"
          className="border p-2 mr-2 w-64"
        />
        <button 
          onClick={handleDeposit}
          disabled={isLoading}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Processing...' : 'Deposit'}
        </button>
      </div>
    </div>
  );
};

export default Deposit;