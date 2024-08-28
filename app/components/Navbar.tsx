import React from 'react';
import { useWeb3 } from '../context/Web3Context';

const Navbar: React.FC = () => {
  const { account, connectWallet, disconnectWallet } = useWeb3();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Pigyy Bank</div>
        <div>
          {account ? (
            <div className="flex items-center">
              <span className="text-white mr-4">
                {`${account.slice(0, 6)}...${account.slice(-4)}`}
              </span>
              <button
                onClick={disconnectWallet}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  )
};

export default Navbar;